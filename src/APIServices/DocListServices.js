import axios from "axios";
export function DocListServices() {
  // let URL = process.env.REACT_APP_BASEURL + "DocManage/DocList";

  let URL = "/data/documents/DocList.json";

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
