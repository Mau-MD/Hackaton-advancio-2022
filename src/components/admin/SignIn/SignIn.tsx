import { Button } from "@mantine/core";
import { useRouter } from "next/router";

const SignIn = () => {
  const route = useRouter();
  const handlePress = () => {
    route.push("/school_LogIn");
  };

  return <Button onClick={() => handlePress()}>Ingresar como escuela</Button>;
};

export default SignIn;
