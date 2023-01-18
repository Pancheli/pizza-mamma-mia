import React from "react";
import CartItem from "../components/CartItemComponent";
import { useAppContext } from "../context/AppCtx";

const Carrito: React.FC = () => {
    const { cartItems, totalCart } = useAppContext();

    return (
        <section className="detail">
            <h4 className="detail_text">Detalle del pedido:</h4>
            <div className="detail_container">
                {cartItems.map((item) => (
                    <CartItem key={item.id} {...item} />
                ))}
                <p className="detail_total">Total: {totalCart(cartItems)}</p>
                {Number(totalCart(cartItems)) > 0 ?  <button onClick={() => {
                    if (
                        confirm(
                            `¿Estás seguro de llevar la compra por $${totalCart(cartItems
                                )} ?`
                        )
                    )
                    return alert("Pagado");
                }}>
                    Ir a Pagar
                </button>
                : undefined}

            </div>
        </section>
    );
};

export default Carrito;