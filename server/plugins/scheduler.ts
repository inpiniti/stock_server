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

  // 데이터 수집
  scheduler
    .run(async () => {
      const uniqueLabel = `collection-${new Date().toISOString()}`;
      console.log("1분 주기 실행");
      console.time(uniqueLabel);
      try {
        await useCollection();
        console.timeEnd(uniqueLabel);
      } catch (error) {
        console.error(error);
        console.timeEnd(uniqueLabel);
      }
    })
    // 매분 실행하도록
    .everyMinute();
  // 10분 주기
  //.everyTenMinutes();

  // 데이터 학습
  //scheduler.run(async () => {});

  // 학습 테스트
  (function 테스트() {
    console.log("모델 학습");
    useLearning().runAll();
  })();
}
