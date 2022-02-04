import axios from "axios";
export function ReferralDeleteServices(id){
    let URL=process.env.REACT_APP_BASEURL+"ReferralManage/DeleteRef?ReferralID="+id;
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