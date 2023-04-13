import request from "../utils/request";

export default function createOrder(orderListIds) {
  return request("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: orderListIds,
    }),
  })
    .catch(() => Promise.reject("Ошибка при создании заказа"))
    .then(
      (res) => res.order ?? Promise.reject("Не получен номер заказа с сервера")
    );
}
