import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

const findAllTaskGroups = publicProcedure.query(({ ctx }) => {
  const { prisma } = ctx;

  return prisma.taskGroup.findMany({
    orderBy: { order: "asc" },
  });
});

const findTaskGroupById = publicProcedure
  .input(z.string())
  .query(({ ctx, input }) => {
    const { prisma } = ctx;

    return prisma.taskGroup.findUnique({
      where: { id: input },
    });
  });

const createTaskGroup = publicProcedure
  .input(
    z.object({
      name: z.string(),
      order: z.number().optional(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const { prisma } = ctx;
    const { name, order } = input;

    return prisma.taskGroup.create({
      data: {
        name,
        order: order ?? (await prisma.taskGroup.count()),
      },
    });
  });

const deleteTaskGroup = publicProcedure
  .input(z.string())
  .mutation(async ({ ctx, input }) => {
    const { prisma } = ctx;

    const tasks = await prisma.task.findMany({
      where: { groupId: input },
    });

    if (tasks.length > 0) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Group not empty",
      });
    }

    return prisma.taskGroup.delete({
      where: { id: input },
    });
  });

export const taskGroupRouter = createTRPCRouter({
  all: findAllTaskGroups,
  byId: findTaskGroupById,
  create: createTaskGroup,
  delete: deleteTaskGroup,
});
