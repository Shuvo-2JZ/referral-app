import React, {Fragment,Component} from 'react';
import MasterLayout from "../../components/masterLayout/masterLayout";
import DocumentsList from "../../components/documents/documentsList";
import {getLoginStatus} from "../../helper/sessionHelper";
import {Redirect} from "react-router-dom";

class DocumentsListPage extends Component {

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
                    <DocumentsList/>
                </MasterLayout>
            </Fragment>
        );
    }
}

export default DocumentsListPage;