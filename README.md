# Kanban

This is an example project using tRPC, Prisma, NextJS and Tailwind

## Quick start

To get started follow the steps below:

### Setup dependencies

```diff
# Install dependencies
pnpm i

# In packages/db/prisma update schema.prisma provider to use sqlite
# or use your own database provider
- provider = "postgresql"
+ provider = "sqlite"

# Generate the Prisma client
pnpm db:generate

# Configure environment variables.
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env

# Push the Prisma schema to your database
pnpm db:push

# Start the development server
pnpm dev
```
