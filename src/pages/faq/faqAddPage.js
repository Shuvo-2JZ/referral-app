import React, {Component, Fragment} from 'react';
import MasterLayout from "../../components/masterLayout/masterLayout";
import FaqAdd from "../../components/faq/faqAdd";
import {getLoginStatus} from "../../helper/sessionHelper";
import {Redirect} from "react-router-dom";

class FaqAddPage extends Component {
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
                    <FaqAdd/>
                </MasterLayout>
            </Fragment>
        );
    }
}

export default FaqAddPage;