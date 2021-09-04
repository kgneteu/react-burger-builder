import {configure, shallow} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import React from "react";
import {BurgerBuilder} from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Spinner from "../../components/UI/Spinner/Spinner";

configure({adapter: new Adapter()})

describe("<BurgerBuilder/>", () => {
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<BurgerBuilder onInitIngredients={()=>{}}/>)
    })

    it('Should render <BuildControls/> when receiving ingredients', ()=>{
        wrapper.setProps({ingredients:{salad: 0}})
        console.log(wrapper.debug())
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
    it('Should render <Spinner> when no ingredients and no error', ()=>{
        //wrapper.setProps({ingredients:{salad: 0}})
        console.log(wrapper.debug())
        expect(wrapper.find(Spinner)).toHaveLength(1);
    })
})
