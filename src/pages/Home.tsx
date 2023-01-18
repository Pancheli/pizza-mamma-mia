import React, { useState } from "react";
import CardComponent from '../components/CardComponent';
import { useAppContext } from "../context/AppCtx";

const Home: React.FC = () => {
    const { pizzas } = useAppContext();
    return (
        <>
        <section className="main_container">
            <div className="main_texts">
                <h2 className="main_title">¡Pizzería Mamma Mía!</h2>
                <h4 className="main_subtitle">
                    ¡Tenemos las mejores pizzas que podrás encontrar!
                </h4>
                <hr />
            </div>
        </section>
        <div className="container">
            <div className="grid">
                {pizzas?.map((pizza) => (
                    <CardComponent key={pizza.id} pizza={pizza} />
                ))}
            </div>
        </div>
        </>
    );
};

export default Home;