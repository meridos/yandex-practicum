import request from "../utils/request";

export default function getIngredients() {
  return request("/ingredients")
    .then((res) => res.data ?? Promise.reject())
    .catch(() => Promise.reject("Ошибка при загрузке ингредиентов"));
}
