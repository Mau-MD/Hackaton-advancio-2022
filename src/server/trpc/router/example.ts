import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import sendSMS from '../../twilio/sms';
import sendWhatsapp from "../../twilio/whatsapp";
import sendEmail from "../../twilio/email"

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
  sendSMS: publicProcedure.input(z.string()).mutation(({ input }) => {
    sendSMS(input);
  }),
  sendWhatsapp: publicProcedure.input(z.string()).mutation(({ input }) => {
    sendWhatsapp(input);
  }),
  sendEmail: publicProcedure.input(z.string()).mutation(({ input }) => {
    sendEmail(input);
  }),
});
