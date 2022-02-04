

class SessionHelper{

    setLoginStatus(){
        sessionStorage.setItem("login","YES")
    }
    getLoginStatus(){
        return sessionStorage.getItem("login")
    }

    setUserDetails=(UserDetails)=>{
        sessionStorage.setItem('UserDetails',JSON.stringify(UserDetails))
    }

    getUserDetails=()=>{
        let UserDetails= sessionStorage.getItem('UserDetails')
        return  JSON.parse(UserDetails);
    }

    setReferenceDetails=(ReferenceDetails)=>{
        sessionStorage.setItem('ReferenceDetails',JSON.stringify(ReferenceDetails))
    }

    getReferenceDetails=()=>{
        let ReferenceDetails= sessionStorage.getItem('ReferenceDetails')
        return  JSON.parse(ReferenceDetails);
    }


    removeLoginInfo(){
        sessionStorage.clear()
        localStorage.clear()
    }


}
export const {setReferenceDetails,getReferenceDetails,setLoginStatus,getLoginStatus,setUserDetails,getUserDetails,removeLoginInfo}=new SessionHelper();
