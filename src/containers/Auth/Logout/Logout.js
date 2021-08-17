import {connect} from "react-redux";
import {logOut} from "../../../store/actions";
import {Redirect} from "react-router";

const Logout = (props) => {
    props.onLogout();
    return  <Redirect to="/" />

};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logOut())
    }
}
export default connect(null, mapDispatchToProps)(Logout);
