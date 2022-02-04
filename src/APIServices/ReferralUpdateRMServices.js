import axios from "axios";

export function ReferralUpdateRMServices(activityJournalID,referralID,assignRFCIF,assignRMUserName){
    let URL=process.env.REACT_APP_BASEURL+"ReferralManage/UpdateRefRM";
    let PostBody={
        "ActivityJournalID":activityJournalID,
        "ReferralID":referralID,
        "AssignRFCIF": assignRFCIF,
        "AssignRMUserName": assignRMUserName
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