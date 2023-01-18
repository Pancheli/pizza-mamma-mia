import React from "react";
import { Link } from "react-router-dom";
import CartPng from "../assets/png/cart.png";
import { useAppContext } from "../context/AppCtx";

const Navigation: React.FC = () => {
  const { cartItems, totalCart } = useAppContext();
  const cartQuantity = cartItems.reduce((acc, item) => item.quantity + acc, 0);

  return (
    <nav className="nav">
      <ul className="nav_container">
        <li>
          <Link to="/" className="nav_link">
            🍕 Pizzería Mamma Mía!
          </Link>
        </li>
        <li className="nav_item">
          <Link to="/carrito" className="nav_link">
            <img src={CartPng} alt="imagen carrito" />
            {cartQuantity > 0 ? (
              <span className="nav_item-counter">{cartQuantity}</span>
            ) : undefined}
          </Link>{" "}
          <span>$ {totalCart(cartItems)}</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;