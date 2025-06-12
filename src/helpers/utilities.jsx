import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { constants } from "./constants";
import dayjs from "dayjs";
import * as XLSX from "xlsx";
import { GetClientDetails } from "./auth";
import routes_list from "../router/routes-list";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function encryptData(text) {
  const data = CryptoJS.AES.encrypt(
    JSON.stringify(text),
    constants.SK
  ).toString();

  return data;
}

export function decryptData(text) {
  const bytes = CryptoJS.AES.decrypt(text, constants.SK);
  const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return data;
}

export function addSpacesToCamelCase(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export function isValidHexColor(colorCode) {
  const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexColorRegex.test(colorCode);
}

export function formatNumber(value) {
  // Check if the value is less than 0
  if (value < 0) {
    // Handle negative values separately and format the absolute value
    const absoluteValue = Math.abs(value);
    return `-${formatNumber(absoluteValue)}`;
  } else if (value >= 1e9) {
    // Format the value in billions
    const formattedValue = value / 1e9;
    return `${formattedValue.toFixed(1)}B`;
  } else if (value >= 1e6) {
    // Check if the value is between 1 million and 1 billion
    // Format the value in millions
    const formattedValue = value / 1e6;
    return `${formattedValue.toFixed(1)}M`;
  } else if (value >= 1000) {
    // Check if the value is between 1 thousand and 1 million
    // Format the value in thousands
    const formattedValue = value / 1000;
    return `${formattedValue.toFixed(1)}K`;
  } else {
    // If the value is less than 1 thousand, return the original value as a string
    return value.toString();
  }
}

export function getRandomArrayElement(array) {
  if (array.length === 0) {
    return undefined;
  }

  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export function rangeMap(n, fn) {
  const arr = [];
  while (n > arr.length) {
    arr.push(fn(arr.length));
  }
  return arr;
}

export function generateRandomColorRGB() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);

  return "rgb(" + r + ", " + g + ", " + b + ")";
}

export function filterData(array, filterKeys) {
  return array.filter((obj) => {
    return Object.values(obj).some((key) => filterKeys.includes(key));
  });
}

export function formatDate(date, format = "DD MMM, YYYY") {
  if (!date) return "";
  return dayjs(date).format(format);
}

export function toTitleCase(str) {
  str = String(str).toLowerCase();
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str;
}

