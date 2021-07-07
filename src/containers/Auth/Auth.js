import {useEffect, useState} from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import {connect} from "react-redux";
import {auth} from "../../store/actions/auth";

const Auth = (props) => {
    const initForm = {
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-mail'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true,
            },
            valid: false,
            touched: false,

        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6,
            },
            valid: false,
            touched: false,
        },
    }

    useEffect(() => {

    }, [])

    const inputChangedHandler = (event, inputId) => {
        const changedAuthForm = {...authForm}
        const updatedElement = {...changedAuthForm[inputId]}
        updatedElement.value = event.target.value;
        updatedElement.touched = true;
        updatedElement.valid = checkValidity(updatedElement.value, updatedElement.validation)
        changedAuthForm[inputId] = updatedElement;
        setAuthForm(changedAuthForm);
        let formIsValid = true;
        for (let el in changedAuthForm) {
            if ('valid' in changedAuthForm[el]) {
                formIsValid = changedAuthForm[el].valid && formIsValid;
            }
        }
        setFormIsValid(formIsValid);
    };

    const checkValidity = (value, rules) => {
        let isValid = true;
        if (rules) {
            if (rules.required) {
                isValid = value.trim() !== '' && isValid;
            }
            if (rules.maxLength) {
                isValid = value.trim().length <= rules.maxLength && isValid;
            }

            if (rules.minLength) {
                isValid = value.trim().length >= rules.minLength && isValid;
            }
            if (rules.isEmail) {
                const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                isValid = pattern.test(value) && isValid
            }

            if (rules.isNumeric) {
                const pattern = /^\d+$/;
                isValid = pattern.test(value) && isValid
            }

        }
        return isValid;
    };

    let [authForm, setAuthForm] = useState(initForm)
    let [formIsValid, setFormIsValid] = useState(false);
    let [isSignup, setIsSignup] = useState(false);


    let formElementsArray = [];
    for (let key in authForm) {
        formElementsArray.push({
            id: key,
            elementConfig: authForm[key].elementConfig,
            elementType: authForm[key].elementType,
            value: authForm[key].value,
            validation: authForm[key].validation,
            valid: authForm[key].valid,
            touched: authForm[key].touched,
        });
    }

    const loginHandler = (event) => {
        console.log(isSignup)
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value , isSignup)
    };

    const switchAuthModeHandler = (event) => {
        event.preventDefault();
        setIsSignup(!isSignup);
    };

    let form = (
        <form onSubmit={loginHandler}>
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
            <Button disabled={!formIsValid} btnType="Success">SUBMIT</Button>
        </form>
);
    return (
        <div className={classes.Auth}>
            {form}
            <Button clicked={switchAuthModeHandler} btnType="Danger">SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp = false) => dispatch(auth(email, password, isSignUp))
    }
}

export default connect(null,mapDispatchToProps )(Auth);
