import React, {Component, Fragment} from 'react';
import ReferenceUpdateRm from "../../components/reference/referenceUpdateRm";
import {getLoginStatus} from "../../helper/sessionHelper";
import {Redirect} from "react-router-dom";
import MasterLayout from "../../components/masterLayout/masterLayout";

class ReferenceUpdateRmPage extends Component {
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
                <ReferenceUpdateRm/>
                </MasterLayout>
            </Fragment>
        );
    }
}

export default ReferenceUpdateRmPage;