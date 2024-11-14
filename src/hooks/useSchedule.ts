import axios from "axios";

const BASE_URL = "http://localhost:8201/admin/hosp/schedule";

export default function () {
  async function getScheduleByHosCode(
    page: number,
    limit: number,
    code: string
  ) {
    const res = await axios.get(
      `${BASE_URL}/getScheduleRule/${page}/${limit}/${code}`
    );
    return res.data.data;
  }

  return {
    getScheduleByHosCode,
  };
}
