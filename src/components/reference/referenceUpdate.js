import React, {Component, Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import back from "../../assets/images/back.svg";
import {getReferenceDetails} from "../../helper/sessionHelper";
import {ErrorFocus, ErrorToast, HideSubmitLoading, IsEmail, IsEmpty, IsMobile, ShowSubmitLoading, SuccessToast} from "../../helper/FormHelper";
import {ReferralUpdateServices} from "../../APIServices/ReferralUpdateServices";
import {withRouter} from "react-router-dom";
class ReferenceUpdate extends Component {

    constructor() {
        super();
        this.state={
            referralID:"",
            referralCIF:"",
            activityJournalID:"",
            need:"",
            amount:"",
            name:"",
            mobile:"",
            email:"",
            occupation:"",
            city:"",
            remarks:"",
            status:"",
            assignRFCIF:"",
        }
    }


    componentDidMount() {
        let Details=getReferenceDetails();
        this.setState({
            activityJournalID:Details['activityJournalID'],
            referralID:Details['referralID'],
            referralCIF:Details['referralCIF'],
            need:Details['need'],
            amount:Details['amount'],
            name:Details['name'],
            mobile:Details['mobile'],
            email:Details['email'],
            occupation:Details['occupation'],
            city:Details['city'],
            remarks:Details['remarks'],
            status:Details['status'],
            assignRFCIF:Details['assignRFCIF'],
        })
    }


    onSubmit=()=>{
            let referralID=this.referralID;
            let referralCIF=this.referralCIF;
            let need=this.need;
            let amount=this.amount;
            let name=this.name;
            let mobile=this.mobile;
            let email=this.email;
            let occupation=this.occupation;
            let city=this.city;
            let remarks=this.remarks;
            let status=this.status;
            let assignRFCIF= this.assignRFCIF;

            let referralIDValue=referralID.value;
            let referralCIFValue=referralCIF.value;
            let needValue=need.value;
            let amountValue=amount.value;
            let nameValue=name.value;
            let mobileValue=mobile.value;
            let emailValue=email.value;
            let occupationValue=occupation.value;
            let cityValue=city.value;
            let remarksValue=remarks.value;
            let statusValue=status.value;
            let assignRFCIFValue= assignRFCIF.value;

            let activityJournalID=this.state.activityJournalID;


            if(IsEmpty(referralIDValue)){
                ErrorToast("Referral ID Required !");
                ErrorFocus(referralID);
            }
            else if(IsEmpty(referralCIFValue)){
                ErrorToast("Referral Reg/CIF Required !");
                ErrorFocus(referralCIF);
            }
            else if(IsEmpty(needValue)){
                ErrorToast("Customer Need Required !");
                ErrorFocus(need);
            }
            else if(IsEmpty(amountValue)){
                ErrorToast("Loan Amount Required !");
                ErrorFocus(amount);
            }
            else if(IsEmpty(nameValue)){
                ErrorToast("Customer Name Required !");
                ErrorFocus(name);
            }
            else if(!IsMobile(mobileValue)){
                ErrorToast("Customer Valid Mobile Number Required !");
                ErrorFocus(mobile);
            }
            else if(emailValue.length!==0 && IsEmail(emailValue)){
                ErrorToast("Customer Valid Email Required !");
                ErrorFocus(email);
            }
            else if(IsEmpty(occupationValue)){
                ErrorToast("Customer Occupation Required !");
                ErrorFocus(occupation);
            }
            else if(IsEmpty(cityValue)){
                ErrorToast("Customer City Required !");
                ErrorFocus(city);
            }
            else if(IsEmpty(statusValue)){
                ErrorToast("Status Required!");
                ErrorFocus(status);
            }
            else if(IsEmpty(assignRFCIFValue)){
                ErrorToast("Assigned RM CIF Required!");
                ErrorFocus(assignRFCIF);
            }
            else {
                ShowSubmitLoading(this.submitElement,this.LoadingElement)
                ReferralUpdateServices(activityJournalID,referralIDValue,referralCIFValue,needValue,amountValue,nameValue,mobileValue,emailValue,occupationValue,cityValue,remarksValue,statusValue,assignRFCIFValue).then((res)=>{
                    HideSubmitLoading(this.submitElement,this.LoadingElement)
                    if(res=="1"){
                        SuccessToast("Reference Updated ");
                        this.props.history.push("/ReferenceList")
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
                                    <Col className="p-1 " md={12} sm={12} xs={12} lg={12}>
                                        <Link to="/ReferenceList" className="content-title "> <img className="back-btn " src={back}/> <span className="mx-2">Update Referral Info</span> </Link>
                                    </Col>
                                    <hr className="content-title-hr"/>
                                </Row>

                                <Row>
                                    <Col className="p-1 d-none animated slideInUp" md={4} sm={12} xs={12} lg={4}>
                                        <label className="form-label">Referral ID</label>
                                        <input readOnly={true} value={this.state.referralID} onChange={(e)=>{this.setState({referralID:e.target.value})}}  ref={(input)=>{this.referralID=input}} type="text" className="form-control form-control-read-only"/>
                                    </Col>

                                    <Col className="p-1 animated slideInUp" md={4} sm={12} xs={12} lg={4}>
                                        <label className="form-label">Referral User CIF</label>
                                        <input readOnly={true}  value={this.state.referralCIF} onChange={(e)=>{this.setState({referralCIF:e.target.value})}}  ref={(input)=>{this.referralCIF=input}} type="text" className="form-control form-control-read-only"/>
                                    </Col>

                                    <Col className="p-1 animated slideInUp" md={4} sm={12} xs={12} lg={4}>
                                        <label className="form-label">Customer Need</label>
                                        <input value={this.state.need} onChange={(e)=>{this.setState({need:e.target.value})}}  ref={(input)=>{this.need=input}} type="text" className="form-control"/>
                                    </Col>

                                    <Col className="p-1 animated slideInUp" md={4} sm={12} xs={12} lg={4}>
                                        <label className="form-label">Loan Amount</label>
                                        <input value={this.state.amount} onChange={(e)=>{this.setState({amount:e.target.value})}}  ref={(input)=>{this.amount=input}} type="text" className="form-control"/>
                                    </Col>

                                    <Col className="p-1 animated slideInUp" md={4} sm={12} xs={12} lg={4}>
                                        <label className="form-label">Customer Name</label>
                                        <input value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}}  ref={(input)=>{this.name=input}} type="text" className="form-control"/>
                                    </Col>

                                    <Col className="p-1 animated slideInUp" md={4} sm={12} xs={12} lg={4}>
                                        <label className="form-label">Customer Mobile</label>
                                        <input  value={this.state.mobile} onChange={(e)=>{this.setState({mobile:e.target.value})}} ref={(input)=>{this.mobile=input}} type="text" className="form-control"/>
                                    </Col>

                                    <Col className="p-1 animated slideInUp" md={4} sm={12} xs={12} lg={4}>
                                        <label className="form-label">Customer Email</label>
                                        <input value={this.state.email} onChange={(e)=>{this.setState({email:e.target.value})}}  ref={(input)=>{this.email=input}} type="text" className="form-control"/>
                                    </Col>

                                    <Col className="p-1 animated slideInUp" md={4} sm={12} xs={12} lg={4}>
                                        <label className="form-label">Customer Occupation</label>
                                        <input value={this.state.occupation} onChange={(e)=>{this.setState({occupation:e.target.value})}}  ref={(input)=>{this.occupation=input}} type="text" className="form-control"/>
                                    </Col>


                                    <Col className="p-1 animated slideInUp" md={4} sm={12} xs={12} lg={4}>
                                        <label className="form-label">Customer City</label>
                                        <input value={this.state.city} onChange={(e)=>{this.setState({city:e.target.value})}}   ref={(input)=>{this.city=input}} type="text" className="form-control"/>
                                    </Col>


                                    <Col className="p-1 animated slideInUp" md={4} sm={12} xs={12} lg={4}>
                                        <label className="form-label">Remarks</label>
                                        <input  value={this.state.remarks} onChange={(e)=>{this.setState({remarks:e.target.value})}}   ref={(input)=>{this.remarks=input}} type="text" className="form-control"/>
                                    </Col>


                                    <Col className="p-1 animated slideInUp" md={4} sm={12} xs={12} lg={4}>
                                        <label className="form-label">Status</label>
                                        <input value={this.state.status} onChange={(e)=>{this.setState({status:e.target.value})}}   ref={(input)=>{this.status=input}} type="text" className="form-control"/>
                                    </Col>


                                    <Col className="p-1 animated slideInUp" md={4} sm={12} xs={12} lg={4}>
                                        <label className="form-label">Assigned RM CIF</label>
                                        <input readOnly={true} value={this.state.assignRFCIF} onChange={(e)=>{this.setState({assignRFCIF:e.target.value})}} ref={(input)=>{this.assignRFCIF=input}} type="text" className="form-control form-control-read-only"/>
                                    </Col>

                                </Row>


                                <Row>
                                    <hr className="content-title-hr"/>
                                    <Col className="p-1 animated slideInUp">
                                        <button onClick={this.onSubmit} ref={(button)=>{this.submitElement=button}}  className="btn btn-primary">Save Change</button>
                                        <button  ref={(button)=>{this.LoadingElement=button}} className="btn d-none btn-primary"><span className="spinner-border spinner-border-sm mx-2" role="status"/> Updating...</button>
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

export default withRouter(ReferenceUpdate);