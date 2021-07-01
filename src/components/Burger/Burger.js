import React from 'react';
import classes from "./Burger.module.css"
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import PropTypes from "prop-types";

function Burger(props) {

    let ingredients = Object.entries(props.ingredients).map(ingredient => {
       let ia = [...new Array(+ingredient[1])];
        //let ia = [...new Array(3)];
        //console.log('PI', ia.length)
        let res = ia.map((_, i) => (
            <BurgerIngredient key={ingredient[0] + i} type={ingredient[0]}/>));

        return res;
    }).reduce((previousValue, currentValue) => {
        return previousValue.concat(currentValue);
    }, []);
    if (ingredients.length === 0) {
        ingredients = <h3>Please start adding ingredients</h3>
    }
    //console.log(ingredients)
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
