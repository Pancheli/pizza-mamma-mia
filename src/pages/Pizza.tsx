import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { useAppContext } from "../context/AppCtx";
import { IPizza } from "../interfaces/@types";
import { formatValue } from '../utilities/format';

type PizzaParams = {
    id?: string;
};

const Pizza: React.FC = () => {
    const { id } = useParams<PizzaParams>();
    const { getPizza, increaseCartQuantity } = useAppContext();
    const pizza = getPizza(id as string) as IPizza;

    return (
        <div className="detail_product">
            <figure className="detail_product-figure">
                <img 
                    src={pizza.img}
                    alt={pizza.name}
                     />
            </figure>
            <div className="detail_body">
                <h3 className="detail_body-title">{pizza.name}</h3>
                <div className="detail_body-text">
                    <p>{pizza.desc}</p>
                    <p>Ingredientes:</p>
                    <ul>
                        {pizza?.ingredients.map((ingredient, index) => (
                            <li key={index.toString()}>🍕 {ingredient}</li>
                        ))}
                    </ul>
                </div>
                <div className="detail_body-footer">
                    <p>${formatValue(pizza.price)}</p>
                    <button
                        onClick={() => increaseCartQuantity(pizza.id)}>
                            Añadir 🛒
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pizza;