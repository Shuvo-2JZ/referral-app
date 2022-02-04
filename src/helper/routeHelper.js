import {Redirect} from "react-router";
import {getLoginStatus} from "./sessionHelper";
class RouteHelper{
    RouteRedirect(isRedirect,RedirectPath){
        if(isRedirect===true){
            return(
                <Redirect to={RedirectPath}/>
            )
        }
    }
    CheckLoginRedirect(){
        let LoginStatus=getLoginStatus();
        if(LoginStatus!=="YES"){
            return(
                <Redirect to="/login"/>
            )
        }

    }
}

export const{RouteRedirect,CheckLoginRedirect}=new RouteHelper();
