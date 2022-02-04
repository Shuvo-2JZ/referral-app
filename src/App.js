import React, { Fragment } from "react";
import { HashRouter, Route, Switch} from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/loginPage";
import UserAddPage from "./pages/user/userAddPage";
import UserListPage from "./pages/user/userListPage";
import UserUpdatePage from "./pages/user/userUpdatePage";
import DocumentsListPage from "./pages/documents/documentsListPage";
import DocumentsUpdatePage from "./pages/documents/documentsUpdatePage";
import DocumentsAddPage from "./pages/documents/documentsAddPage";
import FaqAddPage from "./pages/faq/faqAddPage";
import FaqListPage from "./pages/faq/faqListPage";
import FaqUpdatePage from "./pages/faq/faqUpdatePage";
import ReferenceAddPage from "./pages/reference/referenceAddPage";
import ReferenceListPage from "./pages/reference/referenceListPage";
import ReferenceUpdatePage from "./pages/reference/referenceUpdatePage";
import RmUpdatePage from "./pages/user/rmUpdatePage";
import ReferenceUpdateRmPage from "./pages/reference/referenceUpdateRMPage";
import BulkUserAddPage from "./pages/user/bulkUserAddPage";

const App = () => {
        return (
            <Fragment>
                <HashRouter>
                    <Switch>
                        <Route exact path="/" render={(props) => <HomePage {...props} key={Date.now()} />}/>
                        <Route exact path="/login" render={(props) => <LoginPage {...props} key={Date.now()} />}/>

                        <Route exact path="/UserAdd" render={(props) => <UserAddPage {...props} key={Date.now()} />}/>
                        <Route exact path="/BulkUserAdd" render={(props) => <BulkUserAddPage {...props} key={Date.now()} />}/>
                        <Route exact path="/UserList" render={(props) => <UserListPage {...props} key={Date.now()} />}/>
                        <Route exact path="/UserUpdate" render={(props) => <UserUpdatePage {...props} key={Date.now()} />}/>

                        <Route exact path="/ChangeRM" render={(props) => <RmUpdatePage {...props} key={Date.now()} />}/>

                        <Route exact path="/DocumentsList" render={(props) => <DocumentsListPage {...props} key={Date.now()} />}/>
                        <Route exact path="/DocumentsUpdate" render={(props) => <DocumentsUpdatePage {...props} key={Date.now()} />}/>
                        <Route exact path="/DocumentsAdd" render={(props) => <DocumentsAddPage {...props} key={Date.now()} />}/>


                        <Route exact path="/FaqAdd" render={(props) => <FaqAddPage {...props} key={Date.now()} />}/>
                        <Route exact path="/FaqList" render={(props) => <FaqListPage {...props} key={Date.now()} />}/>
                        <Route exact path="/FaqUpdate" render={(props) => <FaqUpdatePage {...props} key={Date.now()} />}/>

                        <Route exact path="/ReferenceAdd" render={(props) => <ReferenceAddPage {...props} key={Date.now()} />}/>
                        <Route exact path="/ReferenceList" render={(props) => <ReferenceListPage {...props} key={Date.now()} />}/>
                        <Route exact path="/ReferenceUpdate" render={(props) => <ReferenceUpdatePage {...props} key={Date.now()} />}/>
                        <Route exact path="/ReferenceUpdateRM" render={(props) => <ReferenceUpdateRmPage {...props} key={Date.now()} />}/>
                    </Switch>
                </HashRouter>
            </Fragment>
        );
}
export default App;
