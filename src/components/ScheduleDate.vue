<template>
  <!-- pagination -->
  <nav v-show="dataList.length" aria-label="..." class="my-2">
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

  <div v-for="data in dataList" class="card" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title">{{ data.workDate }}-{{ data.dayOfWeek }}</h5>
      <p class="card-text">
        current status: {{ data.availableCount }} / {{ data.maxCount }}
      </p>
      <span># doctors: {{ data.docCount }}</span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ScheduleDay",
};
</script>

<script lang="ts" setup>
defineProps([
  "hosCode",
  "limit",
  "currentPage",
  "totalPages",
  "dataList",
  "searchByPage",
]);
</script>

<style scoped>
.pagination {
  --bs-pagination-border-radius: 50%;
  --bs-pagination-active-bg: skyblue;
  --bs-pagination-border-color: none;
}
</style>
