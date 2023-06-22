import { requestWithAuth } from "../utils/request";

export interface ICreateOrderBody {
  orderListIds: string[];
}

export interface ICreateOrderResponse {
  number: number;
}

export default function createOrder({
  orderListIds,
}: ICreateOrderBody): Promise<ICreateOrderResponse> {
  return requestWithAuth<{
    name: string;
    order: ICreateOrderResponse;
  }>("/orders", {
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
