import React, {Component, Fragment} from 'react';
import { Col, Container, Row} from "react-bootstrap";
import {SummaryCountingServices} from "../../APIServices/SummaryCountingServices";
import {Link} from "react-router-dom";

class SummaryCounting extends Component {

    constructor() {
        super();
        this.state={
            TotalUser:"",
            TotalRef:"",
            CurrentRef:""
        }
    }


    componentDidMount() {
        SummaryCountingServices().then((res)=>{
            this.setState({
                TotalUser:res['TotalUser'],
                TotalRef:res['TotalRef'],
                CurrentRef:res['CurrentRef']
            })
        })
    }


    render() {


        let TotalUser=this.state.TotalUser;
        let TotalRef=this.state.TotalRef;
        let CurrentRef=this.state.CurrentRef;
        let TotalRefDiv= <div className="spinner-grow shadow-sm text-primary" role="status"/>
        let TotalUserDiv= <div className="spinner-grow shadow-sm text-primary" role="status"/>
        let CurrentRefDiv= <div className="spinner-grow shadow-sm text-primary" role="status"/>
        if(TotalUser.length!==0){
            TotalUserDiv= <h5 className="count-number">{TotalUser}</h5>
            TotalRefDiv= <h5 className="count-number">{TotalRef}</h5>
            CurrentRefDiv= <h5 className="count-number">{CurrentRef}</h5>
        }

        return (
            <Fragment>
                <Container fluid={true} className="content-body">
                    <Row>
                        <Col md={3} sm={6} lg={3}>
                            <Link to="/UserList">
                                <div className="count-card animated fadeIn">
                                    {TotalUserDiv}
                                    <h5 className="count-title">Total Users</h5>
                                </div>
                            </Link>

                        </Col>
                        <Col md={3} sm={6} lg={3}>
                            <Link to="/ReferenceList">
                                <div className="count-card animated fadeIn">
                                    {CurrentRefDiv}
                                    <h5 className="count-title">Current Reference</h5>
                                </div>
                            </Link>
                        </Col>

                        <Col md={3} sm={6} lg={3}>
                            <Link to="/ReferenceList">
                                <div className="count-card animated fadeIn">
                                    {TotalRefDiv}
                                    <h5 className="count-title">Total Reference</h5>
                                </div>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default SummaryCounting;