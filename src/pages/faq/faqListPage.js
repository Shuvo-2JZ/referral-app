import React, {Component, Fragment} from 'react';
import MasterLayout from "../../components/masterLayout/masterLayout";
import FaqList from "../../components/faq/faqList";
import {getLoginStatus} from "../../helper/sessionHelper";
import {Redirect} from "react-router-dom";

class FaqListPage extends Component {
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
                    <FaqList/>
                </MasterLayout>
            </Fragment>
        );
    }
}

export default FaqListPage;