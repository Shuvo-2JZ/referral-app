import axios from "axios";
export function UserDeleteServices(UserRegID){
    let URL=process.env.REACT_APP_BASEURL+"UserManage/DeleteUser?UserRegID="+UserRegID;
    return  axios.get(URL).then((res)=>{
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