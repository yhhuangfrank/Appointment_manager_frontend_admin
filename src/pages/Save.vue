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
import { useRouter, useRoute } from "vue-router";

const { saveHospital, getHospital } = useHospital();
const router = useRouter();
const route = useRoute();
const hospital = reactive({ id: 0, hosName: "", hosCode: "" });
let { id, hosName, hosCode } = toRefs(hospital);
const { params } = toRefs(route);

async function saveHandler() {
  if (id.value) {
    await saveHospital(hospital);
  } else if (hosName.value && hosCode.value) {
    await saveHospital({ hosName: hosName.value, hosCode: hosCode.value });
  }
  router.push({
    path: "/hospital/list",
  });
}

onMounted(async () => {
  if (params.value.id) {
    const hos = await getHospital(parseInt(params.value.id as string));
    Object.assign(hospital, hos);
  }
});
</script>

<style scoped></style>
