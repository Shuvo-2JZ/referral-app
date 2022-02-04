import axios from "axios";
export function FaqCreateServices(FaqQuestion,FaqAns){
    let URL=process.env.REACT_APP_BASEURL+"FaqManage/CreateFaq";
    let PostBody={
        "FaqQuestion": FaqQuestion,
        "FaqAns": FaqAns
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