import React from "react";
import { useAppContext } from '../context/AppCtx';
import { formatValue } from '../utilities/format';

type CartItemProps = {
    id: string;
    quantity: number;
};

const CartItem: React.FC<CartItemProps> = ({ id, quantity }) => {
    const { getPizza, increaseCartQuantity, decreaseCartQuantity} =
        useAppContext();
        const item = getPizza(id);

        if (item == null) return null;

        return (
            <article className="detalle_item">
                <div className="detail_figure">
                    <figure>
                        <img src={item.img} alt={item.name} />
                    </figure>
                    <h4>{item.name}</h4>
                </div>
                <div className="details_actions">
                    <div className="detail_item_total">${formatValue((item.price * quantity))}</div>
                    <button className="btn mas" onClick={() => increaseCartQuantity(item.id)}>
                        +
                    </button>
                    {quantity}
                    <button className="btn add" onClick={() => decreaseCartQuantity(item.id)}>
                        -
                    </button>
                </div>
            </article>
        );
};

export default CartItem;