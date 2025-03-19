"use client";

import { useEffect } from "react";
// @ts-expect-error - fireflies.js is not typed
import Fireflies from "fireflies.js";

export function FirefliesComponent() {
  useEffect(() => {
    Fireflies.initialize(
      undefined,
      [1, 3],
      [{ fill: "#ffffff", glow: "#ffffff" }],
      true,
      true,
      true,
      false
    );
  }, []);

  return <></>;
}
