import React, {Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {HiOutlineViewGridAdd} from "react-icons/all";
import "react-contexify/dist/ReactContexify.css";
import {Link} from "react-router-dom";
const ReferenceListEmpty = (props) => {
    return (
        <Fragment>
            <Container fluid={true} className="content-body m-0">
                <Row className=" p-0 m-0 ">
                    <Col className="m-0 p-0" md={12} lg={12} sm={12} xs={12}>
                        <Container className="content-card " fluid={true}>

                            <Row className="m-0 p-0">
                                <Col className="p-1" md={2} sm={2} lg={2} xs={2}>
                                    <h5 className="content-title">Reference List (0)</h5>
                                </Col>
                                <Col className=" p-1" md={4} sm={4} lg={4} xs={4}>
                                    <div className="input-group">
                                        <input   placeholder="Search.." type="text" className="form-control w-60"/>
                                        <select className="form-control w-40 form-select" >
                                            <option value="Name">Name</option>
                                            <option value="Mobile">Mobile</option>
                                            <option value="RM">RM Name</option>
                                            <option value="RMCIF">RM CIF</option>
                                        </select>
                                    </div>
                                </Col>
                                <Col className="p-1" md={2} sm={2} lg={2} xs={2}>
                                    <Link to="/ReferenceAdd" className="btn btn-outline-primary"><HiOutlineViewGridAdd/> Create New</Link>
                                </Col>
                            </Row>

                            <hr className="content-title-hr"/>

                            <Row className="grid-row-head  ">
                                <Col className="grid-col-head-first" md={1} lg={1}>
                                    No
                                </Col>
                                <Col className="grid-col-head " md={2} lg={2}>
                                    Name
                                </Col>
                                <Col className="grid-col-head" md={2} lg={2}>
                                    Phone
                                </Col>
                                <Col className="grid-col-head" md={3} lg={3}>
                                    CIF
                                </Col>
                                <Col className="grid-col-head" md={2} lg={2}>
                                    RM
                                </Col>
                                <Col className="grid-col-head" md={2} lg={2}>
                                    RM CIF
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};
export default ReferenceListEmpty;