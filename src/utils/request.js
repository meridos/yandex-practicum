const BASE_URL_API = "https://norma.nomoreparties.space/api";

export default function request(urlApi, options) {
  urlApi = urlApi[0] === "/" ? urlApi.substring(1) : urlApi;

  return fetch(`${BASE_URL_API}/${urlApi}`, options).then(checkResponse);
}

function checkResponse(res) {
  if (res.ok) {
    return res
      .json()
      .then((data) => (data.success ? data : Promise.reject(data)));
  }

  return Promise.reject(`Ошибка ${res.status}`);
}
