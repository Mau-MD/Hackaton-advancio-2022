import { useForm } from "@mantine/form";
import {
  Box,
  Checkbox,
  TextInput,
  Group,
  Button,
  Card,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { trpc } from "../../utils/trpc";
import { showNotification } from "@mantine/notifications";
import { storage } from "../../utils/storage";
import { Event } from "@prisma/client";

interface FormValues {
  email: string;
  name: string;
  phone: string;
}

interface Props {
  id: string;
  event: Event
}

const RegistrationForm = ({ id, event}: Props) => {
  const form = useForm<FormValues>({
    initialValues: {
      email: "",
      name: "",
      phone: "",
    },

    validate: {
      name: (value) => (value.length > 0 ? null : "El name es requerido"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Correo invalido"),
      phone: (value) => (value.length > 0 ? null : "El telefono es requerido"),
    },
  });

  const submitRegistration = trpc.registration.createRegistration.useMutation({
    onSuccess: (values) => {
      showNotification({
        message: "Registro exitoso",
        title: "Exito",
        color: "green",
      });      
      handleSMS(event.title, event.description, event.date, 'Ensenada', event.location, values.phone)
    },
  });

  const handleFormSubmit = (values: FormValues) => {
    submitRegistration.mutate({ ...values, eventId: id });
  };

  // const callEmail = trpc.example.sendEmail.useMutation();

  // const handleEmail = (name_event: string, description_event: string, date_event: string, city_event: string, school_event: string, to_email: string) => {
  //   callEmail.mutate({
  //     name_event: name_event,
  //     description_event: description_event,
  //     date_event: date_event,
  //     city_event: city_event,
  //     school_event: school_event,
  //     to_email: to_email,
  //   });
  // };

  const callSMS = trpc.example.sendSMS.useMutation();

  const handleSMS = (name_event: string, description_event: string, date_event: Date, city_event: string, school_event: string, cellphone_number: string) => {
    callSMS.mutate({
      name_event: name_event,
      description_event: description_event,
      date_event: date_event,
      city_event: city_event,
      school_event: school_event,
      cellphone_number: cellphone_number
    });
  }

  return (
    <Card sx={{ width: "100%" }} withBorder shadow={"lg"}>
      {!storage.getRegistered(id) ? (
        <>
          <Title order={3} mb={20}>
            Registrate en el evento
          </Title>
          <form onSubmit={form.onSubmit(handleFormSubmit)}>
            <Stack>
              <TextInput
                withAsterisk
                label="Nombre"
                placeholder="Daniel Barocio"
                {...form.getInputProps("name")}
              />
              <TextInput
                withAsterisk
                label="Email"
                placeholder="your@email.com"
                {...form.getInputProps("email")}
              />
              <TextInput
                withAsterisk
                label="Telefono"
                placeholder="646 199 2149"
                {...form.getInputProps("phone")}
              />
              <Group position="right" mt="md">
                <Button type="submit" loading={submitRegistration.isLoading}>
                  Registrar
                </Button>
              </Group>
            </Stack>
          </form>
        </>
      ) : (
        <Text>Ya te registraste para este evento</Text>
      )}
    </Card>
  );
};

export default RegistrationForm;
