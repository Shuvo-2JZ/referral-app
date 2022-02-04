import React, {Fragment, useRef, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {ErrorFocus, ErrorToast, IsEmpty} from "../../helper/FormHelper";
import FullScreenLoader from "../common/fullScreenLoader";
import '../../assets/css/login.css'
import {BiLogIn, BiUser, FaRegUserCircle, FiLogIn} from "react-icons/all";
import {setLoginStatus} from "../../helper/sessionHelper";
import {withRouter} from "react-router-dom";
const Login = (props) => {

    const [IsLoading,SetIsLoading]= useState("d-none");
    let username = useRef();
    let password = useRef();

    onsubmit=()=>{
        let user= username.value;
        let pass= password.value;

        if(IsEmpty(user)){
            ErrorToast("User name required !");
            ErrorFocus(username);
        }

        else if(IsEmpty(pass)){
            ErrorToast("Password required!")
            ErrorFocus(password);
        }

        else{
                setLoginStatus();
                props.history.push('/')

        }
    }

    return (
        <Fragment>
            <div className="">
                <Container>
                    <Row className="d-flex center-screen-login justify-content-center">
                        <Col className="login-card animated fadeIn" md={6} lg={5} sm={8} xs={11}>
                            <h4 className="login-title"> USER LOGIN </h4>
                            <hr className="content-title-hr"/>

                            <Form>
                                <Form.Group className="mb-2">
                                    <label className="form-label">User name</label>
                                    <Form.Control  ref={(input)=>username=input}  type="text" placeholder="" />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <label className="form-label">Password</label>
                                    <Form.Control ref={(input)=>password=input} type="password" placeholder="" />
                                </Form.Group>
                                <Button className="btn w-100 btn-primary mt-2 px-5"  onClick={onsubmit}  >
                                   <FiLogIn/> Login
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
            <FullScreenLoader isLoading={IsLoading}/>
        </Fragment>
    );
};
export default withRouter(Login);
