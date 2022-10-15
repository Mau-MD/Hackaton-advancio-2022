import { router, publicProcedure } from "../trpc";
import z from "zod";
import { InputError } from "@mantine/core/lib/Input/InputError/InputError";

export const eventsRouter = router({
  getEvents: publicProcedure
    .input(
      z.object({
        offset: z.number().optional(),
        limit: z.number().optional(),
        query: z.string().optional(),
        schools: z.array(z.string()).optional(),
        cities: z.array(z.string()).optional(),
        date: z.array(z.date()).optional(),
      })
    )
    .query(({ input, ctx }) => {
      if (input.cities?.length === 0) input.cities = undefined;
      if (input.schools?.length === 0) input.schools = undefined;
      if (input.date?.length === 0) input.date = undefined;

      return ctx.prisma.event.findMany({
        where: {
          AND: [
            {
              title: {
                contains: input.query?.trim().toLowerCase(),
                mode: "insensitive",
              },
            },
            {
              cityId: {
                in: input.cities,
              },
            },
            {
              schoolId: {
                in: input.schools,
              },
            },
            {
              date: {
                gte: input.date?.[0],
                lte: input.date?.[1],
              },
            },
          ],
        },
      });
    }),
  getEventFromId: publicProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.prisma.event.findUnique({ where: { id: input } });
  }),
});
