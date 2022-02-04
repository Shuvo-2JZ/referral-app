import axios from "axios";
export function FaqDeleteServices(FaqID){
    let URL=process.env.REACT_APP_BASEURL+"FaqManage/DeleteFaq?id="+FaqID;
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