import React from "react";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";

function Sidebar() {
  return (
    <div className=" side_bar">
      <DesktopSidebar />
      <MobileSidebar />
    </div>
  );
}

export default Sidebar;
