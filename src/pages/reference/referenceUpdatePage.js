import React, {Component, Fragment} from 'react';
import MasterLayout from "../../components/masterLayout/masterLayout";
import ReferenceUpdate from "../../components/reference/referenceUpdate";
import {getLoginStatus} from "../../helper/sessionHelper";
import {Redirect} from "react-router-dom";

class ReferenceUpdatePage extends Component {
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
                    <ReferenceUpdate/>
                </MasterLayout>
            </Fragment>
        );
    }
}

export default ReferenceUpdatePage;