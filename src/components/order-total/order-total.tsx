import { FC } from "react";
import { formattedAmount } from "../../utils/formatted-amount";

interface IOrderTotalProps {
  title: string;
  total: number;
}

export const OrderTotal: FC<IOrderTotalProps> = (props) => {
  return (
    <div>
      <p className="text text_type_main-medium">{props.title}</p>
      <p className="text text_type_digits-large">
        {formattedAmount(props.total)}
      </p>
    </div>
  );
};
