import { constants } from "./constants";
import { FetchData_GET } from "./dal";

export async function GetCustomersList() {
  const result = await FetchData_GET(constants.AllCustomersAPI);
  return result;
}

export async function GetAdminDashboardDetails() {
  const result = await FetchData_GET(constants.AdminDashboardAPI);
  return result; 
}

export async function GetAirwayList() {
  const result = await FetchData_GET(constants.AirwayShipmentAPIs.AirwayListAPI);
  return result; 
}

// export async function GetAirwayShipment(mawb) {
//   const result = await FetchData_GET(constants.AirwayShipmentAPIs.GetShipmentsofAirwayAPI + "?mawb=" + mawb);
//   return result; 
// }

export async function GetAirwayShipmentsList(status) {
  const result = await FetchData_GET(constants.AirwayShipmentAPIs.AirwayShipmentsListAPI + "?status=" + status);
  return result; 
}

export async function GetCurrenciesList() {
  const result = await FetchData_GET(constants.AllCurrenciesAPI);
  return result; 
}

export async function GetConversionRateFromLiveAPI(fromCurrency) {
  const url = "https://open.er-api.com/v6/latest/" + fromCurrency;
  const options = {
    method: "GET",
    url: url,
  };
  const data = await fetch(url, options).then((res) =>
    res.json().catch((error) => console.log(error))
  );
  return data;
}
