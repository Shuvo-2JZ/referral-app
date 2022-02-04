import React, {Fragment, useEffect} from 'react';
import {removeLoginInfo} from "../../helper/sessionHelper";
import Login from '../../components/login/login';
const LoginPage = () => {
    useEffect(()=>{
        removeLoginInfo();
    },[])
    return (
        <Fragment>
                <Login/>
        </Fragment>
    );
};
export default LoginPage;
