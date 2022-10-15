import { router, publicProcedure } from "../trpc";

export const cityRouter = router({
  getCities: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.city.findMany({});
  }),
  getCitiesForSelect: publicProcedure.query(async ({ ctx }) => {
    const cities = await ctx.prisma.city.findMany({});
    return cities.map((city) => {
      return { value: city.id, label: city.name };
    });
  }),
});
