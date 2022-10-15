import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import React from "react";
import DetailsRoot from "../../components/details/DetailsRoot";

const Event: NextPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  return (
    <div>
      <DetailsRoot id={id} />
    </div>
  );
};

export default Event;
