import axios from "axios";
export function RMUpdateService(UserRegID,RMCIF,RMBranchValue,RMNameValue,RMUserNameValue, RMMobileValue){
    let URL=process.env.REACT_APP_BASEURL+"UserManage/UpdateRM";
    let PostBody={
        "UserRegID":UserRegID,
        "RMCIF": RMCIF,
        "RMName": RMNameValue,
        "RMMobile": RMMobileValue,
        "RMUserName":RMUserNameValue,
        "RMBranch": RMBranchValue,
    }
    return  axios.post(URL,PostBody).then((res)=>{
        if(res.status===200){
            return  res.data
        }
        else {
            return 0;
        }
    }).catch((err)=>{
        console.log(err)
        return 0;
    })
}