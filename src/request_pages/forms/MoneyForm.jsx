import { MoneyContext } from "context/RequestContext";
import React from "react";

export default function MoneyForm() {
  const {
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
  } = React.useContext(MoneyContext);

  return (
    <form className=" fill_form border border-gray-300 dark:border-gray-600 mt-6 mx-auto dark:text-gray-300 rounded-md ">
      <h3 className=" font-semibold  text-xl text-center mb-12">
        Foomka Codsiga Lacagta
      </h3>

      <main className=" grid sm:grid-cols-1 md:grid-cols-3 gap-4">
        <div className=" flex flex-col">
          <label className=" ml-1 ">Kusocota</label>
          <input
            className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
            type="text"
            placeholder="xafiiska jidadka"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        <div className=" flex flex-col">
          <label className=" ml-1 ">Mashruuca</label>
          <input
            className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
            type="text"
            placeholder="dhismaha jidka GR-59"
            value={project}
            onChange={(e) => setProject(e.target.value)}
          />
        </div>

        <div className=" flex flex-col">
          <label className=" ml-1 ">Goorta</label>
          <input
            className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
            type="text"
            placeholder="...dhismaha wadadu dhamaato "
            value={when}
            onChange={(e) => setWhen(e.target.value)}
          />
        </div>

        <div className=" flex flex-col">
          <label className=" ml-1 ">Cadadka Lacagta</label>
          <input
            className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
            type="text"
            placeholder="800,000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className=" flex flex-col">
          <label className=" ml-1 ">Sababta</label>
          <input
            className=" bg-transparent border border-gray-300 dark:border-gray-600 placeholder-cool-gray-400 dark:placeholder-gray-500 "
            type="text"
            placeholder="si mashruuca loo dhamaytiro"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
      </main>
    </form>
  );
}
