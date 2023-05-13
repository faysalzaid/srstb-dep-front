import { Box } from "@mui/material";
import React from "react";
import { BsWifi, BsFillHouseDoorFill } from "react-icons/bs";
import { IoWater } from "react-icons/io5";
import { GiElectric } from "react-icons/gi";
// import { AppContext } from "../../App";

const Latest_Projects = () => {
  // const { lightMode } = React.useContext(AppContext);
  return (
    <section
      className=" w-full h-full flex flex-col gap-3 pt-4 "
      // style={lightMode ? { color: "black" } : { color: "white" }}
    >
      <Box className=" flex justify-between items-center border-b py-2 pr-2 ">
        <div className=" flex items-center gap-2">
          <div className=" w-[40px] h-[40px] rounded-md bg-amber-300 flex items-center justify-center">
            <BsWifi className=" text-lg text-black" />
          </div>
          <span className=" text-sm">Office Network</span>
        </div>
        <div className="h-fit">-$143.00</div>
      </Box>

      <Box className=" flex justify-between border-b py-2 pr-2 ">
        <div className=" flex items-center gap-2">
          <div className=" w-[40px] h-[40px] rounded-md bg-lime-300 flex items-center justify-center">
            <BsFillHouseDoorFill className=" text-lg text-green-600" />
          </div>
          <span className=" text-sm">House Rent</span>
        </div>
        <div className="h-fit">-$845.00</div>
      </Box>

      <Box className=" flex justify-between border-b py-2 pr-2 ">
        <div className=" flex items-center gap-2">
          <div className=" w-[40px] h-[40px] rounded-md bg-sky-300 flex items-center justify-center">
            <IoWater className=" text-lg text-sky-600" />
          </div>
          <span className=" text-sm">Water</span>
        </div>
        <div className="h-fit">-$455.00</div>
      </Box>

      <Box className=" flex justify-between py-2 pr-2 ">
        <div className=" flex items-center gap-2">
          <div className=" w-[40px] h-[40px] rounded-md bg-yellow-400 flex items-center justify-center">
            <GiElectric className=" text-xl text-black" />
          </div>
          <span className=" text-sm">Electricity</span>
        </div>
        <div className="h-fit">-$135.55</div>
      </Box>
    </section>
  );
};

export default Latest_Projects;
