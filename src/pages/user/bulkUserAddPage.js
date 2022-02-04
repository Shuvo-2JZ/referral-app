import React, {Component, Fragment} from 'react';
import MasterLayout from "../../components/masterLayout/masterLayout";
import {getLoginStatus} from "../../helper/sessionHelper";
import {Redirect} from "react-router-dom";
import BulkUserAdd from "../../components/user/bulkUserAdd";

class BulkUserAddPage extends Component {
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
                    <BulkUserAdd/>
                </MasterLayout>
            </Fragment>
        );
    }
}

export default BulkUserAddPage;