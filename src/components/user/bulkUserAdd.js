import React, {Component, Fragment} from 'react';
import {Col, Container, Row, Table} from "react-bootstrap";
import readXlsxFile from "read-excel-file";
import {ErrorToast, SuccessToast} from "../../helper/FormHelper";
import {BiCloudDownload, FaUserCog} from "react-icons/all";
import {UserCreateServices} from "../../APIServices/UserCreateServices";
import {RMDetailsByCIF, UserDetailsByCIF} from "../../APIServices/SettingsServices";
import SweetAlert from "react-bootstrap-sweetalert";
import loader from "../../assets/images/loader.svg";
import {withRouter} from "react-router-dom";
class BulkUserAdd extends Component {


    constructor() {
        super();
        this.state={
            XlsxRows:[],
            UserCreatedCount:0,
            ExecutionCount:0,
            CreatedAlert:false
        }
    }
      ImportOnChange=()=>{
        readXlsxFile(this.FileInput.files[0]).then((rows) => {
            this.setState({XlsxRows:rows})
            let ItemLength=rows.length-1;
            SuccessToast(ItemLength+ " Items Found From Excel File")
            console.log(rows)
        })
    }

    onCancel=()=>{
            this.setState({CreatedAlert:false})
            this.props.history.push("/userList")
    }
    UserCreatedAlert=()=>{
       if(this.state.CreatedAlert===true){

           return(
               <SweetAlert
                   customButtons={
                       <React.Fragment>
                           <button className="btn btn-danger mb-5" onClick={this.onCancel}>Finish Now</button>
                       </React.Fragment>
                   }
               >
                   <h2>{this.state.XlsxRows.length-1} / {this.state.UserCreatedCount}</h2>
                   <h2>Process Status</h2>
                   <p className="grid-col-head">Don't close, until getting satisfactory status !</p>
               </SweetAlert>
           )
       }
    }


    InsertOnClick=()=>{
        if(this.state.XlsxRows.length<1){
            ErrorToast("XLSX file required")
        }
        else {
            this.BulkSave();
        }
    }

    BulkSave=()=>{

        this.setState({CreatedAlert:true})

        this.state.XlsxRows.map((item,i)=>{



            if(i>0){
                UserDetailsByCIF(item[0]).then((UserDetailsRes)=>{
                    if(UserDetailsRes.length===1){

                        RMDetailsByCIF(item[3]).then((RMDetails)=>{


                            if(RMDetails.length===1){

                                // Optional Field
                                let BankAccNameValue=""
                                let BankNameValue=""
                                let BranchNameValue=""
                                let RoutingNumberValue=""
                                let BankAccNo=""
                                let MFSAccTypeValue=""
                                let MFSAccNoValue=""
                                let InstitutionNameValue=""

                                // User Details
                                let UserRef=""
                                let FullName=""
                                let MobileNo=""
                                let UserPass=""
                                let UserDetails=""
                                let ReferrerTypesValue=""
                                let CommissionPercentageValue=""

                                // RM Details
                                let RMCIF=""
                                let RMBranchValue=""
                                let RMNameValue=""
                                let RMMobileValue=""
                                let RMUserNameValue=""

                                UserRef=item[0].trim().toString()
                                MobileNo=item[1].trim().toString()
                                UserPass=item[2].trim().toString()
                                RMCIF=item[3].trim().toString()
                                RMBranchValue=item[4].trim().toString()
                                RMMobileValue=item[5].trim().toString()
                                ReferrerTypesValue=item[6].trim().toString()
                                CommissionPercentageValue=item[7].toString()
                                FullName=UserDetailsRes[0]['CUSTOMER_NAME'].trim()
                                UserDetails=UserDetailsRes[0]['DEFAULT_ADDRESS'].trim()
                                RMNameValue=RMDetails[0]['MemberName'].trim()
                                RMUserNameValue=RMDetails[0]['UserName'].trim()

                                UserCreateServices(UserRef,FullName,MobileNo,UserPass,UserDetails,RMCIF,RMBranchValue,RMNameValue, RMMobileValue, RMUserNameValue,ReferrerTypesValue, CommissionPercentageValue, BankAccNameValue, BankNameValue, BranchNameValue, RoutingNumberValue,BankAccNo,MFSAccTypeValue, MFSAccNoValue,InstitutionNameValue).then((res)=>{
                                   let UserCreatedCount= this.state.UserCreatedCount+1;
                                   this.setState({UserCreatedCount:UserCreatedCount})
                                }).catch()

                            }
                        })
                    }
                })
            }
        })

    }








    render() {

        let TableRows;
        let XlsxRows=this.state.XlsxRows
        if(XlsxRows.length>0){
            TableRows=this.state.XlsxRows.map((item,i)=>{

                if(i>0){
                    return(
                        <tr className="grid-col-head">
                            <td>{i}</td>
                            <td>{item[0]}</td>
                            <td>{item[1]}</td>
                            <td>{item[2]}</td>
                            <td>{item[3]}</td>
                            <td>{item[4]}</td>
                            <td>{item[5]}</td>
                            <td>{item[6]}</td>
                            <td>{item[7]}</td>
                        </tr>
                    )
                }

            })
        }




        return (
            <Fragment>
                <Container fluid={true} className="content-body m-0">
                    <Row className=" p-0 m-0 ">
                        <Col className="m-0 p-0" md={12} lg={12} sm={12} xs={12}>
                            <Container className="content-card" fluid={true}>
                                <Row>
                                    <Col className="p-1 align-self-center">
                                        <h5 className="content-title mx-2">Add Bulk Users ({this.state.XlsxRows.length-1})</h5>
                                    </Col>
                                </Row>
                                <hr className="content-title-hr"/>
                                <Row>
                                    <Col md={3}>
                                        <input ref={(input) => { this.FileInput = input; }} onChange={this.ImportOnChange} type="file" className="form-control"/>
                                    </Col>
                                    <Col md={2}>
                                        <a href="/user_bulk.xlsx" className="btn w-100 btn-primary"><BiCloudDownload/> File</a>
                                    </Col>
                                    <Col md={2}>
                                        <button onClick={this.InsertOnClick} className="btn w-100 btn-primary"> <FaUserCog/> Execute</button>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col className="grid-div" lg={12} md={12}>
                                        <Table  bordered hover>
                                            <thead>
                                            <tr className="grid-col-head bg-light">
                                                <th>#</th>
                                                <th>User CIF</th>
                                                <th>User Mobile</th>
                                                <th>User Pass</th>
                                                <th>RM CIF</th>
                                                <th>RM Branch</th>
                                                <th>RM Mobile</th>
                                                <th>R.U.Type</th>
                                                <th>C.Percentage</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {TableRows}
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>

                {this.UserCreatedAlert()}




            </Fragment>
        );
    }
}

export default withRouter(BulkUserAdd);