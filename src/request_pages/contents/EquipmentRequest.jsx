import { EquipmentRentalContext } from "context/RequestContext";
import React, { useState } from "react";
import { BsPrinter } from "react-icons/bs";
import EquipmentForm from "request_pages/forms/EquipmentForm";

export default function EquipmentRequest() {
  const [date, setDate] = useState("");
  const [company1, setCompany1] = useState("");
  const [company1Tel, setCompany1Tel] = useState("");
  const [company1Add, setCompany1Add] = useState("");
  const [company2, setCompany2] = useState("");
  const [company2Tel, setCompany2Tel] = useState("");
  const [company2Add, setCompany2Add] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [model, setmodel] = useState("");
  const [plateNum, setPlateNum] = useState("");
  const [price, setPrice] = useState("");

  return (
    <EquipmentRentalContext.Provider
      value={{
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
      }}
    >
      <div>
        <main className=" flex flex-col gap-5">
          <section className=" top_section">
            <EquipmentForm />
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

          <section className=" bottom_section py-6 px-5 box-content mx-auto dark:text-gray-300">
            <p className=" font-semibold text-xl mb-5 text-center">
              Equipment Rental Contract Agreement
            </p>

            <p className=" mb-6">
              This agreement is made and entered on {date || "_______________"}{" "}
              by {company1 || "_______________"} Tel{" "}
              {company1Tel || "_______________"} Address{" "}
              {company1Add || "_______________"} (
              <i>hereinafter referred to as the LESSEE on one part</i>), and{" "}
              {company2 || "_______________"} Tel{" "}
              {company2Tel || "_______________"} Address{" "}
              {company2Add || "_______________"}, (
              <i>here in after referred to as the LESSOR on the other part</i>).{" "}
            </p>

            <div className=" list_container">
              <ol className=" flex flex-col gap-6">
                {/* ==== a ==== */}
                <li>
                  <p className=" font-semibold mb-3">THE IDENTITY OF MACHINE</p>

                  <p>
                    The Lessor has agreed to rent lessee, when equipment is in
                    working Condition the machine shall be operated by employees
                    of the Lessor
                  </p>
                </li>

                {/* ==== b ==== */}
                <li>
                  <p className=" font-semibold mb-3">
                    EQUIPMENT TYPE, CAPACITY AND RENTAL RATE
                  </p>

                  <table className=" border border-gray-300">
                    <thead>
                      <tr className=" h-10 border-b border-gray-300">
                        <th className=" border-r border-gray-300 px-3">item</th>
                        <th className=" border-r border-gray-300 px-3">
                          Equipment Type
                        </th>
                        <th className=" border-r border-gray-300 px-3">
                          Model
                        </th>
                        <th className=" border-r border-gray-300 px-3">
                          Plate Number
                        </th>
                        <th className=" border-r border-gray-300 px-3">
                          Daily rental rate in Birr
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className=" border-r border-gray-300 px-3">1</td>
                        <td className=" border-r border-gray-300 px-3">
                          {equipmentType}
                        </td>
                        <td className=" border-r border-gray-300 px-3">
                          {model}
                        </td>
                        <td className=" border-r border-gray-300 px-3">
                          {plateNum}
                        </td>
                        <td className=" border-r border-gray-300 px-3">
                          {price}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </li>

                <li>
                  <p className=" font-semibold mb-3">RENTAL PERIOD </p>
                  <ul>
                    <li>
                      The rental period shall begin from the time the Equipment
                      arrives at working site of the LESSEE and shall be valid
                      for at least thirty days ( 30 days) and will be renewed
                      for this project or other
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

                <li>
                  <p className=" font-semibold mb-3">LOCATION OF WORK SITE</p>

                  <p>
                    For the purpose of this contract the LESSEE'S work site
                    shall be at Somali regional state the LESSEE remains in
                    possession of the Equipment outside the above specified work
                    site without the authorization of the LESSOR{" "}
                  </p>
                </li>

                <li>
                  <p className=" font-semibold mb-3">
                    EQUIPMENT WORKING HOURS{" "}
                  </p>
                  <p>
                    The Lessee agrees to keep the equipment as working hours
                  </p>
                </li>

                <li>
                  <p className=" font-semibold mb-3">PERFOMANCE</p>
                  <p>
                    In the event the machine fails to perform the Lesser has to
                    maintain the machine as soon as possible the Lessee shall
                    have the right to terminate the contract after giving A
                    written notice to Lesser if the LESSOR does not maintain and
                    make the machine operable within 5(two days)
                  </p>
                </li>

                <li>
                  <p className=" font-semibold mb-3">FUEL AND LUBRICANTS</p>
                  <ul>
                    <li>
                      Fuel required for the equipment shall be supplied by the
                      lessee at his own cost{" "}
                    </li>
                    <li>
                      Lubricants required for the equipment shall be supplied by
                      the LESSOR at his own cost.
                    </li>
                  </ul>
                </li>
              </ol>
            </div>
          </section>
        </main>
      </div>
    </EquipmentRentalContext.Provider>
  );
}
