import axios from "axios";
export function FaqListServices() {
  // let URL=process.env.REACT_APP_BASEURL+"FaqManage/FaqList";

  let URL = "/data/faq/FaqList.json";
  return axios
    .get(URL)
    .then((res) => {
      if (res.status === 200) {
        if (res.data !== null) {
          return res.data;
        } else {
          return [];
        }
      } else {
        return [];
      }
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
}
