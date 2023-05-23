import React, { useState } from "react";
import BasicTable from "./BasicTable";
import { OngoingProjectsColumn,DeadLinedProjects,NewColumn } from "./Columns";
import { NewData, OngoingProjectsData } from "./Data";

const DeadLinePr = ({project}) => {
  console.log('from deadlin',project);

  const [data, setData] = useState(project)

  return (
    <main>
      
      <BasicTable
        Column={DeadLinedProjects}
        Data={data}
        // project={project}
        // Pagination
        // PageIndex
        // NextAndPrev
      />
    </main>
  );
};

export default DeadLinePr;
