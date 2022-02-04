import React, {Component, Fragment} from 'react';
import MasterLayout from "../../components/masterLayout/masterLayout";
import ReferenceAdd from "../../components/reference/referenceAdd";
import {getLoginStatus} from "../../helper/sessionHelper";
import {Redirect} from "react-router-dom";

class ReferenceAddPage extends Component {
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
                    <ReferenceAdd/>
                </MasterLayout>
            </Fragment>
        );
    }
}

export default ReferenceAddPage;