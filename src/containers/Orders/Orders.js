import Order from "../../components/Order/Order";
import {useEffect} from "react";
import axios from "../../axios";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import {connect} from "react-redux";
import {fetchOrders} from "../../store/actions";

const Orders = (props) => {
    // let [orders, setOrders] = useState([]);
    // let [loading, setLoading] = useState(false);

    useEffect(() => {
        //setLoading(true);
        props.fetchOrders(props.token);
    }, [])

    let orderList;
    if (props.loading) {
        orderList = (<Spinner/>)
    } else {
        if (props.orders.length>0){
        orderList = props.orders.map(order => {
            return (<Order key={order.id} ingredients={order.ingredients} price={order.price}/>)
        })} else {
            orderList =<p> No orders yet</p>
        }

    }
    return (
        <div>
            {orderList}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token)=>dispatch(fetchOrders(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));

