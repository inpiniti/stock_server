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

  // collectionCode
  // 이건 저녁 5시에 실행해주면 좋을것 같긴한데, 맥에서만 되는거 같아보임

  // 학습 테스트 (저녁 6시에 실행해주면 좋을듯)
  scheduler
    .run(async () => {
      console.log("모델 학습");
      try {
        await useLearning().runAllBinary();
        console.log("학습 완료");
      } catch (error) {
        console.error(error);
      }
    })
    .cron("0 18 * * *", "Asia/Seoul"); // 서울 시간대 기준 저녁 6시

  scheduler
    .run(async () => {
      console.log("모델 학습");
      try {
        await useLearning().runAllRegression();
        console.log("학습 완료");
      } catch (error) {
        console.error(error);
      }
    })
    .cron("0 4 * * *", "Asia/Seoul"); // 서울 시간대 기준 새벽 4시
}
