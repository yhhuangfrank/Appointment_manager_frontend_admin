import axios from "axios";

const BASE_URL = "http://localhost/admin/cmn/dict";

export default function () {
  async function getCommonData(id: number) {
    const res = await axios.get(`${BASE_URL}/findChildrenData/${id}`);
    return res.data.data;
  }

  return {
    getCommonData,
  };
}
