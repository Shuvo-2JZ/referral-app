import React, {Component, Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import { FiTrash2, HiOutlineViewGridAdd, IoDocumentTextOutline} from "react-icons/all";
import {Link} from "react-router-dom";
import {DocListServices} from "../../APIServices/DocListServices";
import Swal from "sweetalert2";
import {ErrorToast, SuccessToast} from "../../helper/FormHelper";
import {DocDeleteServices} from "../../APIServices/DocDeleteServices";
import {withRouter} from "react-router-dom";
import ContentScreenLoader from "../common/contentScreenLoader";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
class DocumentsList extends Component {

    constructor(props) {
        super(props);
        this.state={
            DocList:null,
        }
    }


    componentDidMount() {
        DocListServices().then((res)=>{
            this.setState({DocList:res})
        })
    }

    DeletePopUp=(id)=>{
        Swal.fire({
            showClass: {
                popup: ' animated fadeIn'
            },
            html: '<div class="w-100 text-center">'+
                '<h3 class="content-title-lg mt-4 mb-2">Do you want to delete ?</h3>'+
                '<p>Once delete, you can not revert it back.</p> '+
                '</div>',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6777EF',
        }).then((result) => {
            if (result.isConfirmed) {
                DocDeleteServices(id).then((res)=>{
                    if(res==1){
                        SuccessToast("Delete Successful")
                        this.props.history.push("/DocumentsList")
                    }
                    else {
                        ErrorToast("Request Fail ! Try Again")
                    }
                })

            }
        })
    }

    render() {

        if (this.state.DocList === null) {
            return (
                <Fragment>
                    <ContentScreenLoader/>
                </Fragment>
            )
        }

        else {
            let DocListView=<span/>
            DocListView=this.state.DocList.map((list,i)=>{
                return(

                    <div className="list-group-item d-flex justify-content-between align-items-center">
                        <h6 className="doc-list-text"> { ReactHtmlParser(list['docName'])}</h6>
                        <span className="badge badge-primary badge-pill"> <button onClick={this.DeletePopUp.bind(this,list['docID'])} className="btn btn-light text-danger"><FiTrash2/></button></span>
                    </div>

                )
            })
            return (
                <Fragment>
                    <Container fluid={true} className="content-body m-0">
                        <Row className=" p-0 m-0 ">
                            <Col className="m-0 p-0" md={12} lg={12} sm={12} xs={12}>
                                <Container className="content-card " fluid={true}>
                                    <Row className="d-flex justify-content-center">
                                        <Col className="align-self-centers" >
                                            <h5  className="content-title"> Document List  ({this.state.DocList.length})   <Link to="/DocumentsAdd"  className="btn btn-sm btn-light mx-2"><HiOutlineViewGridAdd/> Add new  </Link></h5>
                                        </Col>
                                    </Row>
                                    <hr className="content-title-hr"/>

                                    <Row>
                                        <Col className="grid-div p-0 m-0" md={12} xs={12} sm={12} lg={12}>
                                            <div className="list-group p-0 m-0 list-group-flush">

                                                {DocListView}
                                            </div>
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
}

export default withRouter(DocumentsList);