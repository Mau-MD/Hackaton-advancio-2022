import type { NextPage } from "next";
import { Button, Card } from "@mantine/core"
import MainRoot from "../components/mainPage/MainRoot";
import FormRoot from "../components/admin/form/FormRoot"

const Home: NextPage = () => {

  return (
    <div>
      <FormRoot />

    </div>
  );
};

export default Home;
