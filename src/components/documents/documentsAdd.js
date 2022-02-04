import React, {Component, Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import back from "../../assets/images/back.svg";
import {ErrorFocus, ErrorToast, HideSubmitLoading, IsEmpty, ShowSubmitLoading, SuccessToast} from "../../helper/FormHelper";
import {DocCreateServices} from "../../APIServices/DocCreateServices";
import {withRouter} from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



class DocumentsAdd extends Component {


    constructor(props) {
        super(props);
        this.state = {
            text:""
        };
    }

    onSubmit=()=>{
        let DocDes=this.state.text;
        if(IsEmpty(DocDes)){
            ErrorToast("Document Description Required !")
        }
        else {
            ShowSubmitLoading(this.submitElement,this.LoadingElement)
            DocCreateServices(DocDes).then((res)=>{
               HideSubmitLoading(this.submitElement,this.LoadingElement)
               if(res=="1"){
                   SuccessToast("New Doc Item Created");
                   this.props.history.push("/DocumentsList")
               }
               else {
                   ErrorToast("Request Fail ! Try Again")
               }
           })

        }

    }


    handleChange=(value)=> {
        this.setState({ text: value })
    }





    render() {

        return (
            <Fragment>
                <Container fluid={true} className="content-body m-0">
                    <Row className=" p-0 m-0 ">
                        <Col className="m-0 p-0" md={12} lg={12} sm={12} xs={12}>
                            <Container className="content-card  " fluid={true}>



                                <Row>
                                    <Col md={12} sm={12} xs={12} lg={12}>
                                        <Link to="/DocumentsList" className="content-title "> <img className="back-btn " src={back}/> <span className="mx-2">Create New Doc List</span> </Link>
                                    </Col>
                                </Row>


                                <hr className="content-title-hr"/>

                                <Row className="animated slideInUp">
                                    <Col md={12} sm={12} xs={12} lg={12}>
                                        <ReactQuill style={{height:"200px"}} value={this.state.text} onChange={this.handleChange} />
                                    </Col>
                                </Row>


                                <br/><br/>


                                <Row className="mt-3 animated slideInUp">
                                    <Col md={4} sm={4} xs={4} lg={4}>
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

export default withRouter(DocumentsAdd);