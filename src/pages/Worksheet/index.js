import React from "react";
import PageTitle from "../../components/PageTitle";
import WorksheetConfig from "./WorksheetConfig";

const index = () => {
  return (
    <>
      <PageTitle
        breadCrumbItems={[{ label: "Worksheet", active: true }]}
        title={"Worksheet"}
      />
      <WorksheetConfig />
    </>
  );
};

export default index;
