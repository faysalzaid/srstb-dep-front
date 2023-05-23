import React, { useMemo } from "react";

import { useTable, useSortBy, usePagination } from "react-table";
// import { FirstColumn, defaultColumns } from "./Columns";
// import { OngoingProjects, defaultData } from "./Data";
import "./table.css";
import { FiChevronsDown, FiChevronsUp } from "react-icons/fi";
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";
import { defaultColumns } from "./Columns";
import { defaultData } from "./Data";
// import { defaultData } from "./Data";

const BasicTable = ({Column = defaultColumns,Data=defaultData,
  Pagination = false,
  NextAndPrev = false,
  PageIndex = false,
  project
}) => {
  const columns = useMemo(() => {
    return Column;
  }, []);
  const data = useMemo(() => {
    return Data;
  }, []);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination
  );

  console.log('from basic table',Data);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    rows,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    pageOptions,
    state,
    canPreviousPage,
    gotoPage,
    pageCount,
    setPageSize,
  } = tableInstance;

  const { pageIndex, pageSize } = state;

  return (
    <>
      <table
        className=" w-full border border-gray-200 text-black dark:text-gray-300 dark:border-gray-700 "
        {...getTableProps}
        id="react_table"
      >
        <thead>
          {headerGroups?.map((headerGroup) => (
            <tr
              className=" border-b border-gray-200 dark:border-gray-700 "
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup?.headers?.map((column) => (
                <th
                  className=" relative min-w-32 p-2 text-left font-medium "
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  <span className=" sortable_arrow absolute text-indigo-600 ">
                    {" "}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FiChevronsDown />
                      ) : (
                        <FiChevronsUp />
                      )
                    ) : (
                      ""
                    )}{" "}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps}>
          {Pagination?page?.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    className=" border-b border-gray-200 dark:border-gray-700 "
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td
                          className=" min-w-32 p-2 text-sm "
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            : rows?.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    className=" border-b border-gray-200 dark:border-gray-700 "
                    {...row.getRowProps()} 
                  >
                    {row?.cells?.map((cell) => {
                      return (
                        <td
                          className=" min-w-32 p-2 text-sm "
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
        </tbody>
      </table>

      <section className=" my-4 flex justify-end items-center gap-3 ">
        {/* PageIndex */}
        {PageIndex && (
          <div>
            <p className=" text-sm text-cool-gray-600">
              page <span className=" font-semibold ">{pageIndex + 1}</span> of{" "}
              <span className=" font-semibold ">{pageOptions.length}</span>
            </p>
          </div>
        )}

        {/* Pagination */}
        {Pagination && (
          <div>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className=" text-sm outline-none bg-transparent dark:text-white"
            >
              {[10, 20, 35, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  show {pageSize}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* NextAndPrev */}
        {NextAndPrev && (
          <div className=" flex items-center text-gray-500 dark:text-cool-gray-300 ">
            <main onClick={() => gotoPage(0)}>
              <BiChevronsLeft
                className={
                  " box-content p-2 text-lg rounded-full bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-cool-gray-300 hover:text-black "
                }
              />
            </main>
            <main onClick={() => previousPage()}>
              <BiChevronLeft
                className={
                  " box-content p-2 text-lg rounded-full bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-cool-gray-300 hover:text-black "
                }
              />
            </main>
            <main onClick={() => nextPage()}>
              <BiChevronRight className=" box-content p-2 text-lg rounded-full bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-cool-gray-300 hover:text-black" />
            </main>
            <main onClick={() => gotoPage(pageCount - 1)}>
              <BiChevronsRight
                className={
                  " box-content p-2 text-lg rounded-full bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-cool-gray-300 hover:text-black "
                }
              />
            </main>
          </div>
        )}
      </section>
    </>
  );
};

export default BasicTable;