export function getTodayDateYYYYMMDD() {
  const dt = new Date();
  const dtStr = `${String(dt.getFullYear())}-${String(
    dt.getMonth() + 1
  ).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
  return dtStr;
}

export function parseError(error) {
  console.log(error);
  if (
    (error.toLowerCase().includes("api failed") ||
      error.toLowerCase().includes("bad request")) &&
    error.toLowerCase().includes("message")
  ) {
    const regex = /"message":"([^"]*)"/;
    const match = error.match(regex);
    if (match) {
      const message = match[1];
      console.log(message);
      return message;
    } else {
      return error;
    }
  } else {
    return error;
  }
}

export function removeSpecialCharacters(str) {
  return str.replace(/[^a-zA-Z0-9]/g, "");
}

export function downloadExcel(
  data,
  filterOutColumnsList,
  fileName,
  setLoading
) {
  setLoading(true);
  let lowerCaseList = filterOutColumnsList.map((column) =>
    column.toLowerCase()
  );
  let columns = data.length > 0 ? Object.keys(data[0]) : [];
  columns = columns.filter(
    (a) => lowerCaseList.includes(a.toLowerCase()) == false
  );
  let i = columns.unshift("S.No.");

  const xlsdata = [columns];
  var index = 0;
  var innerIndex = 0;
  data.forEach((t) => {
    let row = [];
    innerIndex = 0;

    columns.forEach((col) => {
      if (innerIndex == 0) {
        row.push(index + 1);
        innerIndex += 1;
      } else {
        row.push(t[col]);
        innerIndex += 1;
      }
    });

    xlsdata.push(row);
    index += 1;
  });

  exportDataAsExcel(xlsdata, fileName, new Date());
  setLoading(false);
}

export function exportDataAsExcel(xlsdata, fileTitle, email) {
  // Create a new workbook
  const wb = XLSX.utils.book_new();
  // Convert data to a worksheet
  const ws = XLSX.utils.aoa_to_sheet(xlsdata);
  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, `${fileTitle}_${email}.xlsx`);
}

export function getCustomerName(customersList, selectedCustomer) {
  try {
    if (selectedCustomer == "ALL") {
      return "ALL";
    } else {
      let customer = customersList.filter(
        (a) => a.customerID == selectedCustomer
      )[0];
      let customerName = customer.firstName + " " + customer.lastName;
      return customerName;
    }
  } catch (ex) {
    const details = GetClientDetails();
    return details.email;
  }
}

export function reloadURL(pathname) {
  if (window.location.pathname === pathname) {
    window.location.reload();
  }
}

export function redirectURL(pathname) {
  window.location.pathname = pathname;
}

export function addSpaceBeforeCapitalLetters(str) {
  return str
    .replace(/([A-Z])(?=[A-Z][^A-Z])/g, "$1 ")
    .replace(/([a-z])(?=[A-Z])/g, "$1 ");
}

export function getDataKeys(data, keysDontAdd) {
  if (data.length > 0) {
    let keys = Object.keys(data[0]);
    keys = keys
      .filter((a) => keysDontAdd.includes(a.toLowerCase()) == false)
      .map(addSpaceBeforeCapitalLetters);
    return keys;
  } else {
    return [];
  }
}

export function getURLByShipmentCode(
  transactionType,
  code,
  invoiceNo,
  customerID
) {
  const _code = String(code).toUpperCase();
  const _transactionType = String(transactionType).toUpperCase();
  if (_transactionType.includes("TOPUP")) {
    return routes_list.topup + "?code=" + code;
  } else if (_code.includes("AWSHPT")) {
    return routes_list.view_airway_shipment + "?code=" + code;
  } else if (_code.includes("SHPT")) {
    return routes_list.view_shipment_details + "?code=" + code;
  } else {
    let shipmentRatedBy = code ? code : "ALL";
    return (
      routes_list.view_customer_invoice +
      "?customerID=" +
      customerID +
      "&customerInvoiceNumber=" +
      invoiceNo +
      "&shipmentRatedBy=" +
      shipmentRatedBy
    );
  }
}

export function getISOFormatDatetime() {
  // let currentDateTime = new Date().toISOString();
  // return currentDateTime;
  const now = new Date();
  const formattedDate =
    now.getFullYear() +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0");
  const formattedTime =
    String(now.getHours()).padStart(2, "0") +
    ":" +
    String(now.getMinutes()).padStart(2, "0") +
    ":" +
    String(now.getSeconds()).padStart(2, "0");
  return `${formattedDate}T${formattedTime}Z`;
}

export function checkNumberFieldValue(value, min, max) {
  let newValue = value;
  if (Number(newValue) >= Number(min) && Number(newValue) <= Number(max)) {
    return newValue;
  } else {
    return "";
  }
}

export function restrictKeysForNumberField(e) {
  var key = String(e.key).toLowerCase();
  if (key === "-" || key === "+" || key === "e") {
    e.preventDefault();
  }
}



export function getStatusColor(status) {
  if (status.toLowerCase() === "pending") {
    return "bg-yellow-500 text-white";
  }
  if (status.toLowerCase() === "processing") {
    return "bg-blue-500 text-white";
  }
  if (status.toLowerCase() === "completed") {
    return "bg-green-500 text-white";
  }
  if (status.toLowerCase() === "cancelled") {
    return "bg-red-500 text-white";
  } else {
    return "bg-gray-500 text-black";
  }
}


