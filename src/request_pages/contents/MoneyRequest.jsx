import React, { useState } from "react";
import { BsPrinter } from "react-icons/bs";
import "../../assets/css/requestPages.css";
import MoneyForm from "request_pages/forms/MoneyForm";
import { MoneyContext } from "context/RequestContext";
import { CgPrinter } from "react-icons/cg";
import { BiPrinter } from "react-icons/bi";

var Container = "div";

const MoneyRequest = () => {
  const [to, setTo] = useState("");
  const [project, setProject] = useState("");
  const [when, setWhen] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  return (
    <MoneyContext.Provider
      value={{
        to,
        setTo,
        project,
        setProject,
        when,
        setWhen,
        amount,
        setAmount,
        reason,
        setReason,
      }}
    >
      <Container className=" py-5 ">
        <span className=" printable_title text-xl font-semibold dark:text-gray-50 ">
          Money Request
        </span>

        <MoneyForm />

        {/* <p className=" preview text-center my-10">Preview</p> */}

        <main className=" printable_container border border-gray-300 dark:border-gray-600 p-6 dark:text-gray-50">
          <p className=" text-2xl font-semibold mb-8">Ku: {to}</p>

          <p className=" text-lg font-semibold mb-2 text-center">
            Ujeedo: Codisi Lacageed
          </p>

          <p>
            Waxaan xafiiska sharafta leh ka codsanaynaa in uu noo soo shubo
            lacagta ku baxday{" "}
            <span className=" font-medium">{project || "______________"}</span>{" "}
            siduu ahaa heshiiskeenu waa in lasoo shubaa lacagta{" "}
            <span className=" ">{project || "______________"}</span> isla marka{" "}
            <span className=" font-medium">{when || "______________"}</span>
          </p>

          <p className=" mt-3 mb-6">
            Lacagtaas oo dhan{" "}
            <span className=" font-medium">{amount || "______________"}</span>{" "}
            Birr{" "}
          </p>

          <p>
            Waxaan mar labaad xafiiska sharafta leh ka codsanaynaa in aad noo
            tixgalisaan codsigan{" "}
            <span className=" font-medium">{reason || "______________"}</span>.
          </p>

          <p className=" text-right font-semibold mt-16">Mahadsanidiin</p>
        </main>

        <button className=" flex gap-2">
          {" "}
          <span className=" text-sm">Print</span> <BiPrinter />
        </button>
      </Container>
    </MoneyContext.Provider>
  );
};

export default MoneyRequest;

{
  /* <main className=" printable_container flex flex-col gap-4 py-6 px-4">
<div className=" flex gap-2 justify-left text-xl font-semibold">
  <label>Ku:</label>
  <input className=" input_area" />
</div>

<div className=" flex gap-2 justify-center text-lg font-semibold">
  <label>Ujeedo: </label>
  <p>Codsi Lacageed</p>
</div>

<div className="main_content ">
  <p className=" ">
    Waxaan xafiiska sharafta leh ka codsanaynaa in uu noosoo shubo
    lacagta ku baxday <input className=" input_area" /> siduu ahaa
    heshiiskeenu waa in lasoo shubaa lacagta shidaalka isla marka ay
    dhamaato.{" "}
  </p>
  <p className=" mt-3">
    Lacagtaas oo dhan <input className=" input_area" /> Birr
  </p>
</div>

<p className=" mt-20 text-right">Mahadsanidiin</p>
</main>

<section className=" printable_button mt-4">
<button
  className=" float-right box-content py-1 px-3 rounded-md bg-cool-gray-200 flex items-center gap-2"
  onClick={() => {
    window.print();
  }}
>
  <span className=" text-sm">Print</span>
  <BsPrinter className=" text-lg" />
</button>
</section>  */
}
