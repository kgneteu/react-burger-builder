import {useEffect, useState} from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import {connect} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import {auth, setAuthRedirect} from "../../store/actions/index";
import {Redirect} from "react-router";
import checkValidity from "../../shared/utility";

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

    let [authForm, setAuthForm] = useState(initForm)
    let [formIsValid, setFormIsValid] = useState(false);
    let [isSignup, setIsSignup] = useState(false);

    useEffect(() => {

        let shouldResetRedirect =(!props.location.search)||(!props.building);
        if ((shouldResetRedirect)&&(props.authRedirectPath !=='/')) {
            props.onAuthSetRedirectPath('/');
        }
    }, [props.location.search]);


    if (props.userId) return <Redirect to={props.authRedirectPath}/>


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
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, isSignup)
    };

    const switchAuthModeHandler = (event) => {
        event.preventDefault();
        setIsSignup(!isSignup);
    };

    let error = null;
    if (props.error) {
        error = (<p>{props.error}</p>)
    }
    let form;
    if (props.loading) {
        form = (<Spinner/>)
    } else {
        form = (
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
        )
    }
    return (
        <div className={classes.Auth}>
            {error}
            {form}
            <Button clicked={switchAuthModeHandler} btnType="Danger">SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        userId: state.auth.userId,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp = false) => dispatch(auth(email, password, isSignUp)),
        onAuthSetRedirectPath: (path) => dispatch(setAuthRedirect(path))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
