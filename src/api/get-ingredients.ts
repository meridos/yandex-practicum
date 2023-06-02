import { IIngredient } from "../models/ingredient";
import { request } from "../utils/request";

export interface IGetIngredientsBody {
  email: string;
  password: string;
}

export default function getIngredients(): Promise<IIngredient[]> {
  return request<{
    data: IIngredient[];
  }>("/ingredients")
    .then((res) => res.data ?? Promise.reject())
    .catch(() => Promise.reject("Ошибка при загрузке ингредиентов"));
}
