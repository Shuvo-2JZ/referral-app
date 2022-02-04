import axios from "axios";
export function BankListService() {
  // let URL=process.env.REACT_APP_BASEURL+"Settings/BankList";

  let URL = "/data/settings/BankList.json";
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
export function IDLCBranchListService() {
  // let URL = process.env.REACT_APP_BASEURL + "Settings/IDLCBranchList";

  let URL = "/data/settings/IDLCBranchList.json";
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
export function BranchListService(IndexID) {
  let URL =
    process.env.REACT_APP_BASEURL + "Settings/BranchList?IndexID=" + IndexID;
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

export function RoutingNoByBranch(BranchID) {
  let URL =
    process.env.REACT_APP_BASEURL + "Settings/RoutingNo?BranchID=" + BranchID;
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

export function RMDetailsByCIF(CIF) {
  let URL =
    process.env.REACT_APP_BASEURL + "Settings/RMDetailsByCIF?CIF=" + CIF;
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

export function UserDetailsByCIF(CIF) {
  let URL =
    process.env.REACT_APP_BASEURL + "Settings/UserDetailsByCIF?CIF=" + CIF;
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
