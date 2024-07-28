<script lang="ts" setup>
const loading = ref(false);
const krPost = async () => {
  loading.value = true;
  fetch("/api/galaxyS7/kr", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
<template>
  <Button size="xs" variant="destructive" @click="krPost">
    <template v-if="loading">loading...</template>
    <template v-else>kr 등록</template>
  </Button>
</template>
