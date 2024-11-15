<template>
  <div>
    <div class="d-flex align-items-center">
      <div class="m-2">
        <input
          type="text"
          class="form-control"
          placeholder="Name"
          v-model="searchObj.hosName"
        />
      </div>
      <div class="m-2">
        <input
          type="text"
          class="form-control"
          placeholder="Code"
          v-model="searchObj.hosCode"
        />
      </div>
      <div class="m-2">
        <button class="btn btn-success" @click="searchHandler()">Search</button>
      </div>
    </div>
  </div>
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Code</th>
          <th scope="col">Level</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(h, idx) in data" :key="idx">
          <th scope="row">{{ idx + 1 }}</th>
          <td>{{ h.hosName }}</td>
          <td>{{ h.hosCode }}</td>
          <td>{{ h.level }}</td>
          <td>{{ h.status === 1 ? "Available" : "Unavailable" }}</td>
          <td>
            <button
              type="button"
              class="btn btn-danger mx-2"
              data-bs-toggle="modal"
              :data-bs-target="'#modal-' + idx"
            >
              Delete
            </button>
            <button
              v-if="h.status === 1"
              type="button"
              class="btn btn-primary mx-2"
              @click="updateStatusHandler(h.id, 0)"
            >
              Lock
            </button>
            <button
              v-else
              type="button"
              class="btn btn-secondary mx-2"
              @click="updateStatusHandler(h.id, 1)"
            >
              Unlock
            </button>
            <button
              type="button"
              class="btn btn-info mx-2"
              @click="editHandler(h.id)"
            >
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- pagination -->
  <nav aria-label="...">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: currentPage == 1 }">
        <button class="page-link" @click="prevPageHandler()">
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>

      <li class="page-item" v-for="n in totalPages">
        <button
          class="page-link"
          :class="{ active: currentPage == n }"
          @click="searchHandler(n)"
        >
          {{ n }}
        </button>
      </li>

      <li class="page-item">
        <button
          class="page-link"
          :class="{ disabled: currentPage == totalPages }"
          @click="nextPageHandler()"
        >
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
    </ul>
  </nav>

  <!-- Modal -->
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
          <h1 class="modal-title fs-5" id="exampleModalLabel">Notification</h1>
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
            @click="deleteHandler(h.id)"
            data-bs-dismiss="modal"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "List",
};
</script>

<script lang="ts" setup>
import { reactive, ref, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
import useHopsiptal from "../hooks/useHopsiptal";

const router = useRouter();
const limit = ref(2);
let searchObj = reactive({
  hosName: "",
  hosCode: "",
});
const { pagination, search, removeById, updateStatus } = useHopsiptal();
const { currentPage, data, totalPages } = toRefs(pagination);

function prevPageHandler() {
  if (currentPage.value === 1) return;
  search(currentPage.value - 1, limit.value, searchObj);
}

function nextPageHandler() {
  if (currentPage.value === totalPages.value) return;
  search(currentPage.value + 1, limit.value, searchObj);
}

// default search first page
function searchHandler(page: number = 1) {
  search(page, limit.value, searchObj);
}

async function deleteHandler(id: string) {
  await removeById(id);
  searchHandler();
}

function updateStatusHandler(id: string, status: number) {
  data.value.forEach((h) => {
    if (h.id === id) {
      h.status = status;
    }
  });

  updateStatus(id, status);
}

function editHandler(id: string) {
  router.push({
    name: "edit_hospital",
    params: { id },
  });
}

onMounted(() => {
  // default search, page = 1
  search(1, 2, null);
});
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
