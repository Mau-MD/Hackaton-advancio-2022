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

const RegistrationForm = () => {
  const form = useForm({
    initialValues: {
      email: "",
      nombre: "",
      telefono: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "correo invalido"),
      telefono: (value) => (value.length === 12 ? null : "telefono invalido"),
    },
  });
  return (
    <Card sx={{ width: "100%" }} withBorder shadow={"lg"}>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />
          <TextInput withAsterisk label="Nombre" placeholder="Daniel Barocio" />
          <TextInput
            withAsterisk
            label="Telefono"
            placeholder="646 199 2149"
            {...form.getInputProps("telefono")}
          />
          <Group position="right" mt="md">
            <Button type="submit">Registrar</Button>
          </Group>
        </Stack>
      </form>
    </Card>
  );
};

export default RegistrationForm;
