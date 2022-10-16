import {
  Group,
  Textarea,
  TextInput,
  useMantineTheme,
  Text,
  Stack,
  Button,
  Affix,
  Image,
  SimpleGrid,
  Select,
} from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import {
  Dropzone,
  DropzoneProps,
  FileWithPath,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconClock, IconPhoto, IconUpload, IconX } from "@tabler/icons";
import React, { useEffect, useState } from "react";
import { trpc } from "../../../utils/trpc";

interface FormTypes {
  name: string;
  description: string;
  place: string;
  date: Date;
  time: Date;
  school: string;
  city: string;
  image: FileWithPath[];
}

interface Props {
  id?: string;
}
const FormView = ({ id }: Props) => {
  const theme = useMantineTheme();
  const now = new Date();

  const isEdit = id !== undefined;

  const { data: cities } = trpc.city.getCitiesForSelect.useQuery();
  const { data: schools } = trpc.school.getSchoolsForSelect.useQuery();

  useEffect(() => {
    form.reset();
  }, [id]);

  const { data: event } = trpc.events.getEventFromId.useQuery(id || "", {
    enabled: isEdit,
    onSuccess: (values) => {
      if (!values) return;
      form.setValues({
        name: values.title,
        description: values.description,
        place: values.location,
        date: new Date(values.date),
        time: new Date(values.date),
        school: values.schoolId,
        city: values.cityId,
        image: [],
      });
    },
  });

  const form = useForm<FormTypes>({
    initialValues: {
      image: [],
      name: event?.title || "",
      description: event?.description || "",
      place: event?.location || "",
      school: event?.schoolId || "",
      city: event?.cityId || "",
      date: event?.date || now,
      time: now,
    },

    validate: {
      name: (value) => (value.length > 0 ? null : "El nombre es requerido"),
      description: (value) =>
        value.length > 0 ? null : "La descripción es requerida",
      place: (value) => (value.length > 0 ? null : "la ubicación es requerida"),
      time: (value) => (value != null ? null : "La hora es requerida"),
    },
  });

  const previews = form.values.image.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  });

  const updateResource = trpc.events.updateEvent.useMutation({
    onSuccess: () => {
      showNotification({
        title: "Evento actualizado",
        message: "El evento se ha actualizado correctamente",
        color: "green",
      });
    },
  });

  const createResource = trpc.events.createEvent.useMutation({
    onSuccess: () => {
      showNotification({
        title: "Evento creado",
        message: "El evento se ha creado correctamente",
        color: "green",
      });
    },
  });

  const handleFormSubmit = (values: FormTypes) => {
    if (isEdit) {
      updateResource.mutate({
        id: id,
        title: values.name,
        description: values.description,
        city: values.city,
        school: values.school,
        date: values.date,
        location: values.place,
        image: "",
      });
      return;
    }
    createResource.mutate({
      title: values.name,
      description: values.description,
      city: values.city,
      school: values.school,
      date: values.date,
      location: values.place,
      image: "",
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
      <Stack>
        {/* Nombre de la ventana */}
        <Group position="center">
          <h2>Crea un nuevo evento!</h2>
        </Group>
        {/* Nombre del evento */}
        <TextInput
          placeholder="e.g. CETYS Expoingeniería"
          label="Nombre del evento"
          withAsterisk
          {...form.getInputProps("name")}
        />
        {/* Ubicación */}
        <Textarea
          placeholder="Describe actividades, ponentes, expositores, concursos, etc."
          label="Descripción"
          withAsterisk
          {...form.getInputProps("description")}
        />
        {/* Lugar */}
        <TextInput
          placeholder="e.g. CETYS Universidad Campus Ensenada"
          label="Lugar"
          withAsterisk
          {...form.getInputProps("place")}
        />
        {/* Date and time */}
        <Group>
          <DatePicker
            placeholder="Selecciona tu fecha"
            label="Fecha"
            withAsterisk
            {...form.getInputProps("date")}
          />
          <TimeInput
            label="Pick time"
            placeholder="Pick time"
            icon={<IconClock size={16} />}
            defaultValue={new Date()}
            withAsterisk
            {...form.getInputProps("time")}
          />
          <Select
            data={cities || []}
            label="Ciudad"
            value={form.values.city}
            onChange={(city) => form.setFieldValue("city", city || "")}
          />
          <Select
            data={schools || []}
            label="Escuela"
            value={form.values.school}
            onChange={(school) => form.setFieldValue("school", school || "")}
          />
        </Group>
        {/* Subir imagen */}
        <Text weight={600} size="sm" mt={5} mb={1}>
          Agrega imagenes del evento
        </Text>
        <div>
          <Dropzone
            accept={IMAGE_MIME_TYPE}
            onDrop={(file) => form.setFieldValue("image", file)}
          >
            <Text align="center">Drop images here</Text>
          </Dropzone>

          <SimpleGrid
            cols={4}
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
            mt={previews.length > 0 ? "xl" : 0}
          >
            {previews}
          </SimpleGrid>
        </div>
        <Group position="center">
          <Button
            type="submit"
            loading={createResource.isLoading || updateResource.isLoading}
          >
            {isEdit ? "Actualizar Evento" : "Crear Evento"}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default FormView;
