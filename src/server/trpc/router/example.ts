import { router, publicProcedure } from "../trpc";
import sendSMS from '../../twilio/sms';
import { z } from "zod";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  call: publicProcedure.input(z.string()).mutation(({ input }) => {
    sendSMS(input);
  }),
});
