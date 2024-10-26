<template>
  <div>
    <div class="d-flex align-items-center">
      <div class="m-2">
        <input
          type="text"
          class="form-control"
          placeholder="名稱"
          v-model="searchObj.hosName"
        />
      </div>
      <div class="m-2">
        <input
          type="text"
          class="form-control"
          placeholder="編號"
          v-model="searchObj.hosCode"
        />
      </div>
      <div class="m-2">
        <button class="btn btn-success" @click="searchByCondition()">
          Search
        </button>
      </div>
    </div>
  </div>
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">醫院名稱</th>
          <th scope="col">代號</th>
          <th scope="col">狀態</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(h, idx) in data" :key="idx">
          <th scope="row">{{ idx + 1 }}</th>
          <td>{{ h.hosName }}</td>
          <td>{{ h.hosCode }}</td>
          <td>{{ h.status === 1 ? "可用" : "不可用" }}</td>
          <td>
            <button
              type="button"
              class="btn btn-danger"
              data-bs-toggle="modal"
              :data-bs-target="'#modal-' + idx"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-for="(h, idx) in data"
      :key="idx"
      class="modal fade"
      :id="'modal-' + idx"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Notification
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">It will be deleted. Are you sure?</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              No
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteByIdAndReder(h.id)"
              data-bs-dismiss="modal"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- pagination -->
  <nav aria-label="...">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: currentPage == 1 }">
        <button class="page-link" @click="prevPage()">
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>

      <li class="page-item" v-for="n in totalPages">
        <button
          class="page-link"
          :class="{ active: currentPage == n }"
          @click="searchByCondition(n)"
        >
          {{ n }}
        </button>
      </li>

      <li class="page-item">
        <button
          class="page-link"
          :class="{ disabled: currentPage == totalPages }"
          @click="nextPage()"
        >
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
export default {
  name: "List",
};
</script>

<script lang="ts" setup>
import { reactive, ref, toRefs } from "vue";
import useHopsiptal from "../hooks/useHopsiptal";

const limit = ref(2);
let searchObj = reactive({
  hosName: "",
  hosCode: "",
});
const { pagination, search, removeById } = useHopsiptal();
const { currentPage, data, totalPages } = toRefs(pagination);

function prevPage() {
  if (currentPage.value === 1) return;
  search(currentPage.value - 1, limit.value, searchObj);
}

function nextPage() {
  if (currentPage.value === totalPages.value) return;
  search(currentPage.value + 1, limit.value, searchObj);
}

// default search first page
function searchByCondition(page: number = 1) {
  search(page, limit.value, searchObj);
}

async function deleteByIdAndReder(id: number) {
  await removeById(id);
  searchByCondition();
}
</script>

<style scoped>
.table {
  --bs-table-bg: none;
}
.pagination {
  --bs-pagination-border-radius: 50%;
  --bs-pagination-active-bg: skyblue;
  --bs-pagination-border-color: none;
}
</style>
