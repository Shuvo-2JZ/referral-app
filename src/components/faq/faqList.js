import React, {Component, Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {AiOutlineQuestionCircle, FiTrash2, HiOutlineViewGridAdd, IoDocumentTextOutline} from "react-icons/all";
import {Link} from "react-router-dom";
import {FaqListServices} from "../../APIServices/FaqListServices";
import {ErrorToast, SuccessToast} from "../../helper/FormHelper";
import Swal from "sweetalert2";
import {FaqDeleteServices} from "../../APIServices/FaqDeleteServices";
import {withRouter} from "react-router-dom";
import ContentScreenLoader from "../common/contentScreenLoader";
class FaqList extends Component {



    constructor(props) {
        super(props);
        this.state={
            ItemList:null,
        }
    }

    componentDidMount() {
        this.setState({isLoading:""})
        FaqListServices().then((res)=> {
            this.setState({isLoading:"d-none"})
            this.setState({ItemList: res})
        })
    }



     DeletePopUp=(faqid)=>{
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
                FaqDeleteServices(faqid).then((res)=>{
                    if(res==1){
                        SuccessToast("Delete Successful")
                        this.props.history.push("/FaqList")
                    }
                    else {
                        ErrorToast("Request Fail ! Try Again")
                    }
                })

            }
        })
    }





render() {
    if (this.state.ItemList === null) {
        return (
            <Fragment>
                <ContentScreenLoader/>
            </Fragment>
        )
    } else {
        let FaqListView = <span/>
        FaqListView = this.state.ItemList.map((list, i) => {
            return (
                <div
                    className="list-group-item animated slideInUp py-2 list-group-item-action flex-column align-items-start ">
                    <div className="d-flex w-100 m-0 p-0 justify-content-between">
                        <h5 className="doc-list-text-lg mb-1"> <b>{list['faqQuestion']}</b></h5>
                        <button onClick={this.DeletePopUp.bind(this, list['faqID'])} className="btn btn-light text-danger"><FiTrash2/></button>
                    </div>
                    <small className="text-muted m-0 p-0">{list['faqAns']}</small>
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
                                        <h5 className="content-title"> FAQ List ({this.state.ItemList.length}) <Link
                                            to="/FaqAdd" className="btn btn-sm btn-light mx-2"><HiOutlineViewGridAdd/> Add
                                            new </Link></h5>
                                    </Col>
                                </Row>
                                <hr className="content-title-hr"/>

                                <Row>
                                    <Col className="grid-div p-0 m-0" md={12} xs={12} sm={12} lg={12}>
                                        <div className="list-group p-0 m-0 list-group-flush">
                                            {FaqListView}
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}
}
export default withRouter(FaqList);