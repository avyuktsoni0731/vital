import React from "react";
import { Input } from "@nextui-org/react";

export default function AgeField() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input isRequired type="number" label="Enter your age" />
    </div>
  );
}
