import { useScheduler } from "#scheduler";

export default defineNitroPlugin(() => {
  console.log("env", process.env.NODE_ENV);
  if (process.env.NODE_ENV == "production") {
    console.log("startScheduler");
    startScheduler();
  }
});

function startScheduler() {
  const scheduler = useScheduler();

  scheduler
    .run(async () => {
      console.log("10분 주기 실행");
      console.time("collection");
      try {
        await useCollection();
        console.timeEnd("collection");
      } catch (error) {
        console.error(error);
        console.timeEnd("collection");
      }
    })
    // 매분 실행하도록
    .everyMinute();
  // 10분 주기
  //.everyTenMinutes();

  // 18:00:30에 실행
  scheduler
    .run(async () => {
      console.log("18:00:30에 실행");
      await useInfo().truncate();
      await Promise.all([
        useInfo().seoulInsert(),
        useInfo().kosdaqInsert(),
        useInfo().nasdaqInsert(),
      ]);
    })
    .cron("30 0 18 * * *");
}
