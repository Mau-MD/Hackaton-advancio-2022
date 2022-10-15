// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { eventsRouter } from "./events";
import { cityRouter } from "./city";
import { schoolRouter } from "./school";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  events: eventsRouter,
  city: cityRouter,
  school: schoolRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
