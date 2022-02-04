import axios from "axios";
export function SummaryCountingServices() {
  // let URL=process.env.REACT_APP_BASEURL+"Dashboard/Count";

  let URL = "/data/summaryCount/DashboardCount.json";

  return axios
    .get(URL)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
