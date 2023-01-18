import React, { createContext, useContext, useEffect, useState,} from "react";
import { IApp, IPizza, ICart } from "../interfaces/@types";
import { formatValue } from "../utilities/format";

const AppContext = createContext<IApp>({} as IApp);

//hooks
export function useAppContext() {
  return useContext(AppContext) as IApp;
}

type AppCtxProviderProps = {
  children?: JSX.Element | JSX.Element[];
};

const AppProvider: React.FC<AppCtxProviderProps> = ({ children }) => {
  const [pizzas, setPizzas] = useState<IPizza[]>([]);
  const [cartItems, setCartItems] = useState<ICart[]>([]);

  /**
   *
   * @param {string} id > identificador único pra buscar en el catálogo
   * @returns {IPizza} > returns un pizza del catálogo
   */
  const getPizza = (id: string): IPizza => {
    const pizza = pizzas.find((p) => p.id === id);
    return pizza as IPizza;
  };
  /**
   * 
   * @param {string} id > identificador único para buscar en el carrito 
   */
  const increaseCartQuantity = (id: string) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  /**
   *
   * @param id > identificador único para buscar en el carrito
   */
  const decreaseCartQuantity = (id: string) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const totalCart = (items: ICart[]) => {
    const total = items.reduce((total, CartItem) => {
      const item = getPizza(CartItem.id);
      return total + (item?.price || 0) * CartItem.quantity;
    }, 0);
    return formatValue(total);
  };

  useEffect(() => {
    fetch("./pizzas.json")
      .then((res) => res.json())
      .then((data) => setPizzas(data))
      .catch((e) => console.error(e.mesagge));
  }, []);

  return (
    <AppContext.Provider
      value={{
        pizzas,
        getPizza,
        totalCart,
        increaseCartQuantity,
        decreaseCartQuantity,
        cartItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
