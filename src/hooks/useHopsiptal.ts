import axios from "axios";
import { onMounted, reactive } from "vue";
import { Hospital } from "../types/Hostpital";
import { Pagination } from "../types/Pagination";

const BASE_URL = "http://localhost:8201/admin/hosp/hospitalSettings";

export default function () {
  const pagination: Pagination<Hospital> = reactive({
    currentPage: 1,
    data: [],
    totalPages: 0,
  });

  // async function getList() {
  //   const result = await axios.get(`${BASE_URL}/all`);
  //   result.data.data.forEach((h: Hospital) => {
  //     list.push(h);
  //   });
  // }

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

  onMounted(() => {
    // default search, page = 1
    search(1, 2, null);
  });

  return { pagination, search, removeById };
}
