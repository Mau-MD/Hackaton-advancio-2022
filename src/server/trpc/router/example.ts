import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import sendSMS from "../../twilio/sms";
import sendWhatsapp from "../../twilio/whatsapp";
import sendEmail from "../../twilio/email";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  sendSMS: publicProcedure
    .input(
      z.object({
        event: z.object({
          name_event: z.string(),
          description_event: z.string(),
          date_event: z.date(),
          city_event: z.string(),
          school_event: z.string(),
        }),
        cellphone_number: z.string(),
      })
    )
    .mutation(({ input }) => {
      sendSMS(input.event, input.cellphone_number);
    }),
  sendWhatsapp: publicProcedure
    .input(
      z.object({
        event: z.object({
          name_event: z.string(),
          description_event: z.string(),
          date_event: z.date(),
          city_event: z.string(),
          school_event: z.string(),
        }),
        cellphone_number: z.string(),
      })
    )
    .mutation(({ input }) => {
      sendSMS(input.event, input.cellphone_number);
    }),
  sendEmail: publicProcedure
    .input(
      z.object({
        event: z.object({
          name_event: z.string(),
          description_event: z.string(),
          date_event: z.date(),
          city_event: z.string(),
          school_event: z.string(),
        }),
        to_email: z.string(),
      })
    )
    .mutation(({ input }) => {
      sendEmail(input.event, input.to_email);
    }),
});
