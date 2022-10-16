export function fetchData(params) {
  const baseURL = "http://api.koalascoffee.com";

  var headers = new Headers();
  if (localStorage.getItem("token")) {
    headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    headers.append("Accept", 'application/json');
    headers.append("Content-Type", 'application/json');
  }
  var requestOptions = {
    method: params.method,
    body: params.body,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    headers,
  };
  let url = params.url;
  let stringParams = new URLSearchParams("");
  for (const param in params.params) {
    stringParams.append(param, params.params[param]);
  }
  url = url + (stringParams ? "?" : "") + stringParams;

  return fetch(baseURL + url, requestOptions).then((response) => {
    if (response.ok) {
      if (url.includes('login')) {
        return response.text();
      }
        return response.json();
      } else if (response.status === 401) {
      localStorage.removeItem("token");
      location.reload()
    } else {
      throw new Error(`${response.status} : ${response.statusText}`);
    }
  });
}
