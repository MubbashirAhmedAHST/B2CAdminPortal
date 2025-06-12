import moment from "moment";
import { constants } from "./constants";
import { SessionVars } from "./enums";
import Cookies from "universal-cookie";
import { saveUser } from "@/store/reducers/AuthSlicers";

const cookieOptions = {
  path: "/",
  expires: moment(Date.now()).add(constants.ATED, "h").toDate(),
};
const cookie = new Cookies();

export async function AuthClient(email) {
  console.log(email);
  const api_name = constants.AuthAPI;
  console.log(api_name);
  const options = {
    method: "GET",
    url: constants.APIURL + api_name,
    headers: {
      "Content-Type": "application/json",
      "X-User-Email": email,
    },
  };
  const data = await fetch(constants.APIURL + api_name, options).then((res) =>
    res.json().catch((error) => console.log(error))
  );

  if (data == undefined) {
    return false;
  } else {
    return data;
  }
}

export async function GetClientIPAddress() {
  let data = {};
  if (constants.ENVMODE == "dev") {
    data = {
      city: "",
      country: "",
      ip: "",
      loc: "",
      org: "",
      postal: "",
      region: "",
      timezone: "",
    };
    return data;
  }
  try {
    data = await fetch("https://ipinfo.io/json?token=" + constants.IFTK).then(
      (res) => res.json().catch((error) => console.log(error))
    );
  } catch (ex) {
    data = {
      city: "",
      country: "",
      ip: "",
      loc: "",
      org: "",
      postal: "",
      region: "",
      timezone: "",
    };
  }
  return data;
}

export async function LoginClient(
  dispatch,
  api_name,
  api_body,
  accessKey,
  email
) {
  try {
    const response = await fetch(constants.APIURL + api_name, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `BEARER ${accessKey}`,
        "X-User-Email": email,
      },
      body: api_body,
    });

    // Check for HTTP errors
    if (!response.ok) {
      console.log("Login failed with status:", response.status);
      return false;
    }

    // Parse response JSON safely
    const data = await response.json();

    // Check for required fields in the response
    if (!data || !data.adminID || !data.email) {
      console.log("Invalid user data:", data);
      return false;
    }

    // Save user in Redux
    dispatch(saveUser(data));
    return true;

  } catch (error) {
    console.log("Login error:", error);
    return false;
  }
}

export async function ForgotPasswordClient(api_name,email) {
  const options = {
    method: "GET",
    url: constants.APIURL + api_name,
    headers: {
      "Content-Type": "application/json",
      "X-User-Email":email,
    },
  };
  const data = await fetch(constants.APIURL + api_name, options).then((res) =>
    res.json().catch((error) => console.log(error))
  );

  return data;
}

export function ValidateClientKeyAndExpiry() {
  const accessKey = GetAccessKey();
  const expiry = GetExpiry();
  const details = GetClientDetails();
  const currDt = new Date();
  const expiryDt = new Date(expiry);
  if (!accessKey || !expiry || !details || currDt >= expiryDt) {
    for (const [key, value] of Object.entries(SessionVars)) {
      cookie.remove(value);
    }
    return false;
  }
  return true;
}

export function SignOutClient() {
  for (const [key, value] of Object.entries(SessionVars)) {
    cookie.remove(value);
  }
  return true;
}

export function GetClientDetails() {
  const details = cookie.get(SessionVars.ClientDetails);
  return details; //JSON.parse(details);
}

export function GetAccessKey() {
  const accessKey = cookie.get(SessionVars.AccessKey);
  console.log(accessKey);
  return accessKey;
}

export function GetExpiry() {
  const expiry = cookie.get(SessionVars.Expiry);
  return expiry;
}
