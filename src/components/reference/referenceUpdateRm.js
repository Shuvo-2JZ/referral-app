import React, {Component, Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import back from "../../assets/images/back.svg";
import {getReferenceDetails} from "../../helper/sessionHelper";
import ContentScreenLoader from "../common/contentScreenLoader";
import {AiOutlineForm} from "react-icons/all";
import {
    ErrorFocus,
    ErrorToast,
    HideSubmitLoading, IsEmpty,
    IsNumber,
    ShowSubmitLoading,
    SuccessToast
} from "../../helper/FormHelper";
import {RMDetailsByCIF} from "../../APIServices/SettingsServices";
import {ReferralUpdateRMServices} from "../../APIServices/ReferralUpdateRMServices";
import {withRouter} from "react-router-dom";
class ReferenceUpdateRm extends Component {
    constructor() {
        super();
        this.state={
            MainDiv:"",
            LoaderDiv:"d-none",
            referralID:"",
            activityJournalID:"",
            need:"",
            amount:"",
            name:"",
            mobile:"",
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

        this.getExistingRM(Details['assignRFCIF']);
    }



    getExistingRM=(CIF)=>{
        this.setState({MainDiv:"d-none", LoaderDiv:""})
        RMDetailsByCIF(CIF).then((res)=>{
            this.setState({MainDiv:"", LoaderDiv:"d-none"})
            if(res.length!==0){
                this.RMCIF.value=CIF;
                this.RMName.value=res[0]['MemberName'];
                this.RMUserName.value=res[0]['UserName'];
            }
            else {
                ErrorToast("RM CIF Number Not Found !")
                ErrorFocus(this.RMCIF)
                this.RMName.value=""
                this.RMUserName.value=""
            }
        })
    }



    RMCIFOnChange=(e)=>{
        let CIF=e.target.value;
        if(IsNumber(CIF) && CIF.length===6){
            this.setState({MainDiv:"d-none", LoaderDiv:""})
            RMDetailsByCIF(CIF).then((res)=>{
                this.setState({MainDiv:"", LoaderDiv:"d-none"})
                if(res.length!==0){
                    this.RMName.value=res[0]['MemberName']
                    this.RMUserName.value=res[0]['UserName']

                }
                else {
                    ErrorToast("RM CIF Number Not Found !")
                    ErrorFocus(this.RMCIF)
                    this.RMName.value=""
                    this.RMUserName.value=""
                }
            })
        }
        else {
            this.RMName.value=""
            this.RMUserName.value=""
        }
    }


    onSubmit=()=>{
        let ActivityJournalID=this.state.activityJournalID;
        let ReferralID=this.state.referralID;
        let AssignRFCIF=this.RMCIF.value;
        let AssignRMUserName=this.RMUserName.value;

        if(IsEmpty(AssignRFCIF)){
            ErrorToast("RM Information Required")
            ErrorFocus(this.RMCIF)
        }
        else if(IsEmpty(AssignRMUserName)){
            ErrorToast("RM Information Required")
            ErrorFocus(this.RMUserName)
        }
        else {
            ShowSubmitLoading(this.submitElement,this.LoadingElement)
            ReferralUpdateRMServices(ActivityJournalID,ReferralID,AssignRFCIF,AssignRMUserName).then((res)=>{
                HideSubmitLoading(this.submitElement,this.LoadingElement)
                if(res===1){
                    SuccessToast("Reference RM information updated");
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
                <Container fluid={true} className={ this.state.MainDiv+" content-body m-0"}>
                    <Row className=" p-0 m-0 ">
                        <Col className="m-0 p-0" md={12} lg={12} sm={12} xs={12}>
                            <Container className="content-card " fluid={true}>
                                <Row>
                                    <Col className="p-1 " md={12} sm={12} xs={12} lg={12}>
                                        <Link to="/ReferenceList" className="content-title "> <img className="back-btn " src={back}/> <span className="mx-2">Change Reference RM</span> </Link>
                                    </Col>
                                    <hr className="content-title-hr"/>
                                </Row>
                                <Row>
                                    <Col className="p-1 animated fadeIn" md={4} sm={12} xs={12} lg={4}>
                                        <label className="form-label">Customer Name</label>
                                        <input readOnly={true} value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}}  ref={(input)=>{this.name=input}} type="text" className="form-control form-control-read-only"/>
                                    </Col>

                                    <Col className="p-1 animated fadeIn" md={4} sm={12} xs={12} lg={4}>
                                        <label className="form-label">Customer Mobile</label>
                                        <input readOnly={true} value={this.state.mobile} onChange={(e)=>{this.setState({mobile:e.target.value})}} ref={(input)=>{this.mobile=input}} type="text" className="form-control form-control-read-only"/>
                                    </Col>
                                    <Col className="p-1 animated fadeIn" md={4} sm={12} xs={12} lg={4}>
                                        <label className="form-label">Customer Need</label>
                                        <input readOnly={true} value={this.state.need} onChange={(e)=>{this.setState({need:e.target.value})}}  ref={(input)=>{this.need=input}} type="text" className="form-control form-control-read-only"/>
                                    </Col>

                                    <Col className="p-1 animated fadeIn" md={4} sm={12} xs={12} lg={4}>
                                        <label className="form-label">Loan Amount</label>
                                        <input readOnly={true} value={this.state.amount} onChange={(e)=>{this.setState({amount:e.target.value})}}  ref={(input)=>{this.amount=input}} type="text" className="form-control form-control-read-only"/>
                                    </Col>

                                    <Col className="p-1 animated fadeIn" md={4} sm={12} xs={12} lg={4}>
                                        <label className="form-label">Customer Name</label>
                                        <input readOnly={true} value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}}  ref={(input)=>{this.name=input}} type="text" className="form-control form-control-read-only"/>
                                    </Col>
                                </Row>
                                <hr className="content-title-hr"/>
                                <Row>
                                    <Col className="p-1 animated fadeIn" md={3} sm={12} xs={12} lg={3}>
                                        <label className="form-label"><span><AiOutlineForm /></span> RM CIF </label>
                                        <input   onChange={this.RMCIFOnChange} ref={(input)=>{this.RMCIF=input}} type="text" className="form-control "/>
                                    </Col>
                                    <Col className="p-1 animated fadeIn" md={3} sm={12} xs={12} lg={3}>
                                        <label className="form-label"><span><AiOutlineForm /></span> RM Name </label>
                                        <input readOnly={true}  ref={(input)=>{this.RMName=input}} type="text" className="form-control form-control-read-only"/>
                                    </Col>
                                    <Col className="p-1 animated fadeIn" md={3} sm={12} xs={12} lg={3}>
                                        <label className="form-label"><span><AiOutlineForm /></span> RM User Name </label>
                                        <input readOnly={true}  ref={(input)=>{this.RMUserName=input}} type="text" className="form-control form-control-read-only"/>
                                    </Col>
                                </Row>
                                <hr className="content-title-hr"/>
                                <Row>
                                    <Col className="p-1 animated fadeIn">
                                        <button  ref={(button)=>{this.submitElement=button}} onClick={this.onSubmit} className="btn btn-lg btn-primary">Save Change</button>
                                        <button  ref={(button)=>{this.LoadingElement=button}}  className="btn d-none btn-primary"><span className="spinner-border spinner-border-sm mx-2" role="status"/> Changing...</button>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <div className={this.state.LoaderDiv}>
                    <ContentScreenLoader/>
                </div>
            </Fragment>
        );
    }
}
export default withRouter(ReferenceUpdateRm);