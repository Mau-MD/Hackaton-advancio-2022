import { router, publicProcedure } from "../trpc";

export const schoolRouter = router({
  getSchools: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.school.findMany({});
  }),
  getSchoolsForSelect: publicProcedure.query(async ({ ctx }) => {
    const schools = await ctx.prisma.school.findMany({});
    return schools.map((school) => {
      return { value: school.id, label: school.name };
    });
  }),
});
