import {useState} from "react";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from './ContactData.module.css';
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios";
import {withRouter} from "react-router";
import Input from "../../../components/UI/Input/Input";
import {connect} from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from './../../../store/actions'
import checkValidity from "../../../shared/utility";

const ContactData = (props) => {
    const initOrderForm = {
        name: {

            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,

        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5,
            },
            valid: false,
            touched: false,
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your E-mail'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}
                ]
            },
            value: 'fastest',
            touched: false,
        },
    }
    let [orderForm, setOrderForm] = useState(initOrderForm)
    let [formIsValid, setFormIsValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();
        //setLoading(true);
        const formData = {};
        for (let formElementId in orderForm) {
            formData[formElementId] = orderForm[formElementId].value;
        }
        const order = {
            ingredients: props.ingredients,
            price: props.price,
            orderData: formData,
            userId: props.userId,
        }

        props.onBurgerOrdered(order, props.token)



        // axios.post('/orders.json', order)
        //     .then(response => {
        //         setLoading(false);
        //         console.log('order saved', props)
        //         props.history.push('/');
        //     })
        //     .catch(error => {
        //         setLoading(false);
        //     });
    }

    let formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            elementConfig: orderForm[key].elementConfig,
            elementType: orderForm[key].elementType,
            value: orderForm[key].value,
            validation: orderForm[key].validation,
            valid: orderForm[key].valid,
            touched: orderForm[key].touched,
        });
    }

    const inputChangedHandler = (event, inputId) => {
        const changedOrderForm = {...orderForm}
        const updatedElement = {...changedOrderForm[inputId]}
        updatedElement.value = event.target.value;
        updatedElement.touched = true;
        updatedElement.valid = checkValidity(updatedElement.value, updatedElement.validation)
        changedOrderForm[inputId] = updatedElement;
        setOrderForm(changedOrderForm);
        let formIsValid = true;
        for (let el in changedOrderForm) {
            if ('valid' in changedOrderForm[el]) {
                formIsValid = changedOrderForm[el].valid && formIsValid;
            }
        }
        setFormIsValid(formIsValid);
    };


    let form = (<div>
        <form action="" onSubmit={orderHandler}>
            {formElementsArray.map(formElement => (
                    <Input key={formElement.id}
                           elementType={formElement.elementType}
                           elementConfig={formElement.elementConfig}
                           value={formElement.value}
                           invalid={!formElement.valid}
                           shouldValidate={formElement.validation}
                           changed={(event) => inputChangedHandler(event, formElement.id)}
                           touched={formElement.touched}
                    />
                )
            )}
            <Button disabled={!formIsValid} btnType="Success">ORDER</Button>
        </form>
    </div>);
    if (props.loading) {
        form = <Spinner/>;
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onBurgerOrdered: (order, token)=>dispatch(actionTypes.purchaseBurger(order, token)),
        onPurchaseBurgerStart: ()=>dispatch(actionTypes.purchaseBurgerStart()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withErrorHandler(ContactData,axios)));
