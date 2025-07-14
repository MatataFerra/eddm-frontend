"use client";

import { isDesktop } from "react-device-detect";
import { ListIndexContent } from "./list";

export function DesktopIndexContent() {
  return (
    <>
      {isDesktop ? (
        <div className="bottom-0 top-0 absolute" style={{ right: "-50%" }}>
          Índice de artículos:
          <ListIndexContent />
        </div>
      ) : null}
    </>
  );
}
