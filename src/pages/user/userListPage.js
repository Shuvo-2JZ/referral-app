import React, { Component } from "react";
import MasterLayout from "../../components/masterLayout/masterLayout";
import UserList from "../../components/user/userList";
import { UserListServices } from "../../APIServices/UserListServices";
import UserListEmpty from "../../components/user/userListEmpty";
import ContentScreenLoader from "../../components/common/contentScreenLoader";
import { getLoginStatus } from "../../helper/sessionHelper";
import { Redirect } from "react-router-dom";

class UserListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ItemList: null,
    };
  }

  CheckLogin = () => {
    if (getLoginStatus() !== "YES") {
      return <Redirect to="/login" />;
    }
  };

  // getting the list data
  componentDidMount() {
    UserListServices().then((res) => {
      this.setState({ ItemList: res });
    });
  }

  render() {
    let ItemList = this.state.ItemList;
    if (ItemList === null) {
      return (
        <MasterLayout>
          {this.CheckLogin()}
          <ContentScreenLoader />
        </MasterLayout>
      );
    } else if (ItemList.length === 0) {
      return (
        <MasterLayout>
          {this.CheckLogin()}
          <UserListEmpty />
        </MasterLayout>
      );
    } else {
      return (
        <MasterLayout>
          {this.CheckLogin()}
          <UserList ItemList={this.state.ItemList} />
        </MasterLayout>
      );
    }
  }
}

export default UserListPage;
