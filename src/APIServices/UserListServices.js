import axios from "axios";
export function UserListServices() {
  // let URL=process.env.REACT_APP_BASEURL+"UserManage/UserList";

  let URL = "data/user/UserManage.json";
  return axios
    .get(URL)
    .then((res) => {
      if (res.status === 200) {
        if (res.data !== null) {
          return res.data;
        } else {
          return [];
        }
      } else {
        return [];
      }
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
}
