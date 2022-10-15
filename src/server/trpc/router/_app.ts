// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { imagesRouter } from "./images";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  images: imagesRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
