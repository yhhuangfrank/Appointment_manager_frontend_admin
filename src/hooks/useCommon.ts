import axios from "axios";

const BASE_URL = "http://localhost:8202/admin/cmn/dict";

export default function () {
  async function getCommonData(id: number) {
    const res = await axios.get(`${BASE_URL}/getChildrenData/${id}`);
    return res.data.data;
  }

  return {
    getCommonData,
  };
}
