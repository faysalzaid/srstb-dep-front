import React from "react";
import BasicTable from "./BasicTable";
import { OngoingProjectsColumn } from "./Columns";
import { OngoingProjectsData } from "./Data";

const OngoingProjects = () => {
  return (
    <main>
      <BasicTable
        Column={OngoingProjectsColumn}
        Data={OngoingProjectsData}
        Pagination
        PageIndex
        NextAndPrev
      />
    </main>
  );
};

export default OngoingProjects;
