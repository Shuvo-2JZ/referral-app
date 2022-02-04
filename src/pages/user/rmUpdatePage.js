import React, {Component, Fragment} from 'react';
import {getLoginStatus} from "../../helper/sessionHelper";
import {Redirect} from "react-router-dom";
import MasterLayout from "../../components/masterLayout/masterLayout";
import RmUpdate from "../../components/user/rmUpdate";

class RmUpdatePage extends Component {
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
                    <RmUpdate/>
                </MasterLayout>
            </Fragment>
        );
    }
}

export default RmUpdatePage;