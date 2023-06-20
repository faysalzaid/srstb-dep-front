import { CarRentalContext } from "context/RequestContext";
import React, { useState } from "react";
import { BsPrinter } from "react-icons/bs";
import CarForm from "request_pages/forms/CarForm";
let Container = "div";

export default function CarRental() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [lessor, setLessor] = useState("");
  const [lessorTel, setLessorTel] = useState("");
  const [lessorAdd, setLessorAdd] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [lesseeName, setLesseeName] = useState("");
  const [lessorName, setLessorName] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [plateNum, setPlateNum] = useState("");
  const [duration, setDuration] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");

  return (
    <CarRentalContext.Provider
      value={{
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
      }}
    >
      <div
        className=" min-w-full pt-5 overflow-scroll  "
        style={{ height: "calc(100vh - 76px)" }}
      >
        {" "}
        <main className=" main_section h-full w-full flex flex-col gap-4  ">
          {/* ==== Left Section */}
          <section className=" top_section ">
            <CarForm />
            <button
              className=" flex items-center gap-2 border border-gray-400 rounded-md py-2 px-4 mx-auto mt-5 dark:text-gray-300"
              onClick={() => {
                window.print();
              }}
            >
              {" "}
              Print
              <BsPrinter className=" box-content px-2 " />
            </button>
          </section>

          {/* Right Section */}
          <section className=" bottom_section py-6 px-5 box-content mx-auto dark:text-gray-300 ">
            <p className=" text-center mb-6 font-semibold text-xl">
              Car Rental Contract Agreement
            </p>

            {/* ==== 1 ==== */}
            <p className=" mb-6">
              This agreement is made and entered on{" "}
              <span className=" font-semibold">
                {startDate} - {endDate}
              </span>{" "}
              by{" "}
              <span className=" font-semibold">
                Somali regional state Roads Bureau
              </span>{" "}
              Tel <span className=" font-semibold">+251-25-775-24-29</span>,
              address <span className=" font-semibold">Jigjiga</span> (
              <i>hereinafter referred to as the LESSEE on one part </i>), and{" "}
              <span className=" font-semibold">
                {lessor || "______________"}
              </span>{" "}
              Tel{" "}
              <span className=" font-semibold">
                {lessorTel || "______________"}
              </span>{" "}
              address{" "}
              <span className=" font-semibold">
                {lessorAdd || "______________"}
              </span>{" "}
              (<i> hereinafter referred to as the LESSOR on the other part </i>
              ).
            </p>

            {/* ==== 2 ==== */}
            <div className=" list_container ">
              <ol className=" flex flex-col gap-10">
                {/* ===== a ===== */}
                <li className="">
                  <p className=" font-semibold mb-3">THE IDENTITY OF MACHINE</p>
                  <p>
                    The Lessor has agreed to rent{" "}
                    <span className=" font-semibold">
                      {vehicleType || "______________"}
                    </span>
                    . In a working Condition the machine shall be operated by
                    employees of the Lessor.
                  </p>
                </li>

                {/* ===== B ===== */}
                <li>
                  <p className=" font-semibold mb-3">
                    EQUIPMENT TYPE, CAPACITY AND RENTAL RATE :-{" "}
                  </p>

                  <div className=" overflow-x-scroll mb-3">
                    <table className=" border border-gray-300">
                      <thead>
                        <tr className=" h-10 border-b border-gray-300">
                          <th className=" whitespace-no-wrap border-r border-gray-400 px-3">
                            Item
                          </th>
                          <th className=" whitespace-no-wrap border-r border-gray-400 px-3">
                            Equipment type
                          </th>
                          <th className=" whitespace-no-wrap border-r border-gray-400 px-3">
                            Plate number
                          </th>
                          <th className=" whitespace-no-wrap border-r border-gray-400 px-3">
                            Duration
                          </th>
                          <th className="  border-r border-gray-400 px-3">
                            rent per day in Birr
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr className=" border-b border-gray-300 ">
                          <td className=" border-r border-gray-400 px-3">1</td>
                          <td className=" border-r border-gray-400 px-3">
                            {equipmentType}
                          </td>
                          <td className=" border-r border-gray-400 px-3">
                            {plateNum}
                          </td>
                          <td className=" whitespace-no-wrap border-r border-gray-400 px-3">
                            {duration || "____"} Days
                          </td>
                          <td className=" border-r border-gray-400 px-3">
                            {rentPerDay}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className=" font-semibold mb-6">RENTAL PERIOD</p>

                  <ul className=" grid gap-5">
                    <li>
                      The rental period shall begin from the time the Equipment
                      arrives at working site of the LESSEE and shall be valid
                      for at least ( 30 days ) and will be renewed for this
                      project or other
                    </li>
                    <li>
                      This period can be extended if the two parties have signed
                      a replacement of this by transmitting such notice if
                      intent to the other party 15(fifteen) days before the
                      intended date of termination.
                    </li>
                    <li>
                      Where on the duty of this contract the LESSOR remains in
                      possession of the Equipment
                    </li>
                    <li>
                      The LESSOR must transport the equipment to and from the
                      LESSEEE site without any delay.
                    </li>
                    <li>
                      The LESSOR will make ready submit the equipment with in 7
                      (seven ) days of the signing of contract
                    </li>
                  </ul>
                </li>

                {/* ==== C ==== */}
                <li className="">
                  <p className=" font-semibold mb-3">LOCATION OF WORK SITE</p>

                  <p>
                    For the purpose of this contract the LESSEE’S work site
                    shall be at Somali regional state ROAD INVENTORY ROAD.
                  </p>
                </li>

                {/* ==== D ===== */}
                <li>
                  <p className=" font-semibold mb-3">EQUIPMENT WORKING HOURS</p>
                  <p>
                    The Lessee agrees to keep the equipment as working hours
                  </p>

                  <ul>
                    <li>
                      If the machine works on public holidays the LESSEE shall
                      pay the agreed rent However, where force Major public
                      holidays, breakdown of the machine and absence or illness
                      of the operator no payment shall be made in this case{" "}
                    </li>
                    <li>
                      Idle time, if the machine becomes idle because of the
                      LESSEE fault, the idle time will be effected. Idle time is
                      50% (Percent) of the regular working days.
                    </li>
                  </ul>
                </li>

                {/* ==== E ==== */}
                <li>
                  <p className=" font-semibold mb-3">PERFOMANCE</p>

                  <p>
                    In the event the machine fails to perform the Lesser has to
                    maintain the machine as soon as possible the Lessee shall
                    have the right to terminate the contract after giving A
                    written notice to Lesser if the LESSOR does not maintain and
                    make the machine operable within 5(five days)
                  </p>
                </li>

                {/* ==== F ==== */}
                <li>
                  <p className=" font-semibold mb-3">FUEL AND LUBRICANTS</p>
                  <ul>
                    <li>
                      Fuel required for the equipment shall be supplied by the
                      lessee at his own cost
                    </li>
                    <li>
                      Lubricants required for the equipment shall be supplied by
                      the LESSOR at his own cost.
                    </li>
                  </ul>
                </li>

                {/* ==== G ==== */}
                <li>
                  <p className=" font-semibold mb-3">MAINTENANCE</p>
                  <p>The LESSOR shall maintain the equipment at his cost</p>
                  <ul>
                    <li>
                      The LESSOR shall not sub-let or assign the equipment to
                      any third party
                    </li>
                    <li>
                      Title of the equipment shall at time remain vested on the
                      LESSOR the LESSOR agrees to keep the equipment free and
                      clear of any claims or in cumbrance and further agrees to
                      use the machine in accordance with all applicable
                      government regulation ordinances of laws the LESSEE shall
                      give the LESSOR immediate notice one any development
                      related to such Event.
                    </li>
                  </ul>
                </li>

                {/* ===== H ==== */}
                <li>
                  <p className=" font-semibold mb-3">MODE OF PAYMENT</p>
                  <p>
                    Payment of 10 days shall be made in advance and remaining
                    balance, The LESSOR’S request for payment is to be made to
                    the LESSEE in writing, accompanied by a timesheet, jointly
                    signed by the LESSOR'S representative and LESSEE’S site
                    representative describing the services performed, and upon
                    fulfillment of other obligations stipulated in the contract.
                  </p>
                </li>

                {/* ==== I ==== */}
                <li>
                  <p className=" font-semibold mb-3">EFFECTIVE DATES</p>
                  <p>
                    This contract shall come in to force as of the date signed
                    by authorized representatives of the LESSOR and the LESSEE
                    for a period indicated in 2(a) above and as of their
                    respective the seal has been affixed.
                  </p>
                </li>
              </ol>
            </div>

            <p className=" font-semibold mb-6 text-center mt-6">
              I have read and understand the terms and conditions of this rental
              agreement
            </p>

            <div className=" grid grid-cols-2">
              <article>
                <p className=" font-semibold text-lg mb-2">Lessee</p>
                <p>
                  <span className=" font-medium">Name</span>:{" "}
                  {lesseeName || "_______________________"}
                </p>
                <p className=" mt-3">
                  <span className=" font-medium">Signature</span> :
                  _______________________
                </p>
              </article>

              <article>
                <p className=" font-semibold text-lg mb-2">Lessor</p>
                <p>
                  <span className=" font-medium">Name</span>:{" "}
                  {lessorName || "_______________________"}
                </p>
                <p className=" mt-3">
                  <span className=" font-medium">Signature</span> :
                  _______________________
                </p>
              </article>
            </div>

            <p className=" font-semibold text-xl text-center mt-10 ">Witness</p>

            <article className=" flex justify-between">
              <div className=" flex flex-col gap-3">
                <p className=" mb-3">Name</p>
                <p>_______________________________</p>
                <p>_______________________________</p>
                <p>_______________________________</p>
              </div>

              <div className=" flex flex-col gap-3">
                <p className=" mb-3">Signature</p>
                <p>_______________________</p>
                <p>_______________________</p>
                <p>_______________________</p>
              </div>
            </article>
          </section>
        </main>
      </div>
    </CarRentalContext.Provider>
  );
}
