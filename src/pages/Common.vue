<template>
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Create Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, idx) in list" :key="idx">
          <th scope="row">{{ idx + 1 }}</th>
          <td>
            {{ data.name }}
          </td>
          <td>
            {{ data.createTime }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
export default {
  name: "Common",
};
</script>

<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import useCommon from "../hooks/useCommon";
import { Common } from "../types/Common";

const { getCommonData } = useCommon();
const list: Common[] = reactive([]);

onMounted(async () => {
  const data = await getCommonData(1);
  data.forEach((d: Common) => list.push(d));
});
</script>

<style scoped></style>
