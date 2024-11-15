<template>
  <!-- pagination -->
  <nav v-show="scheduleList.length" aria-label="..." class="my-2">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <button
          class="page-link"
          @click="searchByPage(hosCode, currentPage - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>

      <li class="page-item" v-for="n in totalPages">
        <button
          class="page-link"
          :class="{ active: currentPage === n }"
          @click="searchByPage(hosCode, n)"
        >
          {{ n }}
        </button>
      </li>

      <li class="page-item">
        <button
          class="page-link"
          :class="{ disabled: currentPage === totalPages }"
          @click="searchByPage(hosCode, currentPage + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
    </ul>
  </nav>

  <div
    v-for="data in scheduleList"
    class="card"
    style="width: 18rem"
    @click="clickHandler(hosCode, data.workDate)"
  >
    <div class="card-body">
      <h5 class="card-title">{{ data.workDate }}-{{ data.dayOfWeek }}</h5>
      <p class="card-text">
        current status: {{ data.availableCount }} / {{ data.maxCount }}
      </p>
      <span># doctors: {{ data.docCount }}</span>
    </div>
  </div>

  <div v-show="detailList.length" class="mt-2">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">AvailableCount</th>
          <th scope="col">MaxCount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(detail, idx) in detailList" :key="idx">
          <th scope="row">{{ idx + 1 }}</th>
          <td>
            {{ detail.docName }}
          </td>
          <td>
            {{ detail.availableCount }}
          </td>
          <td>
            {{ detail.maxCount }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
export default {
  name: "ScheduleInfo",
};
</script>

<script lang="ts" setup>
defineProps([
  "hosCode",
  "currentPage",
  "totalPages",
  "scheduleList",
  "searchByPage",
  "clickHandler",
  "detailList",
]);
</script>

<style scoped>
.pagination {
  --bs-pagination-border-radius: 50%;
  --bs-pagination-active-bg: skyblue;
  --bs-pagination-border-color: none;
}
.card {
  cursor: pointer;
}
</style>
