import axios from "axios";
import { reactive } from "vue";
import { Hospital } from "../types/Hostpital";
import { Pagination } from "../types/Pagination";

const BASE_URL = "http://localhost:8201/admin/hosp/hospitalSettings";

export default function () {
  const pagination: Pagination<Hospital> = reactive({
    currentPage: 1,
    data: [],
    totalPages: 0,
  });

  async function search(page: number, limit: number, request: any) {
    let res;
    if (request) {
      res = await axios.post(`${BASE_URL}/search/${page}/${limit}`, request);
    } else {
      res = await axios.post(`${BASE_URL}/search/${page}/${limit}`);
    }

    const { content, totalPages } = res.data.data;

    Object.assign(pagination, {
      currentPage: page,
      totalPages,
      data: content,
    });
  }

  async function removeById(id: number) {
    await axios.delete(`${BASE_URL}/${id}`);
  }

  async function updateStatus(id: number, status: number) {
    await axios.put(`${BASE_URL}/update/${id}/${status}`);
  }

  async function saveHospital(hospital: any) {
    await axios.post(`${BASE_URL}/`, hospital);
  }

  async function getHospital(id: number) {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data.data;
  }

  return {
    pagination,
    search,
    removeById,
    updateStatus,
    saveHospital,
    getHospital,
  };
}
