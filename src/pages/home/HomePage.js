import React, {Component, Fragment} from 'react';
import MasterLayout from "../../components/masterLayout/masterLayout";
import SummaryCounting from "../../components/home/SummaryCounting";
import {getLoginStatus} from "../../helper/sessionHelper";
import {Redirect} from "react-router-dom";

class HomePage extends Component {
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
                    <SummaryCounting/>
                </MasterLayout>
            </Fragment>
        );
    }
}

export default HomePage;