import React from 'react';
import loader from "../../assets/images/loader.svg";
const ContentScreenLoader = (props) => {
    return (
        <div className={props.isLoading+"  ProcessingDivContent"}>
            <div className="row p-0 m-0 d-flex justify-content-center">
                <div className="col-md-12 m-0 p-0 center-screen-content">
                    <img className="loader-size  " alt="loader" src={loader} />
                </div>
            </div>
        </div>
    );
};

export default ContentScreenLoader;
