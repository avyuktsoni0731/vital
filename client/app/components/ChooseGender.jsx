import React from "react";
import { RadioGroup, Radio } from "@nextui-org/react";

export default function ChooseGender() {
  return (
    <RadioGroup label="Select a gender">
      <Radio value="male">Male</Radio>
      <Radio value="female">Female</Radio>
      <Radio value="others">Others</Radio>
    </RadioGroup>
  );
}
