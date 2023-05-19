const BASE_URL_API = "https://norma.nomoreparties.space/api";

export default function request(urlApi, options = {}) {
  urlApi = urlApi[0] === "/" ? urlApi.substring(1) : urlApi;

  return fetch(`${BASE_URL_API}/${urlApi}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  }).then(checkResponse);
}

function checkResponse(res) {
  try {
    return res
      .json()
      .then((data) => (data.success ? data : Promise.reject(data)));
  } catch (e) {
    return Promise.reject();
  }
}
