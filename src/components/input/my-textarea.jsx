"use client";
import { Textarea } from "rizzui";

export default function MyTextarea({
  inputID = "",
  inputLabel = "",
  inputPlaceholder = "",
  inputType = "text",
  inputValue,
  inputSetValue,
  inputMaxLength = "0",
  inputErrorMsg = "",
  showMaxLength = true,
  inputIsRequired = true,
  inputIsReadOnly = false,
  inputIsDisabled = false,
  inputClass = "",
  inputLabelClass = "control-label col-form-label !font-semibold",
}) {
  return (
    <Textarea
      id={inputID}
      type={inputType}
      label={inputLabel}
      placeholder={inputPlaceholder}
      value={inputValue}
      onChange={
        inputType == "text"
          ? (e) => inputSetValue(String(e.target.value))
          : (e) => inputSetValue(e.target.value)
      }
      maxLength={showMaxLength ? inputMaxLength : ""}
      renderCharacterCount={showMaxLength ? ({ characterCount, maxLength }) => (
        <div className="rizzui-textarea-suffix text-right rtl:text-left">
          {characterCount}/{maxLength}
        </div>
      ) : ""}
      error={inputValue ? "" : inputErrorMsg}
      required={inputIsRequired}
      readOnly={inputIsReadOnly}
      disabled={inputIsDisabled}
      className={inputClass}
      labelClassName={inputLabelClass + " mb-0"}
      textareaClassName={"pl-0 px-2"}
    />
  );
}
