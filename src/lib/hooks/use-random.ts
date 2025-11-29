import { useState } from "react";

type UseRandomProps = {
  min: number;
  max: number;
  floor?: boolean;
};

export function useRandom({ min, max, floor = true }: UseRandomProps): number {
  return useState(() => {
    const delta = max - min;
    const value = Math.random() * delta + min;
    return floor ? Math.floor(value) : value;
  })[0];
}
