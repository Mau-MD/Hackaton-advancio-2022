import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const registrationRouter = router({
  createRegistration: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        phone: z.string(),
        eventId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const registration = await ctx.prisma.eventRegistration.create({
        data: {
          name: input.name,
          email: input.email,
          phone: input.phone,
          event: {
            connect: {
              id: input.eventId,
            },
          },
        },
      });
      return registration;
    }),
  getAttendeesCount: publicProcedure
    .input(z.string())
    .query(({ input, ctx }) => {
      return ctx.prisma.eventRegistration.count({ where: { eventId: input } });
    }),
});
