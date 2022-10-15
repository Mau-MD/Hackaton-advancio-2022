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
  sendSMS: publicProcedure.input(z
    .object({
      name_event: z.string(),
      description_event: z.string(),
      date_event: z.string(),
      cellphone_number: z.string()
    }))
    .mutation(({ input }) => {
      sendSMS(input);
  }),
  sendWhatsapp: publicProcedure.input(z
    .object({
      event_data: z.string(), 
      cellphone_number: z.string()}))
    .mutation(({ input }) => {
      sendWhatsapp(input.event_data, input.cellphone_number);
  }),
  sendEmail: publicProcedure.input(z.string()).mutation(({ input }) => {
    sendEmail(input);
  }),
});
