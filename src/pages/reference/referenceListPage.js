import React, { Component, Fragment } from "react";
import MasterLayout from "../../components/masterLayout/masterLayout";
import ReferenceList from "../../components/reference/referenceList";
import ReferenceListEmpty from "../../components/reference/referenceListEmpty";
import { ReferralListServices } from "../../APIServices/ReferralListServices";
import { UserListServices } from "../../APIServices/UserListServices";
import ContentScreenLoader from "../../components/common/contentScreenLoader";
import { getLoginStatus } from "../../helper/sessionHelper";
import { Redirect } from "react-router-dom";

class ReferenceListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ItemList: null,
      UserList: null,
    };
  }
  componentDidMount() {
    ReferralListServices().then((res) => {
      this.setState({ ItemList: res });
    });

    // getting the user list
    UserListServices().then((res) => {
      this.setState({ UserList: res });
    });
  }

  CheckLogin = () => {
    if (getLoginStatus() !== "YES") {
      return <Redirect to="/login" />;
    }
  };

  render() {
    let ItemList = this.state.ItemList;
    let UserList = this.state.UserList;

    if (ItemList === null || UserList === null) {
      return (
        <MasterLayout>
          {this.CheckLogin()}
          <ContentScreenLoader />
        </MasterLayout>
      );
    } else if (ItemList.length === 0 || UserList.length === 0) {
      return (
        <Fragment>
          <MasterLayout>
            {this.CheckLogin()}
            <ReferenceListEmpty />
          </MasterLayout>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <MasterLayout>
            {this.CheckLogin()}
            <ReferenceList
              ItemList={this.state.ItemList}
              UserList={this.state.UserList}
            />
          </MasterLayout>
        </Fragment>
      );
    }
  }
}

export default ReferenceListPage;
