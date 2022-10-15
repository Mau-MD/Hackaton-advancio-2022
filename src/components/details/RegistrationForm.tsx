import { useForm } from "@mantine/form";
import {
  Box,
  Checkbox,
  TextInput,
  Group,
  Button,
  Card,
  Stack,
} from "@mantine/core";
import { trpc } from "../../utils/trpc";
import { showNotification } from "@mantine/notifications";

interface FormValues {
  email: string;
  name: string;
  phone: string;
}

interface Props {
  id: string;
}

const RegistrationForm = ({ id }: Props) => {
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
    onSuccess: () => {
      showNotification({
        message: "Registro exitoso",
        title: "Exito",
        color: "green",
      });
    },
  });

  const handleFormSubmit = (values: FormValues) => {
    submitRegistration.mutate({ ...values, eventId: id });
  };

  return (
    <Card sx={{ width: "100%" }} withBorder shadow={"lg"}>
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
    </Card>
  );
};

export default RegistrationForm;
