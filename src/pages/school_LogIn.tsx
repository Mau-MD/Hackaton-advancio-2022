import {
  Stack,
  Center,
  Title,
  TextInput,
  Checkbox,
  Group,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { router } from "../server/trpc/trpc";
import Dashboard from "./admin/dashboard";

const school_Login = () => {
  const credentials = {
    email: "universidad@cetys.mx",
    contraseña: "12345",
  };

  const route = useRouter();

  const handleSubmit = (data: any) => {
    console.log(data);
    if (
      credentials.email == data.email &&
      credentials.contraseña === data.contraseña
    ) {
      route.push("/admin");
    }
  };

  const form = useForm({
    initialValues: {
      email: "",
      contraseña: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <Stack>
      <Center>
        <Title>Ingresa como Institución</Title>
      </Center>
      <form onSubmit={form.onSubmit((data) => handleSubmit(data))}>
        <Stack>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />
          <TextInput
            withAsterisk
            label="Contraseña"
            placeholder="12345"
            {...form.getInputProps("contraseña")}
          />
        </Stack>
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Stack>
  );
};

export default school_Login;
