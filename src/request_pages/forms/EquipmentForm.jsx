import { EquipmentRentalContext } from "context/RequestContext";
import React from "react";

export default function EquipmentForm() {
  const {
    date,
    setDate,
    company1,
    setCompany1,
    company1Tel,
    setCompany1Tel,
    company1Add,
    setCompany1Add,
    company2,
    setCompany2,
    company2Tel,
    setCompany2Tel,
    company2Add,
    setCompany2Add,
    equipmentType,
    setEquipmentType,
    model,
    setmodel,
    plateNum,
    setPlateNum,
    price,
    setPrice,
  } = React.useContext(EquipmentRentalContext);
  return (
    <form className=" fill_form border border-gray-300 dark:border-gray-600 mt-6 mx-auto dark:text-gray-300 rounded-md ">
      <h3 className=" font-semibold  text-xl text-center mb-12">
        Equipment Rental Contract Form
      </h3>

      {/* main */}
      <main className=" grid sm:grid-cols-1 md:grid-cols-3 gap-4">
        {/* ==== a ==== */}
        <div className=" flex flex-col">
          <label className=" ml-1 ">Date</label>
          <input
            className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
            type="date"
            placeholder="DD/MM/YYYY"
            data-date=""
            data-date-format="DD MMMM YYYY"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* ==== c ==== */}
        <div className=" flex flex-col">
          <label className=" ml-1 ">Comapany 1</label>
          <input
            className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
            type="text"
            placeholder="Lessor Comapany Name"
            value={company1}
            onChange={(e) => setCompany1(e.target.value)}
          />
        </div>

        {/* ==== c ==== */}
        <div className=" flex flex-col">
          <label className=" ml-1 ">Comapany 1 Tel</label>
          <input
            className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
            type="text"
            placeholder="Lessor Comapany Name"
            value={company1Tel}
            onChange={(e) => setCompany1Tel(e.target.value)}
          />
        </div>

        {/* ==== c ==== */}
        <div className=" flex flex-col">
          <label className=" ml-1 ">Comapany 1 Address</label>
          <input
            className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
            type="text"
            placeholder="Lessor Comapany Name"
            value={company1Add}
            onChange={(e) => setCompany1Add(e.target.value)}
          />
        </div>

        {/* ==== c ==== */}
        <div className=" flex flex-col">
          <label className=" ml-1 ">Comapany 2</label>
          <input
            className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
            type="text"
            placeholder="Lessor Comapany Name"
            value={company2}
            onChange={(e) => setCompany2(e.target.value)}
          />
        </div>

        {/* ==== c ==== */}
        <div className=" flex flex-col">
          <label className=" ml-1 ">Comapany 2 Tel</label>
          <input
            className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
            type="text"
            placeholder="Lessor Comapany Name"
            value={company2Tel}
            onChange={(e) => setCompany2Tel(e.target.value)}
          />
        </div>

        {/* ==== c ==== */}
        <div className=" flex flex-col">
          <label className=" ml-1 ">Comapany 2 Address</label>
          <input
            className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
            type="text"
            placeholder="Lessor Comapany Name"
            value={company2Add}
            onChange={(e) => setCompany2Add(e.target.value)}
          />
        </div>

        {/* ==== c ==== */}
        <div className=" flex flex-col">
          <label className=" ml-1 ">Equipment Type</label>
          <input
            className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
            type="text"
            placeholder="Lessor Comapany Name"
            value={equipmentType}
            onChange={(e) => setEquipmentType(e.target.value)}
          />
        </div>

        {/* ==== c ==== */}
        <div className=" flex flex-col">
          <label className=" ml-1 ">Model</label>
          <input
            className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
            type="text"
            placeholder="Lessor Comapany Name"
            value={model}
            onChange={(e) => setmodel(e.target.value)}
          />
        </div>

        {/* ==== c ==== */}
        <div className=" flex flex-col">
          <label className=" ml-1 ">Plate Number</label>
          <input
            className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
            type="text"
            placeholder="Lessor Comapany Name"
            value={plateNum}
            onChange={(e) => setPlateNum(e.target.value)}
          />
        </div>

        {/* ==== c ==== */}
        <div className=" flex flex-col">
          <label className=" ml-1 ">Rental Price per Day</label>
          <input
            className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
            type="text"
            placeholder="Lessor Comapany Name"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </main>
    </form>
  );
}
