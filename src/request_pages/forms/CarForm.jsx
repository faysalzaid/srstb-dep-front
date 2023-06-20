import { CarRentalContext } from "context/RequestContext";
import "../../assets/css/requestPages.css";
import React from "react";

export default function CarForm() {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    lessor,
    setLessor,
    lessorTel,
    setLessorTel,
    lessorAdd,
    setLessorAdd,
    vehicleType,
    setVehicleType,
    lesseeName,
    setLesseeName,
    lessorName,
    setLessorName,
    equipmentType,
    setEquipmentType,
    plateNum,
    setPlateNum,
    duration,
    setDuration,
    rentPerDay,
    setRentPerDay,
  } = React.useContext(CarRentalContext);
  return (
    <form className=" fill_form border border-gray-300 dark:border-gray-600 mt-6 mx-auto dark:text-gray-300 rounded-md ">
      <h3 className=" font-semibold  text-xl text-center mb-12">
        Car Rental Contract Form
      </h3>

      {/* main */}
      <main className=" grid sm:grid-cols-1 md:grid-cols-3 gap-4">
        {/* ==== a ==== */}
        <div className=" flex flex-col">
          <label className=" ml-1 ">Start Date</label>
          <input
            className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
            type="date"
            placeholder="DD/MM/YYYY"
            data-date=""
            data-date-format="DD MMMM YYYY"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        {/* ==== b ==== */}
        <div className=" flex flex-col">
          <label className=" ml-1 ">End Date</label>
          <input
            className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
            type="date"
            placeholder="DD/MM/YYYY"
            data-date=""
            data-date-format="DD MMMM YYYY"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* ==== c ==== */}
        <div className=" flex flex-col">
          <label className=" ml-1 ">Lessor</label>
          <input
            className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
            type="text"
            placeholder="Lessor Comapany Name"
            value={lessor}
            onChange={(e) => setLessor(e.target.value)}
          />
        </div>

        {/* ==== D ==== */}
        <div className=" flex flex-col">
          <label className=" ml-1 ">Lessor Tel</label>
          <input
            className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
            type="text"
            placeholder="Lessor Comapany Tel"
            value={lessorTel}
            onChange={(e) => setLessorTel(e.target.value)}
          />
        </div>

        {/* ==== E ==== */}
        <div className=" flex flex-col">
          <label className=" ml-1 ">Lessor Address</label>
          <input
            className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
            type="text"
            placeholder="Lessor Comapany Address"
            value={lessorAdd}
            onChange={(e) => setLessorAdd(e.target.value)}
          />
        </div>

        {/* ==== F ==== */}
        <div className=" flex flex-col">
          <label className=" ml-1 ">Vehicle Type</label>
          <input
            className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
            type="text"
            placeholder="Vehicle Type"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          />
        </div>

        <div className=" flex flex-col">
          <label className=" ml-1 ">Equipment Type</label>
          <input
            className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
            type="text"
            placeholder="Vehicle Type"
            value={equipmentType}
            onChange={(e) => setEquipmentType(e.target.value)}
          />
        </div>

        <div className=" flex flex-col">
          <label className=" ml-1 ">Plate Number</label>
          <input
            className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
            type="text"
            placeholder="Vehicle Type"
            value={plateNum}
            onChange={(e) => setPlateNum(e.target.value)}
          />
        </div>

        <div className=" flex flex-col">
          <label className=" ml-1 ">Duration</label>
          <input
            className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
            type="text"
            placeholder="Vehicle Type"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div className=" flex flex-col">
          <label className=" ml-1 ">Amount per Day</label>
          <input
            className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
            type="text"
            placeholder="Vehicle Type"
            value={rentPerDay}
            onChange={(e) => setRentPerDay(e.target.value)}
          />
        </div>

        {/* ==== G ==== */}
        <div className=" flex flex-col">
          <label className=" ml-1 ">Lessee Name</label>
          <input
            className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
            type="text"
            placeholder="Lessee Name"
            value={lesseeName}
            onChange={(e) => setLesseeName(e.target.value)}
          />
        </div>

        {/* ==== c ==== */}
        <div className=" flex flex-col">
          <label className=" ml-1 ">Lessor Name</label>
          <input
            className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
            type="text"
            placeholder="Lessor Name"
            value={lessorName}
            onChange={(e) => setLessorName(e.target.value)}
          />
        </div>
      </main>
    </form>
  );
}
