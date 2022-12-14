import {
  Grid,
  Group,
  Loader,
  MultiSelect,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { DateRangePicker, DateRangePickerValue } from "@mantine/dates";
import { useDebouncedState, useDebouncedValue } from "@mantine/hooks";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import EventSearchCard from "../../search/EventSearchCard";

const DashboardRoot = () => {
  const router = useRouter();
  const {
    query: initialQuery,
    school: initialSchool,
    city: initialCity,
  } = router.query as { query: string; school: string; city: string };

  const [query, setQuery] = useState(initialQuery || "");
  const [queryCities, setQueryCities] = useState<string[]>(
    initialSchool ? [initialSchool] : []
  );
  const [querySchools, setQuerySchools] = useState<string[]>(
    initialCity ? [initialCity] : []
  );
  const [queryRangeDate, setQueryRangeDate] = useState<Date[]>([]);

  useEffect(() => {
    if (initialSchool) {
      setQuerySchools([initialSchool]);
    }
    if (initialCity) {
      setQueryCities([initialCity]);
    }
  }, [initialSchool, initialCity]);

  const [debouncedQuery] = useDebouncedValue(query, 300);
  const [debouncedCities] = useDebouncedValue(queryCities, 300);
  const [debouncedSchools] = useDebouncedValue(querySchools, 300);
  const [debouncedRangeDate] = useDebouncedValue(queryRangeDate, 300);

  const { data: events, isLoading } = trpc.events.getEvents.useQuery({
    query: debouncedQuery,
    cities: debouncedCities,
    schools: debouncedSchools,
    date: debouncedRangeDate,
  });

  const { data: schools, isLoading: isLoadingSchool } =
    trpc.school.getSchoolsForSelect.useQuery();
  const { data: cities, isLoading: isLoadingCity } =
    trpc.city.getCitiesForSelect.useQuery();

  return (
    <Stack>
      <Group>
        <Title order={5}>Busqueda de Eventos</Title>
        {isLoading && <Loader />}
      </Group>
      <TextInput
        label="Nombre del evento"
        onChange={(e) => setQuery(e.currentTarget.value)}
        value={query}
        placeholder="Busca por nombre del evento"
      />
      <Group grow>
        {schools && cities && (
          <>
            <MultiSelect
              label="Escuela"
              data={schools}
              value={querySchools}
              onChange={(schools) => setQuerySchools(schools)}
              placeholder="Busca por escuela"
            />
            <MultiSelect
              label="Ciudad"
              data={cities}
              value={queryCities}
              onChange={(cities) => setQueryCities(cities)}
              placeholder="Busca por ciudad"
            />
            <DateRangePicker
              label="Fechas"
              onChange={(date) =>
                date[0] && date[1] && setQueryRangeDate([date[0], date[1]])
              }
              placeholder="Busca por rango de fechas"
            />
          </>
        )}
      </Group>
      <Title order={5} mt={15}>
        Resultados
      </Title>
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: "md" },
          { maxWidth: 755, cols: 2, spacing: "sm" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
      >
        {events?.map((event) => (
          <EventSearchCard
            key={event.id}
            id={event.id}
            title={event.title}
            date={event.date}
            badges={["Advancio", "CETYS Universidad"]}
            description={event.description}
            image={event.image}
            admin
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default DashboardRoot;
