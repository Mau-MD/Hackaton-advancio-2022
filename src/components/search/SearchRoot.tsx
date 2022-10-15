import {
  Grid,
  Group,
  MultiSelect,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import React, { useState } from "react";
import { DateRangePicker, DateRangePickerValue } from "@mantine/dates";
import EventSearchCard from "./EventSearchCard";
import { trpc } from "../../utils/trpc";
import { useDebouncedState, useDebouncedValue } from "@mantine/hooks";

const SearchRoot = () => {
  const [query, setQuery] = useState("");
  const [queryCities, setQueryCities] = useState([]);
  const [querySchools, setQuerySchools] = useState([]);
  const [queryRangeDate, setQueryRangeDate] = useState([]);

  const [debouncedQuery] = useDebouncedValue(query, 300);
  const [debouncedCities] = useDebouncedValue(queryCities, 300);
  const [debouncedSchools] = useDebouncedValue(querySchools, 300);

  const { data: events, isLoading } = trpc.events.getEvents.useQuery({
    query: debouncedQuery,
    cities: debouncedCities,
    schools: debouncedSchools,
  });

  const { data: schools, isLoading: isLoadingSchool } =
    trpc.school.getSchoolsForSelect.useQuery();
  const { data: cities, isLoading: isLoadingCity } =
    trpc.city.getCitiesForSelect.useQuery();

  return (
    <Stack>
      <Title order={5}>Busqueda de Eventos</Title>
      <TextInput
        label="Nombre del evento"
        onChange={(e) => setQuery(e.currentTarget.value)}
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
            />
            <MultiSelect
              label="Ciudad"
              data={cities}
              value={queryCities}
              onChange={(cities) => setQueryCities(cities)}
            />
            <DateRangePicker label="Fechas" />
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
            badges={["Advancio", "CETYS Universidad"]}
            description={event.description}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default SearchRoot;
