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
      <ScheduleInfo
        :hosCode="currentHosCode"
        :currentPage="currentPage"
        :totalPages="totalPages"
        :scheduleList="scheduleList"
        :searchByPage="changeScheduleDatesByCode"
        :clickHandler="getScheduleDetail"
        :detailList="scheduleDetailList"
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
import useSchedule from "../hooks/useSchedule";
import { Hospital } from "../types/Hostpital";
import ScheduleInfo from "../components/ScheduleInfo.vue";
import { ScheduleRule } from "../types/ScheduleRule";
import { ScheduleDetail } from "../types/ScheduleDetail";

const hosList: Hospital[] = reactive([]);
let currentHosCode = ref("hosCode");
let hosName = ref("");
let currentPage = ref(1);
let totalPages = ref(0);
let scheduleList: ScheduleRule[] = reactive([]);
let scheduleDetailList: ScheduleDetail[] = reactive([]);
// let limit = ref(1);
const { getAllHosIdAndName } = useHopsiptal();
const { getScheduleByHosCode, getDetailByHosCodeAndWorkDate } = useSchedule();

async function changeScheduleDatesByCode(
  code: string,
  page: number = 1,
  limit: number = 1
) {
  currentHosCode.value = code;
  const res = await getScheduleByHosCode(page, limit, code);
  totalPages.value =
    res.total % limit === 0
      ? Math.floor(res.total / limit)
      : Math.floor(res.total / limit) + 1;
  hosName = res.hosName;
  currentPage.value = page;
  clearSchedule();
  clearScheduleDetail();
  res.scheduleRuleList.forEach((sr: ScheduleRule) => scheduleList.push(sr));
}

async function getScheduleDetail(hosCode: string, workDate: string) {
  const res = await getDetailByHosCodeAndWorkDate(hosCode, workDate);
  clearScheduleDetail();
  res.forEach((sd: ScheduleDetail) => scheduleDetailList.push(sd));
}

function clearSchedule() {
  for (let i = 0; i <= scheduleList.length; i++) {
    scheduleList.pop();
  }
}

function clearScheduleDetail() {
  for (let i = 0; i <= scheduleDetailList.length; i++) {
    scheduleDetailList.pop();
  }
}

onMounted(async () => {
  const res = await getAllHosIdAndName();
  res.forEach((hos: Hospital) => hosList.push(hos));
  await changeScheduleDatesByCode(hosList[0].hosCode);
  await getScheduleDetail(hosList[0].hosCode, scheduleList[0].workDate);
});
</script>

<style scoped>
.list-group-item {
  cursor: pointer;
  --bs-list-group-active-bg: skyblue;
  --bs-list-group-active-border-color: skyblue;
}
</style>
