import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import {NavigationItems} from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({adapter: new Adapter()})
describe('<NavigationItems>', () => {
    // it('should render 2 <NavigationItems> if not authenticated', () => {
    //     const wrapper = shallow(<NavigationItems/>)
    //     expect(wrapper.find(NavigationItem)).toHaveLength(2);
    // })
    // it('should render 3 <NavigationItems> if authenticated', () => {
    //     const wrapper = shallow(<NavigationItems userId={'test'}/>)
    //     expect(wrapper.find(NavigationItem)).toHaveLength(3);
    // })
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<NavigationItems/>)
    })
    it('should render 2 <NavigationItems> if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })
    it('should render 3 <NavigationItems> if authenticated', () => {
        //wrapper = shallow(<NavigationItems userId={'test'}/>)
        wrapper.setProps({userId: 'test'})
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })

    it('should contain logout link if authenticated', () => {
        //wrapper = shallow(<NavigationItems userId={'test'}/>)
        wrapper.setProps({userId: 'test'})
        console.log(wrapper.debug())
        expect(wrapper.contains(<NavigationItem link="/logout">Log Out</NavigationItem>)).toEqual(true);
    })
})
