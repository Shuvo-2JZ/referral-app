import React, {Component,Fragment} from 'react';
import {Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import {Link} from "react-router-dom";
import back from "../../assets/images/back.svg";
import {
    ErrorFocus,
    ErrorToast,
    HideSubmitLoading,
    IsEmpty,
    IsMobile,
    IsNumber,
    ShowSubmitLoading,
    SuccessToast
} from "../../helper/FormHelper";
import {withRouter} from "react-router-dom";
import {getUserDetails} from "../../helper/sessionHelper";
import {UserUpdateServices} from "../../APIServices/UserUpdateServices";
import ContentScreenLoader from "../common/contentScreenLoader";
import {
    BankListService,
    BranchListService,
    IDLCBranchListService,
    RMDetailsByCIF,
    RoutingNoByBranch, UserDetailsByCIF
} from "../../APIServices/SettingsServices";
import {AiOutlineForm} from "react-icons/all";

class UserUpdate extends Component {

    constructor(props) {
        super(props);
        this.state={
            BankList:[],
            BranchList:[],
            MainDiv:"d-none",
            LoaderDiv:"",
            RoutingNo:"",
            InstitutionDiv:"d-none",
            IDLCBranchList:[],
            TabKey:"1",
            userRegID: "",
            userRef: "",
            fullName: "",
            mobileNo: "",
            userPass: "",
            userDetails: "",
            rmcif: "",
            rmName: "",
            rmBranch: "",
            rmMobile: "",
            refUserType: "",
            commissionPercentage: "",
            bankAccName: "",
            bankName: "",
            bankIndex:"",
            branchName: "",
            bankAccNo: " ",
            mfsAccType: "",
            mfsAccNo: "",
            refUserInstitution: ""
        }
    }


    componentDidMount() {

        if(getUserDetails()!==null){
            this.setState({
                userRegID: getUserDetails()['userRegID'],
                branchName:getUserDetails()['branchName'],
            })



            // User Profile
            this.FullName.value=getUserDetails()['fullName'];
            this.UserRef.value=getUserDetails()['userRef'];
            this.MobileNo.value=getUserDetails()['mobileNo'];
            this.UserPass.value=getUserDetails()['userPass'];
            this.CommissionPercentage.value=getUserDetails()['commissionPercentage'];
            this.ReferrerTypes.value=getUserDetails()['refUserType'];
            if(getUserDetails()['refUserType']==="Car Vendors" || getUserDetails()['refUserType']==="Institutional Partners"){
                    this.setState({InstitutionDiv:""})
            }
            this.InstitutionName.value=getUserDetails()['refUserInstitution'];
            this.UserDetails.value=getUserDetails()['userDetails'];


            // Assign RM
            this.RMCIF.value=getUserDetails()['rmcif'];
            this.RMName.value=getUserDetails()['rmName'];
            this.RMMobile.value=getUserDetails()['rmMobile'];
            this.RMUserName.value=getUserDetails()['rmUserName'];


            //User Payout Details
            this.BankAccName.value=getUserDetails()['bankAccName'];
            this.BankAccNo.value=getUserDetails()['bankAccNo'];
            this.MFSAccType.value=getUserDetails()['mfsAccType'];
            this.MFSAccNo.value=getUserDetails()['mfsAccNo'];


        }

        this.getBankList();
        this.getIDLCBranch();



        setTimeout(()=>{
            this.getBackBankBranchRouting();
        },2000)





    }

    onSubmit=()=>{
        let UserRef=  this.UserRef;
        let FullName=this.FullName;
        let UserDetails=this.UserDetails;
        let MobileNo= this.MobileNo;
        let UserPass=  this.UserPass;
        let RMCIF=  this.RMCIF;
        let RMName=  this.RMName;
        let RMUserName=this.RMUserName;
        let RMMobile=  this.RMMobile;
        let RMBranch=this.RMBranch;
        let ReferrerTypes= this.ReferrerTypes
        let CommissionPercentage=this.CommissionPercentage
        let BankAccName= this.BankAccName
        let BankName= this.BankName
        let BranchName= this.BranchName
        let RoutingNumber= this.RoutingNumber
        let BankAccNo=this.BankAccNo;
        let InstitutionName=this.InstitutionName;
        let MFSAccType=this.MFSAccType;
        let MFSAccNo=this.MFSAccNo;


        let UserRefValue=UserRef.value;
        let FullNameValue=FullName.value;
        let MobileNoValue=MobileNo.value;
        let UserPassValue=UserPass.value;
        let RMCIFValue=RMCIF.value;
        let UserDetailsValue=UserDetails.value;
        let BankAccNoValue=BankAccNo.value;
        let MFSAccTypeValue=MFSAccType.value;
        let MFSAccNoValue=MFSAccNo.value;
        let ReferrerTypesValue= ReferrerTypes.value;
        let CommissionPercentageValue=CommissionPercentage.value;
        let BankAccNameValue= BankAccName.value;
        let BankNameValue= BankName.value;
        let BranchNameValue= BranchName.value;
        let RoutingNumberValue= RoutingNumber.value;
        let InstitutionNameValue=InstitutionName.value;


        let RMNameValue=  RMName.value;
        let RMMobileValue=  RMMobile.value;
        let RMBranchValue=RMBranch.value;
        let RMUserNameValue=RMUserName.value;

        let BankNameText= BankName.options[this.BankName.selectedIndex].text
        let BranchNameText= BranchName.options[this.BranchName.selectedIndex].text

        if(IsEmpty(UserRefValue)){
            this.setState({TabKey:1})
            ErrorToast("User CIF No Required !")
            ErrorFocus(UserRef)
        }
        else if(IsEmpty(FullNameValue)){
            this.setState({TabKey:1})
            ErrorToast("User Full Name Required !")
            ErrorFocus(FullName)
        }
        else if(!IsMobile(MobileNoValue)){
            this.setState({TabKey:1})
            ErrorToast("Valid User Mobile Number Required !")
            ErrorFocus(MobileNo)
        }
        else if(IsEmpty(UserPassValue)){
            this.setState({TabKey:1})
            ErrorToast("User Password Required !")
            ErrorFocus(UserPass)
        }
        else if(IsEmpty(CommissionPercentageValue)){
            this.setState({TabKey:1})
            ErrorToast("Commission Percentage Required !")
            ErrorFocus(CommissionPercentage)
        }

        else if(IsEmpty(ReferrerTypesValue)){
            this.setState({TabKey:1})
            ErrorToast("Referrer Type Required !")
            ErrorFocus(ReferrerTypes)
        }

        else if(IsEmpty(UserDetailsValue)){
            this.setState({TabKey:1})
            ErrorToast("User Details Required !")
            ErrorFocus(UserDetails)
        }

        else if(ReferrerTypesValue==="Car Vendors" && IsEmpty(InstitutionNameValue)){
            this.setState({TabKey:1})
            ErrorToast("Car Vendors Institution Name Required !")
            ErrorFocus(InstitutionName)
        }
        else if(ReferrerTypesValue==="Institutional Partners" && IsEmpty(InstitutionNameValue)){
            this.setState({TabKey:1})
            ErrorToast("Partners Institution Name Required !")
            ErrorFocus(InstitutionName)
        }

        else if(IsEmpty(RMCIFValue)){
            this.setState({TabKey:2})
            ErrorToast("RM CIF Required !")
            ErrorFocus(RMCIF)
        }

        else if(IsEmpty(RMNameValue)){
            this.setState({TabKey:2})
            ErrorToast("RM Name Required !")
            ErrorFocus(RMName)
        }
        else if(IsEmpty(RMUserNameValue)){
            this.setState({TabKey:2})
            ErrorToast("RM User Name Required !")
            ErrorFocus(RMUserName)
        }

        else if(!IsMobile(RMMobileValue)){
            this.setState({TabKey:2})
            ErrorToast("RM Valid Mobile No Required !")
            ErrorFocus(RMMobile)
        }

        else if(IsEmpty(RMBranchValue)){
            this.setState({TabKey:2})
            ErrorToast("RM Branch Required !")
            ErrorFocus(RMBranch)
        }

/*
else if(IsEmpty(BankAccNameValue)){
    this.setState({TabKey:3})
    ErrorToast("Bank Acc Name Required !")
    ErrorFocus(BankAccName)
}
else if(IsEmpty(BankAccNoValue)){
    this.setState({TabKey:3})
    ErrorToast("Bank Acc No Required !")
    ErrorFocus(BankAccNo)
}
else if(IsEmpty(BankNameValue)){
    this.setState({TabKey:3})
    ErrorToast("Bank  Name Required !")
    ErrorFocus(BankName)
}
else if(IsEmpty(BranchNameValue)){
    this.setState({TabKey:3})
    ErrorToast("Branch Name Required !")
    ErrorFocus(BranchName)
}
else if(IsEmpty(RoutingNumberValue)){
    this.setState({TabKey:3})
    ErrorToast("Routing Number Required !")
    ErrorFocus(RoutingNumber)
}
else if(IsEmpty(MFSAccTypeValue)){
    this.setState({TabKey:3})
    ErrorToast("MFS Acc Type Required !")
    ErrorFocus(MFSAccType)
}
else if(IsEmpty(MFSAccNoValue)){
    this.setState({TabKey:3})
    ErrorToast("MFS Acc No Required !")
    ErrorFocus(MFSAccNo)
}
*/



else {
    ShowSubmitLoading(this.submitElement,this.LoadingElement)
    UserUpdateServices(
        this.state.userRegID,
        UserRefValue,
        FullNameValue,
        MobileNoValue,
        UserPassValue,
        UserDetailsValue,
        RMCIFValue,
        RMBranchValue,
        RMNameValue,
        RMMobileValue,
        RMUserNameValue,
        ReferrerTypesValue,
        CommissionPercentageValue,
        BankAccNameValue,
        BankNameText,
        BranchNameText,
        RoutingNumberValue,
        BankAccNoValue,
        MFSAccTypeValue,
        MFSAccNoValue,
        InstitutionNameValue,
    ).then((res)=>{
        HideSubmitLoading(this.submitElement,this.LoadingElement)
        if(res=="1"){
            SuccessToast("User information updated");
            this.props.history.push("/UserList")
        }
        else {
            ErrorToast("Request Fail ! Try Again")
        }
    })
}

}


getBankList=()=>{
BankListService().then((res)=>{
    this.setState({BankList:res})
    this.setState({MainDiv:"", LoaderDiv:"d-none"})
})
}

getIDLCBranch=()=>{
IDLCBranchListService().then((res)=>{
    this.setState({IDLCBranchList:res})
    this.setState({MainDiv:"", LoaderDiv:"d-none"})
})
}

getBranchList=(IndexID)=>{
this.setState({MainDiv:"d-none", LoaderDiv:""})
BranchListService(IndexID).then((res)=>{
    this.setState({BranchList:res})
    this.setState({MainDiv:"", LoaderDiv:"d-none"})
})
}

bankOnChange=()=>{
let IndexID= this.BankName.value;
if(IndexID.length!==0){
    this.getBranchList(IndexID);
}
}

branchOnChange=()=>{
let BranchID= this.BranchName.value;
if(BranchID.length!==0){
    this.getRoutingNumber(BranchID);
}
}

getRoutingNumber=(BranchID)=>{
this.setState({MainDiv:"d-none", LoaderDiv:""})
RoutingNoByBranch(BranchID).then((res)=>{
    if(res.length!==0){
        this.setState({RoutingNo:res[0]['RoutingNo']})
        this.setState({MainDiv:"", LoaderDiv:"d-none"})
    }
    else {
        this.setState({RoutingNo:""})
        this.setState({MainDiv:"", LoaderDiv:"d-none"})
        ErrorToast("Routing Number Not Found !")
    }
})
}

ReferrerTypesOnChange=(e)=>{
let ReferrerType= e.target.value;
if(ReferrerType==="Car Vendors" || ReferrerType==="Institutional Partners"){
    this.setState({InstitutionDiv:""})
}
else {
    this.setState({InstitutionDiv:"d-none"})
}
}


// Get Back bank branch...
getBackBankBranchRouting=()=>{
    let IndexID= this.BankName.value;
    BranchListService(IndexID).then((res)=>{
        this.setState({BranchList:res});
        this.setState({RoutingNo:getUserDetails()['routingNo']})
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
            this.RMMobile.value=res[0]['MobileNo']
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


UserCIFOnChange=(e)=>{
let CIF=e.target.value;
if(IsNumber(CIF) && CIF.length===6){
    this.setState({MainDiv:"d-none", LoaderDiv:""})
    UserDetailsByCIF(CIF).then((res)=>{
        this.setState({MainDiv:"", LoaderDiv:"d-none"})
        if(res.length!==0){
            this.FullName.value=res[0]['CUSTOMER_NAME']
            this.BankAccName.value=res[0]['CUSTOMER_NAME']
            this.MobileNo.value=res[0]['MOBILE_NUMBER']
            this.UserDetails.value=res[0]['DEFAULT_ADDRESS']
        }
        else {
            ErrorToast("User CIF Number Not Found !")
            ErrorFocus(this.UserRef)
            this.FullName.value=""
            this.BankAccName.value=""
            this.MobileNo.value=""
            this.UserDetails.value=""
        }
    })
}
else {
    this.FullName.value=""
    this.BankAccName.value=""
    this.MobileNo.value=""
    this.UserDetails.value=""
}

}

render() {


let ListBank=this.state.BankList;
let bankName= getUserDetails()['bankName']
let branchName= getUserDetails()['branchName']
const BankOptions=ListBank.map((List,i)=>{
    if(List['MemberName'].trim()==bankName.trim()){
        return (<option selected={true} key={i.toString()} value={List['IndexID']}>{List['MemberName']}</option>)
    }
    else {
        return (<option key={i.toString()} value={List['IndexID']}>{List['MemberName']}</option>)
    }

})

let ListBranch=this.state.BranchList;
const BranchOptions=ListBranch.map((List,i)=>{
    if(List['BranchName'].trim()==branchName.trim()){
        return (<option selected={true} key={i.toString()} value={List['BranchID']}>{List['BranchName']}</option>)
    }
    else {
        return (<option key={i.toString()} value={List['BranchID']}>{List['BranchName']}</option>)
    }

})




let IDLCListBranch=this.state.IDLCBranchList;
const IDLCBranchOptions=IDLCListBranch.map((List,i)=>{
    if(List['Branch']===getUserDetails()['rmBranch']){
        return (<option selected={true} key={i.toString()} value={List['Branch']}>{List['Branch']}</option>)
    }
    else {
        return (<option key={i.toString()} value={List['Branch']}>{List['Branch']}</option>)
    }
})






return (
    <Fragment>
        <Container fluid={true} className={this.state.MainDiv+ " content-body m-0"}>
            <Row className=" p-0 m-0 ">
                <Col className="m-0 p-0" md={12} lg={12} sm={12} xs={12}>
                    <Container className="content-card " fluid={true}>
                        <Row>
                            <Col className="p-1" md={12} sm={12} xs={12} lg={12}>
                                <Link to="/UserList" className="content-title "> <img className="back-btn " src={back}/> <span className="mx-2">Update User</span> </Link>
                            </Col>
                            <hr className="content-title-hr"/>
                        </Row>

                        <Row>

                            <Tabs  onSelect={(k) => this.setState({TabKey:k})} activeKey={this.state.TabKey} id="uncontrolled-tab-example" className="mb-3">
                                <Tab  className="tab-btn" eventKey="1" title="User Profile">
                                    <Row>
                                        <Col className="p-1 animated fadeIn" md={3} sm={12} xs={12} lg={3}>
                                            <label className="form-label"> <span><AiOutlineForm/></span> User CIF </label>
                                            <input onChange={this.UserCIFOnChange}  ref={(input)=>{this.UserRef=input}} type="text" className="form-control "/>
                                        </Col>
                                        <Col className="p-1 animated fadeIn" md={3} sm={12} xs={12} lg={3}>
                                            <label className="form-label"> <span><AiOutlineForm/></span> Full name </label>
                                            <input  readOnly={true} ref={(input)=>{this.FullName=input}} type="text" className="form-control form-control-read-only"/>
                                        </Col>
                                        <Col className="p-1 animated fadeIn" md={3} sm={12} xs={12} lg={3}>
                                            <label className="form-label"> <span><AiOutlineForm/></span> User Mobile </label>
                                            <input   ref={(input)=>{this.MobileNo=input}} type="text" className="form-control "/>
                                        </Col>
                                        <Col className="p-1 animated fadeIn" md={3} sm={12} xs={12} lg={3}>
                                            <label className="form-label"> <span><AiOutlineForm/></span> User Password </label>
                                            <input   ref={(input)=>{this.UserPass=input}} type="text" className="form-control "/>
                                        </Col>
                                        <Col className="p-1 animated fadeIn" md={3} sm={12} xs={12} lg={3}>
                                            <label className="form-label"><span><AiOutlineForm/></span> Commission % of loan amount </label>
                                            <input  ref={(input)=>{this.CommissionPercentage=input}} type="text" className="form-control "/>
                                        </Col>
                                        <Col className="p-1 animated fadeIn" md={3} sm={12} xs={12} lg={3}>
                                            <label className="form-label"><span><AiOutlineForm/></span> Referrer Types </label>
                                            <select onChange={this.ReferrerTypesOnChange}  ref={(input)=>{this.ReferrerTypes=input}}  className="form-control form-select " >
                                                <option value="">Choose</option>
                                                <option value="Alternate Sales Channel">Alternate Sales Channel</option>
                                                <option value="Referral Channel">Referral Channel</option>
                                                <option value="Car Vendors">Car Vendors</option>
                                                <option value="Institutional Partners">Institutional Partners</option>
                                            </select>
                                        </Col>
                                        <Col className={"p-1 animated fadeIn " + this.state.InstitutionDiv} md={3} sm={12} xs={12} lg={3}>
                                            <label className="form-label"><span><AiOutlineForm/></span> Institution Name </label>
                                            <input  ref={(input)=>{this.InstitutionName=input}} type="text" className="form-control"/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="p-1 animated fadeIn" md={3} sm={12} xs={12} lg={3}>
                                            <label className="form-label"><span><AiOutlineForm/></span> User Details </label>
                                            <textarea   ref={(input)=>{this.UserDetails=input}} type="text" className="form-control "/>
                                        </Col>
                                    </Row>
                                </Tab>
                                <Tab eventKey="2" title="Assign RM ">
                                    <Row>
                                        <Col className="p-1 animated fadeIn" md={3} sm={12} xs={12} lg={3}>
                                            <label className="form-label"><span><AiOutlineForm /></span> RM CIF </label>
                                            <input onChange={this.RMCIFOnChange} ref={(input)=>{this.RMCIF=input}} type="text" className="form-control "/>
                                        </Col>
                                        <Col className="p-1 animated fadeIn" md={3} sm={12} xs={12} lg={3}>
                                            <label className="form-label"><span><AiOutlineForm /></span> RM Name </label>
                                            <input readOnly={true} ref={(input)=>{this.RMName=input}} type="text" className="form-control form-control-read-only"/>
                                        </Col>
                                        <Col className="p-1 animated fadeIn" md={3} sm={12} xs={12} lg={3}>
                                            <label className="form-label"><span><AiOutlineForm /></span> RM User Name </label>
                                            <input readOnly={true} ref={(input)=>{this.RMUserName=input}} type="text" className="form-control form-control-read-only"/>
                                        </Col>
                                        <Col className="p-1 animated fadeIn" md={3} sm={12} xs={12} lg={3}>
                                            <label className="form-label"><span><AiOutlineForm /></span> RM Mobile </label>
                                            <input  ref={(input)=>{this.RMMobile=input}} type="text" className="form-control "/>
                                        </Col>
                                        <Col className="p-1 animated fadeIn" md={3} sm={12} xs={12} lg={3}>
                                            <label className="form-label"><span><AiOutlineForm /></span> RM Branch </label>
                                            <select ref={(input)=>{this.RMBranch=input}} type="text" className="form-control form-select ">
                                                <option value="">Choose Branch</option>
                                                {IDLCBranchOptions}
                                            </select>
                                        </Col>
                                    </Row>
                                </Tab>
                                <Tab eventKey="3" title="User Payout ">
                                    <Row>
                                        <Col className="p-1 animated fadeIn" md={3} sm={12} xs={12} lg={3}>
                                            <label className="form-label"><span><AiOutlineForm /></span> Bank Acc Name </label>
                                            <input  ref={(input)=>{this.BankAccName=input}} type="text" className="form-control"/>
                                        </Col>
                                        <Col className="p-1 animated fadeIn" md={3} sm={12} xs={12} lg={3}>
                                            <label className="form-label"><span><AiOutlineForm /></span> Bank Acc No </label>
                                            <input  ref={(input)=>{this.BankAccNo=input}} type="text" className="form-control"/>
                                        </Col>
                                        <Col className="p-1 animated fadeIn" md={3} sm={12} xs={12} lg={3}>
                                            <label className="form-label"><span><AiOutlineForm/></span> Bank Name  </label>
                                            <select  onChange={this.bankOnChange} ref={(input)=>{this.BankName=input}} type="text" className="form-control form-select ">
                                                <option value="">Choose Bank</option>
                                                {BankOptions}
                                            </select>
                                        </Col>
                                        <Col className="p-1 animated fadeIn" md={3} sm={12} xs={12} lg={3}>
                                            <label className="form-label"><span><AiOutlineForm /></span> Branch Name </label>
                                            <select  onChange={this.branchOnChange} ref={(input)=>{this.BranchName=input}} type="text" className="form-control form-select ">
                                                <option value="">Choose Branch</option>
                                                {BranchOptions}
                                            </select>
                                        </Col>


                                        <Col className="p-1 animated fadeIn" md={3} sm={12} xs={12} lg={3}>
                                            <label className="form-label"><span><AiOutlineForm /></span> Routing Number </label>
                                            <input readOnly={true} value={this.state.RoutingNo}  ref={(input)=>{this.RoutingNumber=input}} type="text" className="form-control form-control-read-only "/>
                                        </Col>

                                        <Col className="p-1 animated fadeIn" md={3} sm={12} xs={12} lg={3}>
                                            <label className="form-label"><span><AiOutlineForm /></span> MFS Acc Type </label>
                                            <select   ref={(input)=>{this.MFSAccType=input}} type="text" className="form-control form-select ">
                                                <option value="">Choose Acc Type</option>
                                                <option value="Bkash">Bkash</option>
                                                <option value="Rocket">Rocket</option>
                                                <option value="Nagad">Nagad</option>
                                            </select>
                                        </Col>

                                        <Col className="p-1 animated fadeIn" md={3} sm={12} xs={12} lg={3}>
                                            <label className="form-label"><span><AiOutlineForm /></span> MFS Acc No </label>
                                            <input  ref={(input)=>{this.MFSAccNo=input}} type="text" className="form-control "/>
                                        </Col>
                                        <hr className="content-title-hr"/>
                                    </Row>
                                    <Row>
                                        <Col className="p-1 animated fadeIn">
                                            <button  ref={(button)=>{this.submitElement=button}} onClick={this.onSubmit} className="btn btn-lg btn-primary">Save Change</button>
                                            <button  ref={(button)=>{this.LoadingElement=button}}  className="btn d-none btn-primary"><span className="spinner-border spinner-border-sm mx-2" role="status"/> Changing...</button>
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
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

export default withRouter(UserUpdate);