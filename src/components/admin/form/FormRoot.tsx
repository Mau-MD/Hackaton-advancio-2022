import React, { useState } from "react";
import FormView from "./FormView";

interface Props {
  id?: string;
}
const FormRoot = ({ id }: Props) => {
  return <FormView id={id} />;
};

export default FormRoot;
