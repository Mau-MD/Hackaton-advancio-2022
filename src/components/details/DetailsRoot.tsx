import { Box, Title, Text, Group, Stack, BackgroundImage } from "@mantine/core";
``;
const DetailsRoot = () => {
  return (
    <Box>
      <Title>Nombre Evento</Title>
      <Group mt={10}>
        <Text transform="uppercase" color={"gray"}>
          fecha del evento
        </Text>
        <Text transform="uppercase" color={"gray"}>
          {" "}
          lugar del evento
        </Text>
      </Group>
      <BackgroundImage
        src={
          "https://th.bing.com/th/id/R.07073e0950875368777a33e63b1c8a44?rik=TdtVWtZSse%2b0Kg&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f1%2fd%2f2%2f1523509-vertical-hd-wallpaper-1440x900-1920x1080-for-ios.jpg&ehk=0yj3mC%2f1yxRohKJnNnOvalCnm9nkdSpC4Hb8nHkqVso%3d&risl=&pid=ImgRaw&r=0"
        }
        radius="lg"
        p={5}
        mt={10}
        sx={{ width: "100%", height: "350px" }}
      ></BackgroundImage>
    </Box>
  );
};

export default DetailsRoot;
