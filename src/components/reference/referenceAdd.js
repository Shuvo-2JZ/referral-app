import React, {Component, Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import back from '../../assets/images/back.svg'
import {Link} from "react-router-dom";

class ReferenceAdd extends Component {
    render() {
        return (
            <Fragment>
                <Container fluid={true} className="content-body m-0">
                    <Row className=" p-0 m-0 ">
                        <Col className="m-0 p-0" md={12} lg={12} sm={12} xs={12}>
                            <Container className="content-card " fluid={true}>
                                <Row>
                                    <Col md={12} sm={12} xs={12} lg={12}>
                                         <Link to="/ReferenceList" className="content-title "> <img className="back-btn" src={back}/>  Create Reference</Link>
                                    </Col>
                                </Row>
                                <hr className="content-title-hr"/>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default ReferenceAdd;