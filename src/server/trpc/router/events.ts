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
      console.log(input);
      if (input.cities?.length === 0) input.cities = undefined;
      if (input.schools?.length === 0) input.schools = undefined;
      if (input.date?.length === 0) input.date = undefined;

      return ctx.prisma.event.findMany({
        orderBy: {
          date: "asc",
        },
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
  createEvent: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        location: z.string(),
        date: z.date(),
        image: z.string(),
        city: z.string(),
        school: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const event = await ctx.prisma.event.create({
        data: {
          title: input.title,
          description: input.description,
          location: input.location,
          date: input.date,
          image: input.image,
          city: {
            connect: {
              id: input.city,
            },
          },
          school: {
            connect: {
              id: input.school,
            },
          },
        },
      });
      return event;
    }),
  updateEvent: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        location: z.string(),
        date: z.date(),
        image: z.string(),
        city: z.string(),
        school: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const event = await ctx.prisma.event.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          description: input.description,
          location: input.location,
          date: input.date,
          image: input.image,
          city: {
            connect: {
              id: input.city,
            },
          },
          school: {
            connect: {
              id: input.school,
            },
          },
        },
      });
      return event;
    }),
});
