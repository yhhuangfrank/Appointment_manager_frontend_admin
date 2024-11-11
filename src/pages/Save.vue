<template>
  <form class="mx-auto" style="width: 500px">
    <div class="mb-3">
      <label class="form-label">Name</label>
      <input type="text" class="form-control" v-model="hosName" />
    </div>
    <div class="mb-3">
      <label class="form-label">Code</label>
      <input type="text" class="form-control" v-model="hosCode" />
    </div>
    <div class="mb-3">
      <label class="form-label">Level</label>
      <select
        class="form-select"
        aria-label="select"
        v-model="dictCode"
        @change="changeHandler"
      >
        <option v-for="lvl in levels" :key="lvl.id" :value="lvl.id">
          {{ lvl.name }}
        </option>
      </select>
    </div>

    <button type="button" class="btn btn-primary" @click="saveHandler()">
      Save
    </button>
  </form>
</template>

<script lang="ts">
export default {
  name: "Save",
};
</script>

<script lang="ts" setup>
import { onMounted, reactive, toRefs } from "vue";
import useHospital from "../hooks/useHopsiptal";
import useCommon from "../hooks/useCommon";
import { useRouter, useRoute } from "vue-router";
import { Common } from "../types/Common";

const { saveHospital, getHospitalById } = useHospital();
const { getCommonData } = useCommon();
const router = useRouter();
const route = useRoute();
const hospital = reactive({ id: 0, hosName: "", hosCode: "", dictCode: "" });
let { id, hosName, hosCode, dictCode } = toRefs(hospital);
const { params } = toRefs(route);
const levels: Common[] = reactive([]);

async function saveHandler() {
  if (id.value || (hosName.value && hosCode.value)) {
    await saveHospital(hospital);
  }
  router.push({
    path: "/hospital/list",
  });
}

function changeHandler(e: any) {
  dictCode.value = e.target.value;
}

onMounted(async () => {
  if (params.value.id) {
    const hos = await getHospitalById(params.value.id as string);
    Object.assign(hospital, hos);
  }
  const data = await getCommonData(1);
  data.forEach((d: Common) => levels.push(d));
});
</script>

<style scoped></style>
