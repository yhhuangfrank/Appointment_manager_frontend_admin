<template>
  <div class="accordion" id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          Hopsital
        </button>
      </h2>
      <div
        id="collapseOne"
        class="accordion-collapse collapse show"
        data-bs-parent="#accordionExample"
      >
        <div
          class="accordion-body d-grid btn text-start"
          @click="showHosList()"
        >
          Hospital list
        </div>
        <div
          class="accordion-body d-grid btn text-start"
          @click="showAddForm()"
        >
          Add a hosptial
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseTwo"
          aria-expanded="false"
          aria-controls="collapseTwo"
        >
          Common
        </button>
      </h2>
      <div
        id="collapseTwo"
        class="accordion-collapse collapse"
        data-bs-parent="#accordionExample"
      >
        <div
          class="accordion-body d-grid btn text-start"
          @click="showCommonDetail()"
        >
          Detail
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseThree"
          aria-expanded="false"
          aria-controls="collapseThree"
        >
          Schedule
        </button>
      </h2>
      <div
        id="collapseThree"
        class="accordion-collapse collapse"
        data-bs-parent="#accordionExample"
      >
        <div
          class="accordion-body d-grid btn text-start"
          @click="showSchedule()"
        >
          Schedule detail
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();

function showHosList() {
  router.push({
    path: "/hospital/list",
  });
}

function showAddForm() {
  router.push({
    path: "/hospital/add",
  });
}

function showCommonDetail() {
  router.push({
    path: "/cmn",
  });
}

function showSchedule() {
  router.push({
    path: "/schedule",
  });
}
</script>

<script lang="ts">
export default {
  name: "Menu",
};
</script>

<style scoped>
.accordion {
  --bs-accordion-bg: none;
  --bs-accordion-btn-color: none;
  --bs-accordion-btn-bg: none;
  /* --bs-accordion-active-bg: none; */
  --bs-accordion-border-color: none;
}

.btn {
  border-radius: 0%;
}
</style>
