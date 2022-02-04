import React, {Component, Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import back from "../../assets/images/back.svg";
import {
    ErrorFocus,
    ErrorToast,
    HideSubmitLoading,
    IsEmpty,
    ShowSubmitLoading,
    SuccessToast
} from "../../helper/FormHelper";
import {withRouter} from "react-router-dom";
import {FaqCreateServices} from "../../APIServices/FaqCreateServices";


class FaqAdd extends Component {

    onSubmit=()=>{
        let FaqName=this.FaqName;
        let FaqAns=this.FaqAns;

        if(IsEmpty(FaqName.value)){
            ErrorToast("FAQ Question Required !")
            ErrorFocus(FaqName)
        }
        else if(IsEmpty(FaqAns.value)){
            ErrorToast("FAQ Ans Required !")
            ErrorFocus(FaqAns)
        }
        else {
            ShowSubmitLoading(this.submitElement,this.LoadingElement)
            FaqCreateServices(FaqName.value,FaqAns.value).then((res)=>{
                HideSubmitLoading(this.submitElement,this.LoadingElement)
                if(res=="1"){
                    SuccessToast("New FAQ Item Created");
                    this.props.history.push("/FaqList")
                }
                else {
                    ErrorToast("Request Fail ! Try Again")
                }
            })
        }

    }




    render() {
        return (
            <Fragment>
                <Container fluid={true} className="content-body m-0">
                    <Row className=" p-0 m-0 ">
                        <Col className="m-0 p-0" md={12} lg={12} sm={12} xs={12}>
                            <Container className="content-card " fluid={true}>
                                <Row>
                                    <Col md={12} sm={12} xs={12} lg={12}>
                                        <Link to="/FaqList" className="content-title "> <img className="back-btn " src={back}/> <span className="mx-2"> Create New FAQ</span> </Link>
                                    </Col>
                                </Row>
                                <hr className="content-title-hr"/>


                                <Row className="animated slideInUp">
                                    <Col md={6} sm={12} xs={12} lg={6}>
                                        <label className="form-label">Faq Question</label>
                                        <input   ref={(input)=>{this.FaqName=input}} type="text" className="form-control"/>
                                    </Col>
                                </Row>

                                <Row className="animated slideInUp">
                                    <Col md={6} sm={12} xs={12} lg={6}>
                                        <label className="form-label">Faq Ans</label>
                                        <textarea ref={(input)=>{this.FaqAns=input}} type="text" className="form-control"/>
                                    </Col>
                                </Row>

                                <hr className="content-title-hr"/>

                                <Row className="animated slideInUp">
                                    <Col md={6} sm={12} xs={12} lg={6}>
                                        <button  ref={(button)=>{this.submitElement=button}} onClick={this.onSubmit} className="btn btn-primary">Create</button>
                                        <button  ref={(button)=>{this.LoadingElement=button}}  className="btn d-none btn-primary"><span className="spinner-border spinner-border-sm mx-2" role="status"/> Creating...</button>
                                    </Col>
                                </Row>

                            </Container>
                        </Col>
                    </Row>
                </Container>

            </Fragment>
        );
    }
}

export default withRouter(FaqAdd);