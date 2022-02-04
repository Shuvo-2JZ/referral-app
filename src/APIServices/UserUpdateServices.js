import axios from "axios";
export function UserUpdateServices(
  UserRegID,
  UserRef,
  FullName,
  MobileNo,
  UserPass,
  UserDetails,
  RMCIF,
  RMBranchValue,
  RMNameValue,
  RMMobileValue,
  RMUserNameValue,
  ReferrerTypesValue,
  CommissionPercentageValue,
  BankAccNameValue,
  BankNameValue,
  BranchNameValue,
  RoutingNumberValue,
  BankAccNo,
  MFSAccTypeValue,
  MFSAccNoValue,
  InstitutionNameValue
) {
  let URL = process.env.REACT_APP_BASEURL + "UserManage/UpdateUser";
  let PostBody = {
    UserRegID: UserRegID,
    UserRef: UserRef,
    FullName: FullName,
    MobileNo: MobileNo,
    UserPass: UserPass,
    UserDetails: UserDetails,
    RMCIF: RMCIF,
    RMName: RMNameValue,
    RMMobile: RMMobileValue,
    RMUserName: RMUserNameValue,
    RMBranch: RMBranchValue,
    RefUserType: ReferrerTypesValue,
    CommissionPercentage: CommissionPercentageValue,
    BankAccName: BankAccNameValue,
    BankName: BankNameValue,
    BranchName: BranchNameValue,
    RoutingNo: RoutingNumberValue,
    BankAccNo: BankAccNo,
    RefUserInstitution: InstitutionNameValue,
    MFSAccType: MFSAccTypeValue,
    MFSAccNo: MFSAccNoValue,
  };
  return axios
    .post(URL, PostBody)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      } else {
        return 0;
      }
    })
    .catch((err) => {
      console.log(err);
      return 0;
    });
}
