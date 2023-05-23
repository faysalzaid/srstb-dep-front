import React from "react";
import BasicTable from "./BasicTable";
import { EmplooyeesColumn } from "./Columns";
import { EmplooyeesData } from "./Data";

const EmplooyeesTable = () => {
  return (
    <div>
      <BasicTable
        // Column={EmplooyeesColumn}
        // Data={EmplooyeesData}
        // Pagination
        // PageIndex
        // NextAndPrev
      />
    </div>
  );
};

export default EmplooyeesTable;
