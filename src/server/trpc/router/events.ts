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
      })
    )
    .query(({ input, ctx }) => {
      if (input.schools?.length === 0 && input.cities?.length === 0) {
        return ctx.prisma.event.findMany({
          where: {
            title: {
              contains: input.query?.trim().toLowerCase(),
              mode: "insensitive",
            },
          },
        });
      }

      if (input.schools?.length === 0) {
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
            ],
          },
        });
      }

      if (input.schools?.length === 0) {
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
                schoolId: {
                  in: input.schools,
                },
              },
            ],
          },
        });
      }

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
              OR: [
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
              ],
            },
          ],
        },
      });
    }),
});
