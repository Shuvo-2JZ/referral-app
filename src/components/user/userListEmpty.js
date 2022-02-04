import React, { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { HiOutlineViewGridAdd } from "react-icons/all";
import "react-contexify/dist/ReactContexify.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

const UserListEmpty = (props) => {
  return (
    <Fragment>
      <Container fluid={true} className="content-body m-0">
        <Row className=" p-0 m-0 ">
          <Col className="m-0 p-0" md={12} lg={12} sm={12} xs={12}>
            <Container className="content-card " fluid={true}>
              <Row className="m-0 p-0">
                <Col
                  className="p-1 align-self-center"
                  md={2}
                  sm={2}
                  lg={2}
                  xs={2}
                >
                  <h5 className="content-title">User List (0)</h5>
                </Col>
                <Col
                  className=" p-1 align-self-center"
                  md={4}
                  sm={4}
                  lg={4}
                  xs={4}
                >
                  <div className="input-group">
                    <input
                      placeholder="Search.."
                      type="text"
                      className="form-control form-control-sm w-50"
                    />
                    <select className="form-control w-50 form-select form-control-sm">
                      <option value="fullName">Full Name</option>
                      <option value="mobileNo">User Mobile</option>
                      <option value="rmcif">RM CIF</option>
                    </select>
                  </div>
                </Col>

                <Col
                  className="p-1 align-self-center"
                  md={2}
                  sm={2}
                  lg={2}
                  xs={2}
                >
                  <Link to="/UserAdd" className="btn  btn-light">
                    <HiOutlineViewGridAdd /> Create New
                  </Link>
                </Col>
              </Row>

              <hr className="content-title-hr" />

              <Row className="grid-row-head  ">
                <Col
                  className="grid-col-head-first align-self-center"
                  md={1}
                  lg={1}
                >
                  No
                </Col>
                <Col className="grid-col-head align-self-center " md={3} lg={3}>
                  Full Name
                </Col>
                <Col className="grid-col-head align-self-center" md={3} lg={3}>
                  User Phone
                </Col>
                <Col className="grid-col-head align-self-center" md={3} lg={3}>
                  RM CIF
                </Col>
                <Col className="grid-col-head align-self-center" md={2} lg={2}>
                  User Reference
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default withRouter(UserListEmpty);
