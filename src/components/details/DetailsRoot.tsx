import { Box, Title, Text, Group, Stack, BackgroundImage } from "@mantine/core";
import ImageBanner from "./ImageBanner";
import RegistrationForm from "./RegistrationForm";
const DetailsRoot = () => {
  return (
    <Stack>
      <Title>Nombre Evento</Title>
      <Group>
        <Text transform="uppercase" color={"gray"}>
          fecha del evento
        </Text>
        <Text transform="uppercase" color={"gray"}>
          {" "}
          lugar del evento
        </Text>
      </Group>
      <ImageBanner />
      <Stack>
        <Text size={"xl"} weight={700} color={"blue"}>
          Descripcion
        </Text>
        <Text align={"justify"}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius aut
          dicta voluptas neque mollitia repellendus voluptatum atque maxime
          laudantium. Esse modi impedit rem. Similique possimus assumenda,
          obcaecati cum consectetur nulla magni! Ducimus ea, consequatur beatae
          necessitatibus commodi nam ullam ipsa recusandae nihil. Facere illum,
          delectus facilis sint magnam, doloremque quisquam animi corporis
          deserunt fuga sed exercitationem, consectetur tempore consequuntur.
          Optio accusantium explicabo quasi nostrum fugiat numquam animi natus?
          Ut in maxime eum, rerum quidem, commodi illum cumque velit facere
          doloribus quae nobis voluptate. Commodi excepturi quam dicta obcaecati
          quae itaque doloribus quos quis at! Voluptatibus veniam alias rerum
          quia neque.
        </Text>
      </Stack>
      <RegistrationForm />
    </Stack>
  );
};

export default DetailsRoot;
