import React from "react";
import { NavLink } from "react-router-dom";
import RequestButton from "./RequestButton";

let Container = "div";

const NewLetterRequest = () => {
  return (
    <Container className=" py-5 ">
      {/* Title */}
      <span className=" font-semibold text-2xl dark:text-gray-400">
        Letter Request
      </span>

      {/* Request Buttons */}
      <section className=" mt-6 grid sm:grid-flow-row md:grid-cols-2 gap-5 ">
        <RequestButton to="./money_request" title="Money Request" />
        <RequestButton to="./fuel_request" title="Fuel Request" />
        <RequestButton to="./car_rental_request" title="Car Rental Request" />
        <RequestButton to="./equipment_request" title="Equipment Request" />
        <RequestButton to="./others_request" title="Others" />
      </section>
    </Container>
  );
};

export default NewLetterRequest;

{
  /* <NavLink to="./money_request">Money Request</NavLink> */
}
