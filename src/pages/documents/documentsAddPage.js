import React, {Fragment,Component} from 'react';
import MasterLayout from "../../components/masterLayout/masterLayout";
import DocumentsAdd from "../../components/documents/documentsAdd";
import {getLoginStatus} from "../../helper/sessionHelper";
import {Redirect} from "react-router-dom";

class DocumentsAddPage extends Component {

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
                    <DocumentsAdd/>
                </MasterLayout>

            </Fragment>
        );
    }
}

export default DocumentsAddPage;
