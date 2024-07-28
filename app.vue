<script setup lang="ts">
const step1 = ref("galaxyS7");
const step2 = ref("kr");
const step3 = ref("kosdaq");
const step4 = ref("all");

const url = ref("");
const dataList = ref([]);

watch([step1, step2, step3, step4], async () => {
  if (step2.value == "stockInfo") {
    url.value = `/api/${step1.value}/${step2.value}?country=${step3.value}&market=${step4.value}`;
  } else {
    url.value = `/api/${step1.value}/${step2.value}/${step3.value}${
      step4.value !== "all" ? "/" + step4.value : ""
    }`;
  }
  dataList.value = await fetch(url.value)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
});
</script>
<template>
  <div class="flex divide-x h-svh overflow-hidden">
    <div class="flex flex-col shrink-0 w-32 divide-y">
      <div class="p-1">db</div>
      <div class="p-1 flex flex-col gap-1">
        <Button
          size="xs"
          :variant="step1 === 'galaxyS7' ? 'default' : 'outline'"
          @click="step1 = 'galaxyS7'"
        >
          galaxyS7
        </Button>
        <div class="flex flex-col gap-1 pl-2" v-if="step1 === 'galaxyS7'">
          <Button
            size="xs"
            :variant="step2 === 'kr' ? 'default' : 'outline'"
            @click="
              step2 = 'kr';
              step3 = 'kosdaq';
              step4 = 'live';
            "
          >
            kr
          </Button>
          <div class="flex flex-col gap-1 pl-2" v-if="step2 == 'kr'">
            <ButtonKrPost />
            <Button
              size="xs"
              :variant="step3 === 'kosdaq' ? 'default' : 'outline'"
              @click="
                step3 = 'kosdaq';
                step4 = 'live';
              "
            >
              kosdaq
            </Button>
            <div class="flex flex-col gap-1 pl-2" v-if="step3 == 'kosdaq'">
              <Button
                size="xs"
                :variant="step4 === 'all' ? 'default' : 'outline'"
                @click="step4 = 'all'"
              >
                all
              </Button>
              <Button
                size="xs"
                :variant="step4 === 'last' ? 'default' : 'outline'"
                @click="step4 = 'last'"
              >
                last
              </Button>
              <Button
                size="xs"
                :variant="step4 === 'live' ? 'default' : 'outline'"
                @click="step4 = 'live'"
              >
                live
              </Button>
            </div>
            <Button
              size="xs"
              :variant="step3 === 'seoul' ? 'default' : 'outline'"
              @click="
                step3 = 'seoul';
                step4 = 'live';
              "
            >
              seoul
            </Button>
            <div class="flex flex-col gap-1 pl-2" v-if="step3 == 'seoul'">
              <Button
                size="xs"
                :variant="step4 === 'all' ? 'default' : 'outline'"
                @click="step4 = 'all'"
              >
                all
              </Button>
              <Button
                size="xs"
                :variant="step4 === 'last' ? 'default' : 'outline'"
                @click="step4 = 'last'"
              >
                last
              </Button>
              <Button
                size="xs"
                :variant="step4 === 'live' ? 'default' : 'outline'"
                @click="step4 = 'live'"
              >
                live
              </Button>
            </div>
          </div>
          <Button
            size="xs"
            :variant="step2 === 'us' ? 'default' : 'outline'"
            @click="
              step2 = 'us';
              step3 = 'nasdaq';
              step4 = 'live';
            "
          >
            us
          </Button>
          <div class="flex flex-col gap-1 pl-2" v-if="step2 == 'us'">
            <Button size="xs" variant="secondary">us 등록</Button>
            <ButtonUsPost />
            <Button
              size="xs"
              :variant="step3 === 'nasdaq' ? 'default' : 'outline'"
              @click="
                step3 = 'nasdaq';
                step4 = 'live';
              "
            >
              nasdaq
            </Button>
            <div class="flex flex-col gap-1 pl-2">
              <Button
                size="xs"
                :variant="step4 === 'all' ? 'default' : 'outline'"
                @click="step4 = 'all'"
              >
                all
              </Button>
              <Button
                size="xs"
                :variant="step4 === 'last' ? 'default' : 'outline'"
                @click="step4 = 'last'"
              >
                last
              </Button>
              <Button
                size="xs"
                :variant="step4 === 'live' ? 'default' : 'outline'"
                @click="step4 = 'live'"
              >
                live
              </Button>
            </div>
          </div>
          <Button
            size="xs"
            :variant="step2 === 'stockInfo' ? 'default' : 'outline'"
            @click="
              step2 = 'stockInfo';
              step3 = 'KR';
              step4 = 'Seoul';
            "
          >
            stock info
          </Button>
          <div class="flex flex-col gap-1 pl-2" v-if="step2 == 'stockInfo'">
            <Button
              size="xs"
              :variant="step3 === 'KR' ? 'default' : 'outline'"
              @click="
                step3 = 'KR';
                step4 = 'Seoul';
              "
            >
              KR
            </Button>
            <div class="flex flex-col gap-1 pl-2" v-if="step3 == 'KR'">
              <Button
                size="xs"
                :variant="step4 === 'Seoul' ? 'default' : 'outline'"
                @click="step4 = 'Seoul'"
              >
                Seoul
              </Button>
              <Button
                size="xs"
                :variant="step4 === 'KOSDAQ' ? 'default' : 'outline'"
                @click="step4 = 'KOSDAQ'"
              >
                KOSDAQ
              </Button>
            </div>
            <Button
              size="xs"
              :variant="step3 === 'US' ? 'default' : 'outline'"
              @click="
                step3 = 'US';
                step4 = 'NASDAQ';
              "
            >
              US
            </Button>
            <div class="flex flex-col gap-1 pl-2" v-if="step3 == 'US'">
              <Button
                size="xs"
                :variant="step4 === 'NASDAQ' ? 'default' : 'outline'"
                @click="step4 = 'NASDAQ'"
              >
                NASDAQ
              </Button>
            </div>
          </div>
        </div>
        <Button
          size="xs"
          :variant="step1 === 'investing' ? 'default' : 'outline'"
          @click="
            step1 = 'investing';
            step2 = 'kr';
            step3 = 'seoul';
          "
        >
          investing
        </Button>
        <div class="flex flex-col gap-1 pl-2" v-if="step1 === 'investing'">
          <Button
            size="xs"
            :variant="step2 === 'kr' ? 'default' : 'outline'"
            @click="
              step2 = 'kr';
              step3 = 'seoul';
            "
          >
            kr
          </Button>
          <div class="flex flex-col gap-1 pl-2" v-if="step2 == 'kr'">
            <Button
              size="xs"
              :variant="step3 === 'seoul' ? 'default' : 'outline'"
              @click="step3 = 'seoul'"
            >
              seoul
            </Button>
            <Button
              size="xs"
              :variant="step3 === 'kosdaq' ? 'default' : 'outline'"
              @click="step3 = 'kosdaq'"
            >
              kosdaq
            </Button>
          </div>
          <Button
            size="xs"
            :variant="step2 === 'us' ? 'default' : 'outline'"
            @click="
              step2 = 'us';
              step3 = 'nasdaq';
            "
          >
            us
          </Button>
          <div class="flex flex-col gap-1 pl-2" v-if="step2 == 'us'">
            <Button size="xs">nasdaq</Button>
          </div>
        </div>
        <Button
          size="xs"
          :variant="step1 === 'tradingview' ? 'default' : 'outline'"
          @click="step1 = 'tradingview'"
        >
          tradingview
        </Button>
        <div class="flex flex-col gap-1 pl-2" v-if="step1 === 'tradingview'">
          <Button
            size="xs"
            :variant="step2 === 'kr' ? 'default' : 'outline'"
            @click="step2 = 'kr'"
          >
            kr
          </Button>
          <Button
            size="xs"
            :variant="step2 === 'us' ? 'default' : 'outline'"
            @click="step2 = 'us'"
          >
            us
          </Button>
        </div>
      </div>
    </div>
    <div class="grow-[0] overflow-hidden h-full w-full divide-y">
      <div class="p-1 shrink-0">{{ url }}</div>
      <div class="grow-[0] overflow-auto bg-neutral-50">
        <Table class="whitespace-nowrap">
          <TableHeader>
            <TableRow>
              <TableHead
                v-for="filed in dataList.length > 0
                  ? Object.keys(dataList[0])
                  : []"
                class="px-2 py-1"
              >
                {{ filed }}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="(item, index) in dataList.slice(0, 100)"
              :key="index"
            >
              <!-- 각 invoice 객체의 키와 값을 순회합니다. -->
              <TableCell
                v-for="(value, field) in item"
                :key="field"
                class="px-2 py-1"
              >
                {{ value }}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
</template>
