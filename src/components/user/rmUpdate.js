import React, {Component,Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import back from "../../assets/images/back.svg";
import {AiOutlineForm} from "react-icons/all";
import {IDLCBranchListService, RMDetailsByCIF} from "../../APIServices/SettingsServices";
import {
    ErrorFocus,
    ErrorToast,
    HideSubmitLoading,
    IsEmpty,
    IsMobile, IsNumber,
    ShowSubmitLoading,
    SuccessToast
} from "../../helper/FormHelper";
import {getUserDetails} from "../../helper/sessionHelper";
import {RMUpdateService} from "../../APIServices/RMUpdateService";
import {withRouter} from "react-router-dom";
import ContentScreenLoader from "../common/contentScreenLoader";
class RmUpdate extends Component {

    constructor(props) {
        super(props);
        this.state={
            IDLCBranchList:[],
            RMBranch:"",
            UserRegID:"",
            MainDiv:"",
            LoaderDiv:"d-none",
        }
    }

    componentDidMount() {
        this.getIDLCBranch();


        if(getUserDetails()!==null){
            this.setState({
                UserRegID:getUserDetails()['userRegID'],
                RMBranch:getUserDetails()['rmBranch'],
            })
            // Assign RM
            this.RMCIF.value=getUserDetails()['rmcif'];
            this.RMName.value=getUserDetails()['rmName'];
            this.RMMobile.value=getUserDetails()['rmMobile'];
            this.RMUserName.value=getUserDetails()['rmUserName'];
        }

    }

    getIDLCBranch=()=>{
        IDLCBranchListService().then((res)=>{
            this.setState({IDLCBranchList:res})
            this.setState({MainDiv:"", LoaderDiv:"d-none"})
        })
    }



    onSubmit=()=>{
        let RMCIF=this.RMCIF;
        let RMName=this.RMName;
        let RMMobile=this.RMMobile;
        let RMBranch=this.RMBranch;
        let RMUserName=this.RMUserName;

        let RMCIFValue=RMCIF.value;
        let RMNameValue=RMName.value;
        let RMMobileValue=RMMobile.value;
        let RMBranchValue=RMBranch.value;
        let RMUserNameValue=  RMUserName.value;

       if(IsEmpty(RMCIFValue)){
            ErrorToast("RM CIF Required !")
            ErrorFocus(RMCIF)
        }
        else if(IsEmpty(RMNameValue)){
            ErrorToast("RM Name Required !")
            ErrorFocus(RMName)
        }
       else if(IsEmpty(RMUserNameValue)){
           ErrorToast("RM User Name Required !")
           ErrorFocus(RMUserName)
       }
        else if(!IsMobile(RMMobileValue)){
            ErrorToast("RM Valid Mobile No Required !")
            ErrorFocus(RMMobile)
        }

        else if(IsEmpty(RMBranchValue)){
            ErrorToast("RM Branch Required !")
            ErrorFocus(RMBranch)
        }
        else {
           ShowSubmitLoading(this.submitElement,this.LoadingElement)
           RMUpdateService(this.state.UserRegID, RMCIFValue,RMBranchValue,RMNameValue,RMUserNameValue,RMMobileValue).then((res)=>{
               HideSubmitLoading(this.submitElement,this.LoadingElement)
               if(res=="1"){
                   SuccessToast("RM Information Updated");
                   this.props.history.push("/UserList")
               }
               else {
                   ErrorToast("Request Fail ! Try Again")
               }
           })
       }

    }


    RMCIFOnChange=(e)=>{
        let CIF=e.target.value;
        if(IsNumber(CIF) && CIF.length===6){
            this.setState({MainDiv:"d-none", LoaderDiv:""})
            RMDetailsByCIF(CIF).then((res)=>{
                this.setState({MainDiv:"", LoaderDiv:"d-none"})
                if(res.length!==0){
                    this.RMName.value=(res[0]['MemberName']).trim();
                    this.RMUserName.value=(res[0]['UserName']).trim();
                    this.RMMobile.value=(res[0]['MobileNo']).trim();
                }
                else {
                    ErrorToast("RM CIF Number Not Found !")
                    ErrorFocus(this.RMCIF)
                    this.RMName.value=""
                    this.RMUserName.value=""
                    this.RMMobile.value=""
                }
            })
        }
        else {
            this.RMName.value=""
            this.RMUserName.value=""
            this.RMMobile.value=""
        }

    }

    render() {

        let IDLCListBranch=this.state.IDLCBranchList;
        const IDLCBranchOptions=IDLCListBranch.map((List,i)=>{
            return (<option key={i.toString()} value={List['Branch']}>{List['Branch']}</option>)
        })
        return (
            <Fragment>
                <Container fluid={true} className={ this.state.MainDiv+" content-body m-0"}>
                    <Row className=" p-0 m-0 ">
                        <Col className="m-0 p-0" md={12} lg={12} sm={12} xs={12}>
                            <Container className="content-card " fluid={true}>
                                <Row>
                                    <Col className="p-1" md={12} sm={12} xs={12} lg={12}>
                                        <Link to="/UserList" className="content-title "> <img className="back-btn " src={back}/> <span className="mx-2">Change RM</span> </Link>
                                    </Col>
                                    <hr className="content-title-hr"/>
                                </Row>
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
                                    <Col className="p-1 animated fadeIn" md={3} sm={12} xs={12} lg={3}>
                                        <label className="form-label"><span><AiOutlineForm /></span> RM Mobile </label>
                                        <input  ref={(input)=>{this.RMMobile=input}} type="text" className="form-control "/>
                                    </Col>
                                    <Col className="p-1 animated fadeIn" md={3} sm={12} xs={12} lg={3}>
                                        <label className="form-label"><span><AiOutlineForm /></span> RM Branch </label>
                                        <select onChange={(e)=>{this.setState({RMBranch:e.target.value})}} value={this.state.RMBranch} ref={(input)=>{this.RMBranch=input}} type="text" className="form-control form-select ">
                                            <option value="">Choose Branch</option>
                                            {IDLCBranchOptions}
                                        </select>
                                    </Col>
                                    <hr className="content-title-hr"/>
                                </Row>
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
export default withRouter(RmUpdate);