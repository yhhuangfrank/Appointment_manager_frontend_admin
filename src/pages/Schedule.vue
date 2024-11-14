<template>
  <div class="contiainer row mt-2">
    <div class="col-3 mx-auto">
      <div class="list-group">
        <div
          class="list-group-item list-group-item-action"
          v-for="(hos, idx) in hosList"
          :key="idx"
          :class="{ active: hos.hosCode === currentHosCode }"
          @click="changeScheduleDatesByCode(hos.hosCode)"
        >
          {{ hos.hosName }}
        </div>
      </div>
    </div>
    <div class="col-8 mx-auto">
      <ScheduleDate
        :hosCode="currentHosCode"
        :currentPage="currentPage"
        :totalPages="totalPages"
        :limit="limit"
        :dataList="dataList"
        :searchByPage="changeScheduleDatesByCode"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Schedule",
};
</script>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import useHopsiptal from "../hooks/useHopsiptal";
import useScheduleDetail from "../hooks/useSchedule";
import { Hospital } from "../types/Hostpital";
import ScheduleDate from "../components/ScheduleDate.vue";
import { ScheduleRule } from "../types/ScheduleRule";

const hosList: Hospital[] = reactive([]);
let currentHosCode = ref("hosCode");
let hosName = ref("");
let currentPage = ref(1);
let totalPages = ref(0);
let dataList: ScheduleRule[] = reactive([]);
let limit = ref(1);
const { getAllHosIdAndName } = useHopsiptal();
const { getScheduleByHosCode } = useScheduleDetail();

async function changeScheduleDatesByCode(code: string, page: number = 1) {
  currentHosCode.value = code;
  const res = await getScheduleByHosCode(page, limit.value, code);
  totalPages.value =
    res.total % limit.value === 0
      ? Math.floor(res.total / limit.value)
      : Math.floor(res.total / limit.value) + 1;
  hosName = res.hosName;
  currentPage.value = page;
  dataList = [];
  res.scheduleRuleList.forEach((sr: ScheduleRule) => dataList.push(sr));
}

onMounted(async () => {
  const res = await getAllHosIdAndName();
  res.forEach((hos: Hospital) => hosList.push(hos));
  await changeScheduleDatesByCode(hosList[0].hosCode);
});
</script>

<style scoped>
.list-group-item {
  cursor: pointer;
  --bs-list-group-active-bg: skyblue;
  --bs-list-group-active-border-color: skyblue;
}
</style>
