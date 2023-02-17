import { taskGroupRouter } from "./router/taskGroup";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  taskGroup: taskGroupRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
