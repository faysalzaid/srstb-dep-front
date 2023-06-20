import { Box } from "@mui/material";
import React, { useState } from "react";
import { BsPrinter } from "react-icons/bs";
import FuelForm from "../forms/FuelForm";
import { FuelContext } from "../../context/RequestContext";
const Container = "div";

export default function FuelRequest() {
  const [driverName, setDriverName] = useState("");
  const [driverNum, setDriverNum] = useState("");
  const [plateNum, setPlateNum] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [fuelAmount, setFuelAmount] = useState("");
  const [goingTo, setGoingTo] = useState("");
  const [date, setDate] = useState("");
  const [preparer, setPreparer] = useState("");
  const [premiser, setPremiser] = useState("");

  const [preview, setPreview] = useState(true);

  return (
    <FuelContext.Provider
      value={{
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
      }}
    >
      <Container className=" py-5 ">
        <span className=" printable_title text-xl font-semibold dark:text-gray-300 ">
          Fuel Request
        </span>

        <FuelForm />

        <main className=" printable_container fuel_display text-lg border border-gray-300 p-8 dark:text-gray-50 ">
          <h2 className=" font-semibold text-2xl mb-6 underline ">
            Foomka Codsiga Shidaalka
          </h2>
          <p>
            Magaca dirawalka{" "}
            <span className=" font-semibold">
              {driverName || "________________"}
            </span>
            , Taleefanka dirawalka{" "}
            <span className={` font-semibold `}>
              {driverNum || "__________"}
            </span>
          </p>
          <p>
            Taarikada gaadhiga{" "}
            <span className={` font-semibold `}>
              {plateNum || "__________"}
            </span>
            , Nooca shidaalka{" "}
            <span className={` font-semibold `}>
              {fuelType || "__________"}
            </span>
          </p>
          <p>
            Goobta uu tagayo{" "}
            <span className={` font-semibold `}>
              {goingTo || "_____________"}
            </span>
            , Litir
            <span className={` font-semibold `}>
              {fuelAmount || "__________"}
            </span>
            .
          </p>
          <p>
            Taariikhada{" "}
            <span className=" font-semibold">{date || "__________"}</span>.
          </p>
          <p>
            Diyaariye{" "}
            <span className=" font-semibold">
              {preparer || "_______________"}
            </span>
            , Ogolaade{" "}
            <span className=" font-semibold">
              {premiser.length >= 1 ? premiser : "___________________"}
            </span>
            .
          </p>

          {/* Signature */}
          <section>
            <p className=" mt-10 mb-3 font-semibold">Saxeexyada</p>
            <div className=" flex gap-2 items-center mb-3">
              <label>Codsadaha</label>
              <span>______________________</span>
            </div>
            <div className=" flex gap-2 items-center mb-3">
              <label>Diyaariye</label>
              <span>______________________</span>
            </div>
            <div className=" flex gap-2 items-center mb-3">
              <label>Ogolaade</label>
              <span>______________________</span>
            </div>
          </section>
        </main>
      </Container>
    </FuelContext.Provider>
  );
}
