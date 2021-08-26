import {connect} from "react-redux";
import {logOut} from "../../../store/actions";
import {Redirect} from "react-router";
import {useEffect} from "react";

const Logout = ({onLogout}) => {
    useEffect(()=>{
        onLogout();
    },[onLogout])

    return  <Redirect to="/" />

};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logOut())
    }
}
export default connect(null, mapDispatchToProps)(Logout);
