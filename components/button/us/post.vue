<script lang="ts" setup>
const loading = ref(false);
const usPost = async () => {
  loading.value = true;
  fetch("/api/galaxyS7/us", {
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
  <Button size="xs" variant="destructive" @click="usPost">
    <template v-if="loading">loading...</template>
    <template v-else>us 등록</template>
  </Button>
</template>
