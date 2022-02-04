import cogoToast from "cogo-toast";

let EmailRegx = /\S+@\S+\.\S+/;
let OnlyNumberRegx = /^\d+\.?\d*$/;
let validFileExtensions = ["jpg", "JPG", "jpeg", "JPEG", "PNG", "png"];
let validURL = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
let MobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;


class FormHelper {
  IsURL(value) {
    return !validURL.test(value);
  }

  IsEmpty(value) {
    return value.length === 0;
  }

  IsUndefined(value) {
    console.log(value);
    return value === "undefined";
  }

  IsImageValid(imgExtension){
    return validFileExtensions.includes(imgExtension);
  }


  IsNumber(value) {
    return OnlyNumberRegx.test(value);
  }

  IsEmail(value) {
    return !EmailRegx.test(value);
  }


  IsMobile(value){
    return MobileRegx.test(value);
  }


  ErrorToast(msg) {
    cogoToast.error(msg, { position: "bottom-center" });
  }
  SuccessToast(msg) {
    cogoToast.success(msg, { position: "bottom-center" });
  }
  InfoToast(msg) {
    cogoToast.info(msg, { position: "bottom-center" });
  }
  LoadingToast(msg) {
    cogoToast.loading(msg, { position: "bottom-center" });
  }


   ErrorFocus(element) {
    try {
      element.focus();
      element.classList.add("form-error");
      setTimeout(() => {element.classList.remove("form-error")},1000);
    } catch (e) {
        console.log(err);
    }
  }


    SuccessFocus(element) {
        try {
            element.focus();
            element.classList.add("form-success");
            setTimeout(() => {element.classList.remove("form-success")},1000);
        } catch (err) {
            console.log(err);
        }
    }


    ShowSubmitLoading(submitElement, LoadingElement) {
    submitElement.classList.add("d-none");
    LoadingElement.classList.remove("d-none");
  }

    HideSubmitLoading(submitElement, LoadingElement) {
    submitElement.classList.remove("d-none");
    LoadingElement.classList.add("d-none");
  }
}

export const {
  LoadingToast,
  IsImageValid,
  ErrorToast,
  SuccessFocus,
  SuccessToast,
  InfoToast,
  ErrorFocus,
  IsEmpty,
  IsEmail,
  IsMobile,
  ShowSubmitLoading,
  HideSubmitLoading,
  IsNumber,
  IsUndefined,
  IsURL
} = new FormHelper();
