import axios from "axios";
export function DocCreateServices(DocName) {
  let URL = process.env.REACT_APP_BASEURL + "DocManage/CreateDoc";

  let PostBody = {
    DocName: DocName,
  };
  return axios
    .post(URL, PostBody)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      } else {
        return 0;
      }
    })
    .catch((err) => {
      console.log(err);
      return 0;
    });
}
