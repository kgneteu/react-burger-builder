import Order from "../../components/Order/Order";
import {useEffect, useState} from "react";
import axios from "../../axios";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

const Orders = (props) => {
    let [orders, setOrders] = useState([]);
    let [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios.get('/orders.json').then(response => {
                console.log(response.data)
                let fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({...response.data[key], id: key})
                }
                setOrders(fetchedOrders);
                setLoading(false)
            }
        ).catch(_ => {
            setLoading(false)
        })
    }, [])
    let orderList;
    if (loading) {
        orderList = (<Spinner/>)
    } else {
        orderList = orders.map(order => {
            return (<Order key={order.id} ingredients={order.ingredients} price={order.price}/>)
        })
    }
    return (
        <div>
            {orderList}
        </div>
    );
};

export default withErrorHandler(Orders, axios);

