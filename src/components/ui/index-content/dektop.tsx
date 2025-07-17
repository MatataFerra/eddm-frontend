"use client";

import { isDesktop, isTablet } from "react-device-detect";
import { ListIndexContent } from "./list";

export function DesktopIndexContent() {
  return (
    <>
      <div className="bottom-0 top-0 absolute" style={{ right: "-60%" }}>
        Índice de artículos:
        <ListIndexContent />
      </div>
    </>
  );
}
