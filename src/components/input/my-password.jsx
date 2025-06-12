"use client";
import { Input, Password } from "rizzui";

export default function MyPassword({
  inputID = "",
  inputLabel = "",
  inputPlaceholder = "",
  inputValue,
  inputSetValue,
  inputErrorMsg = "",
  inputIsRequired = true,
  inputIsReadOnly = false,
  inputClass = "",
  inputLabelClass = "!font-semibold",
}) {
  return (
    <Password
      id={inputID}
      label={inputLabel}
      placeholder={inputPlaceholder}
      value={inputValue}
      onChange={(e) => inputSetValue(e.target.value)}
      error={inputValue ? "" : inputErrorMsg}
      required={inputIsRequired}
      readOnly={inputIsReadOnly}
      className={inputClass}
      labelClassName={inputLabelClass}
    />
  );
}
