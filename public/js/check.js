function getcookie(cookienames) {
  let temp = [null, null, null];
  var cookiestring = document.cookie;
  var cookiearray = cookiestring.split(";");
  for (var i = 0; i < cookienames.length; i++) {
    for (var x = 0; x < cookiearray.length; x++) {
      if (cookiearray[x].trim().match("^" + cookienames[i] + "=")) {
        temp[i] = cookiearray[x].replace(`${cookienames[i]}=`, "").trim();
      }
    }
  }
  return temp;
}

let paths = ["/", "/about", "/contact", "/cookie-policy", "/privacy-policy", "/terms-and-conditions", "/register"]
if (window.location.pathname !== "/login" && paths.includes(window.location.pathname) != true) {
  const CookiesNames = ["CstClientDetails", "CstExpiry", "CstAccessKey"];
  let results = getcookie(CookiesNames);

  for (z = 0; z < results.length; z++) {
    if (results[z] == null) {
      window.location.pathname = "/login";
      break;
    }
  }
}
