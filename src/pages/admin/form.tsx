import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import FormRoot from "../../components/admin/form/FormRoot";

const Form = () => {
  const router = useRouter();
  const { id } = router.query as { id: string | undefined };
  return <FormRoot id={id} />;
};

export default Form;
