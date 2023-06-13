export enum TOrderStatus {
  Pending = "pending",
  Created = "created",
  Done = "done",
  Cancelled = "cancelled",
}

export interface IOrder {
  readonly ingredients: string[];
  readonly _id: string;
  readonly status: TOrderStatus;
  readonly number: number;
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export type IGetOrdersResponse =
  | IGetOrdersResponseSuccess
  | IGetOrdersResponseError;

export interface IGetOrdersResponseSuccess {
  readonly success: true;
  readonly orders: ReadonlyArray<IOrder>;
  readonly total: number;
  readonly totalToday: number;
}
export interface IGetOrdersResponseError {
  readonly success: false;
  readonly message: string;
}
