"use client";
import { useEffect, useState } from "react";

export default function MySelect({
  inputID = "",
  inputLabel = "",
  inputValue,
  inputSetValue, // ✅ this was missing
  selectData = [],
  inputClass = "",
  inputLabelClass = "control-label col-form-label",
  inputFieldClass = "",
  inputIsRequired = true,
  inputIsDisabled = false,
  selectDataType = "Custom",
  selectStateType = "text",
  selectFor = "form",
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (selectData.length <= 0) {
      setData([]);
      return;
    }

    // Use passed-in data directly if in { value, title } format
    if (selectData[0]?.hasOwnProperty("title") && selectData[0]?.hasOwnProperty("value")) {
      setData(selectData);
    } else {
      // Handle special data types
      let mappedData = [];

      switch (selectDataType) {
        case "States":
          mappedData = selectData.map((d) => ({ value: d.stateCode, title: d.stateName }));
          break;
        case "Countries":
          mappedData = selectData.map((d) => ({ value: d.alpha2Code, title: d.country }));
          break;
        case "CountriesWithID":
          mappedData = selectData.map((d) => ({ value: d.id, title: d.country }));
          break;
        case "SelectCustomer":
          mappedData = selectData.map((d) => ({
            value: d.customerID,
            title: `${d.firstName} ${d.lastName} (${d.email})`,
          }));
          break;
        case "ShipFrom":
          mappedData = selectData.map((d) => ({
            value: d.srcAlpha2Code,
            title: d.srcCountry,
          }));
          break;
        case "ShipTo":
          mappedData = selectData.map((d) => ({
            value: d.destAlpha2Code,
            title: d.destCountry,
          }));
          break;
        case "Currencies":
          mappedData = selectData.map((d) => ({ value: d.currencyCode, title: d.currencyName }));
          break;
        case "Carriers":
          mappedData = selectData.map((d) => ({ value: d.carrierName, title: d.carrierName }));
          break;
        default:
          mappedData = selectData;
          break;
      }

      setData(mappedData);
    }
  }, [selectData, selectDataType]);

  return (
    <div className={`rizzui-input-root flex flex-col ${inputClass}`}>
      <label className="block">
        {inputLabel && (
          <span className={`rizzui-input-label block ${inputLabelClass}`}>
            {inputLabel}
          </span>
        )}
        <select
          className={
            `${inputFieldClass} ${selectFor === "form" ? "border2" : "border1"} rizzui-input-container flex items-center peer w-full transition duration-200 px-2 py-2 text-sm h-10 leading-[40px] rounded-md bg-transparent border border-gray-300 hover:border-gray-1000`
          }
          id={inputID}
          required={inputIsRequired}
          value={inputValue}
          onChange={
            selectStateType === "boolean"
              ? () => inputSetValue(!inputValue)
              : (e) => inputSetValue(e.target.value)
          }
          disabled={inputIsDisabled}
        >
          <option value="" disabled>
             Select {inputLabel}
          </option>
          {data.map((d, key) => (
            <option
              key={key}
              value={
                selectDataType === "CommercialInvoice"
                  ? `${d.title} (${d.value})`
                  : d.value
              }
            >
              {selectDataType === "CommercialInvoice"
                ? `${d.title} (${d.value})`
                : d.title || ""}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
