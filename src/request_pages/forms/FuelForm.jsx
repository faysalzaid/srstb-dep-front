import React, { useState } from "react";
import "../../assets/css/requestPages.css";
import { FuelContext } from "../../context/RequestContext";
const Page = "div";

export default function FuelForm() {
  const {
    driverName,
    setDriverName,
    driverNum,
    setDriverNum,
    plateNum,
    setPlateNum,
    fuelType,
    setFuelType,
    fuelAmount,
    setFuelAmount,
    goingTo,
    setGoingTo,
    date,
    setDate,
    preparer,
    setPreparer,
    premiser,
    setPremiser,
    preview,
    setPreview,
  } = React.useContext(FuelContext);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setPreview(!preview);
  };

  return (
    <form
      className=" fill_form mx-auto border rounded-md mt-4 dark:border-gray-600 dark:text-gray-200 "
      onSubmit={handleFormSubmit}
    >
      <h3 className=" font-semibold text-xl text-center mb-12 ">
        Foomka Codsiga Shidaalka
      </h3>

      {/* Page 1 */}
      <Page className=" grid gap-5 justify-center ">
        <section className=" grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <article className=" flex flex-col gap-1 ">
            <label>Magaca Dirawalka</label>
            <input
              className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
              type="text"
              placeholder="Wax ku qor"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
            />
          </article>
          <article className=" flex flex-col gap-1 ">
            <label>Taleefanka Dirawalka</label>
            <input
              className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
              type="tel"
              placeholder="Wax ku qor"
              value={driverNum}
              onChange={(e) => setDriverNum(e.target.value)}
            />
          </article>
          <article className=" flex flex-col gap-1 ">
            <label>Taarikada Gaadhiga</label>
            <input
              className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
              type="text"
              placeholder="Wax ku qor"
              value={plateNum}
              onChange={(e) => setPlateNum(e.target.value)}
            />
          </article>
          <article className=" flex flex-col gap-1 ">
            <label>Nooca Shidaalka</label>
            <input
              className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
              type="tel"
              placeholder="Wax ku qor"
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
            />
          </article>
          <article className=" flex flex-col gap-1 ">
            <label>Goobta Uu Tagayo</label>
            <input
              className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
              type="text"
              placeholder="Wax ku qor"
              value={goingTo}
              onChange={(e) => setGoingTo(e.target.value)}
            />
          </article>
          <article className=" flex flex-col gap-1 ">
            <label>Imisa Litir</label>
            <input
              className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
              type="number"
              placeholder="Wax ku qor"
              value={fuelAmount}
              onChange={(e) => setFuelAmount(e.target.value)}
            />
          </article>
          <article className=" flex flex-col gap-1 ">
            <label>Taariikhda</label>
            <input
              className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
              type="date"
              placeholder="Wax ku qor"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </article>
          <article className=" flex flex-col gap-1 ">
            <label>Diyaariye</label>
            <input
              className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
              type="text"
              placeholder="Wax ku qor"
              value={preparer}
              onChange={(e) => setPreparer(e.target.value)}
            />
          </article>
          <article className=" flex flex-col gap-1 ">
            <label>Ogaalade</label>
            <input
              className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
              type="text"
              placeholder="Wax ku qor"
              value={premiser}
              onChange={(e) => setPremiser(e.target.value)}
            />
          </article>
        </section>
      </Page>
    </form>
  );
}
