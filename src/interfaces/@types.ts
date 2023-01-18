export interface IPizza {
    desc: string,
    id: string,
    img: string,
    ingredients: string[],
    name: string,
    price: number
}

export interface ICart {
    id: string,
    quantity: number
}

export interface IApp {
    pizzas: IPizza[],
    getPizza: (id: string) => IPizza | void,
    increaseCartQuantity: (id: string) => void,
    decreaseCartQuantity: (id: string) => void,
    cartItems: ICart[],
    totalCart: (items: ICart[]) => string
}