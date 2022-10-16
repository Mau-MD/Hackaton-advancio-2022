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
import EventSearchCard from "./EventSearchCard";
import { trpc } from "../../utils/trpc";
import { useDebouncedState, useDebouncedValue } from "@mantine/hooks";
import { useRouter } from "next/router";

const SearchRoot = () => {
  const router = useRouter();
  const {
    query: initialQuery,
    school: initialSchool,
    city: initialCity,
  } = router.query as { query: string; school: string; city: string };

  const [query, setQuery] = useState(initialQuery || "");
  const [queryCities, setQueryCities] = useState<string[]>([]);
  const [querySchools, setQuerySchools] = useState<string[]>([]);
  const [queryRangeDate, setQueryRangeDate] = useState<Date[]>([]);

  const utils = trpc.useContext();

  useEffect(() => {
    console.log(router.query);
    if (initialSchool && initialSchool.length > 0) {
      setQuerySchools([initialSchool]);
    }
    if (initialCity && initialCity.length > 0) {
      setQueryCities([initialCity]);
    }
  }, [initialSchool, initialCity]);

  useEffect(() => {
    console.log("INFO", querySchools);
  }, [querySchools]);

  const [debouncedQuery] = useDebouncedValue(query, 300);

  const { data: events, isLoading } = trpc.events.getEvents.useQuery({
    query: debouncedQuery,
    cities: queryCities,
    schools: querySchools,
    date: queryRangeDate,
  });

  const { data: schools, isLoading: isLoadingSchool } =
    trpc.school.getSchoolsForSelect.useQuery();
  const { data: cities, isLoading: isLoadingCity } =
    trpc.city.getCitiesForSelect.useQuery();

  return (
    <Stack>
      <Group>
        <Title order={5}>Busqueda de Eventos</Title>
        {isLoading && <Loader></Loader>}
      </Group>
      <TextInput
        label="Nombre del evento"
        onChange={(e) => setQuery(e.currentTarget.value)}
        placeholder="Busca por nombre del evento"
        value={query}
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
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default SearchRoot;
