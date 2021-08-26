import React from 'react';
import Modal from "../../components/UI/Modal/Modal";
import useHttpErrorHandler from './../../hooks/http-error-handler'

const withErrorHandler = (WrappedComponent, axios) => props => {
    // let [error, setError] = useState(null)
    //
    // const modalClosedHandler = () => {
    //     setError(null)
    // };
    //
    // // componentWillMount() { - before render == function code
    //
    // const reqInterceptor = axios.interceptors.request.use(req => {
    //     setError(null);
    //     return req
    // });
    //
    // const resInterceptor = axios.interceptors.response.use(res => res, errorMsg => {
    //     setError(errorMsg);
    // })
    //
    // useEffect(() => {
    //     return () => {
    //         axios.interceptors.request.eject(reqInterceptor);
    //         axios.interceptors.response.eject(resInterceptor);
    //     };
    // }, [reqInterceptor, resInterceptor]);

    const [error, modalClosedHandler] = useHttpErrorHandler(axios)


    return (
        <>
            <Modal
                show={error !== null}
                modalClosed={modalClosedHandler}>
                {error && error.message}
            </Modal>
            <WrappedComponent {...props}/>
        </>
    )
}

export default withErrorHandler;
