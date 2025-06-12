import routes_list from "../router/routes-list";
import { GetAccessKey, GetClientDetails, SignOutClient } from "./auth";
import { constants } from "./constants";
import { parseError, redirectURL } from "./utilities";

export async function FetchData_GET(api_name, accessToken, body) {
  const options = {
    method: "GET",
    url: constants?.APIURL + api_name,
    headers: {
      "Content-Type": "application/json",
      Authorization: "BEARER " + accessToken,
      "X-User-Email": body?.email,
    },
  };
  const data = await fetch(constants.APIURL + api_name, options).then((res) =>
    res.json().catch((error) => console.log(error))
  );
  console.log(data);
  return data;
}

export async function FetchData_POST(api_name, api_body, accessKey, details) {
  console.log(api_name, api_body, accessKey, details);
  const options = {
    method: "POST",
    url: constants.APIURL + api_name,
    headers: {
      "Content-Type": "application/json",
      Authorization: "BEARER " + accessKey,
      "X-User-Email": details.email,
    },
    body: typeof api_body === "object" ? JSON.stringify(api_body) : api_body,
  };
  const data = await fetch(constants.APIURL + api_name, options).then((res) =>
    res.json().catch((error) => console.log(error))
  );

  return data;
}

export async function FetchData_PUT(api_name, api_body, accessKey, details) {
  const options = {
    method: "PUT",
    url: constants.APIURL + api_name,
    headers: {
      "Content-Type": "application/json",
      Authorization: "BEARER " + accessKey,
      "X-User-Email": details.email,
    },
    body: typeof api_body === "object" ? JSON.stringify(api_body) : api_body,
  };
  const data = await fetch(constants.APIURL + api_name, options).then((res) =>
    res.json().catch((error) => console.log(error))
  );

  return data;
}
