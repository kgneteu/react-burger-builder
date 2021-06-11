import React from 'react';
import classes from "./Burger.module.css"
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import PropTypes from "prop-types";

function Burger(props) {
    let ingredients = Object.entries(props.ingredients).map(ingredient => {
        return [...Array(ingredient[1])].map((_, i) => (
            <BurgerIngredient key={ingredient[0] + i} type={ingredient[0]}/>));
    }).reduce((previousValue, currentValue) => {
        return previousValue.concat(currentValue);
    },[]);
    if (ingredients.length ===0){
        ingredients = <h3>Please start adding ingredients</h3>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type={'bread-top'}/>
            {ingredients}
            <BurgerIngredient type={'bread-bottom'}/>
        </div>
    );
}

Burger.propTypes = {
    ingredients: PropTypes.object,
}
export default Burger;
