import axios from "axios";

export function ReferralUpdateServices(activityJournalID,ReferralID,ReferralCIF,Need,Amount,Name,Mobile,Email,Occupation,City,Remarks,Status,AssignRFCIF){

    let URL=process.env.REACT_APP_BASEURL+"ReferralManage/UpdateRef";
    let PostBody={
        "ActivityJournalID":activityJournalID,
        "ReferralID":ReferralID,
        "ReferralCIF": ReferralCIF,
        "Need": Need,
        "Amount":Amount,
        "Name":Name,
        "Mobile": Mobile,
        "Email": Email,
        "Occupation": Occupation,
        "City": City,
        "Remarks": Remarks,
        "Status": Status,
        "AssignRFCIF": AssignRFCIF,
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