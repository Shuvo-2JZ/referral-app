import React, {Component, Fragment} from 'react';
import MasterLayout from "../../components/masterLayout/masterLayout";
import {Container, Row} from "react-bootstrap";
import {getLoginStatus} from "../../helper/sessionHelper";
import {Redirect} from "react-router-dom";

class FaqUpdatePage extends Component {
    CheckLogin=()=>{
        if(getLoginStatus()!=="YES"){
            return(<Redirect to="/login"/>)
        }
    }
    render() {
        return (
            <Fragment>
                {this.CheckLogin()}
                <MasterLayout>
                    <Container fluid={true} className="content-body">
                        <Row className="animated fadeIn">

                        </Row>
                    </Container>
                </MasterLayout>
            </Fragment>
        );
    }
}

export default FaqUpdatePage;