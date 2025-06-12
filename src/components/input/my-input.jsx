"use client";
import { Input, Password } from "rizzui";
import {
  checkNumberFieldValue,
  restrictKeysForNumberField,
} from "../../helpers/utilities";

export default function MyInput({
  inputID = "",
  inputName = "",
  inputLabel = "",
  inputPlaceholder = "Enter " + inputLabel,
  inputType = "text",
  inputValue,
  inputSetValue,
  inputMinLength = "0",
  inputMaxLength = "0",
  inputErrorMsg = "",
  showMaxLength = true,
  inputIsRequired = true,
  inputIsReadOnly = false,
  inputIsDisabled = false,
  inputClass = "",
  inputLabelClass = "",
  inputPrefix = "",
  inputPrefixClass = "",
  inputFieldClass = "",
}) {
  const bindValueOnChange = (e) => {
    const val = e.target.value;
    if (inputType === "number") {
      const parsed = parseFloat(val);
      inputSetValue(isNaN(parsed) ? "" : parsed);
    } else {
      inputSetValue(val);
    }
  };

  const bindValueOnKeyDown = (e) => {
    if (inputType === "number") {
      restrictKeysForNumberField(e);
    }
  };

  return (
    <Input
      id={inputID}
      name={inputName}
      type={inputType}
      label={inputLabel}
      placeholder={inputPlaceholder}
      value={inputValue}
      onChange={(e) => bindValueOnChange(e)}
      onKeyDown={(e) => bindValueOnKeyDown(e)}
      minLength={inputMinLength}
      maxLength={
        inputType === "number"
          ? inputMaxLength
          : inputType === "text"
            ? showMaxLength
              ? inputMaxLength
              : ""
            : ""
      }
      min={inputMinLength}
      max={showMaxLength ? inputMaxLength : ""}
      suffix={showMaxLength ? inputValue.length + `/${inputMaxLength}` : ""}
      suffixClassName={showMaxLength ? "opacity-70" : ""}
      prefix={inputPrefix}
      prefixClassName={inputPrefixClass + " fs-b2c"}
      error={inputValue ? "" : inputErrorMsg}
      required={inputIsRequired}
      readOnly={inputIsReadOnly}
      disabled={inputIsDisabled}
      className={inputClass + " fs-b2c"}
      inputClassName={
        inputFieldClass +
        " fs-b2c px-2 focus:outline-none focus:ring-0 focus:border-transparent"
      }
      labelClassName={
        inputLabelClass + " fs-b2c mb-0 control-label col-form-label"
      }
    />
  );
}
