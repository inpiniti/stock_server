import { krCollectSave } from "../api/galaxyS7/kr.post";
import { usCollectSave } from "../api/galaxyS7/us.post";

import { useScheduler } from "#scheduler";

export default defineNitroPlugin(() => {
  //startScheduler();
});

function startScheduler() {
  const scheduler = useScheduler();

  scheduler
    .run(async () => {
      await krCollectSave();
      await usCollectSave();
    })
    // 매분 실행하도록
    .everyMinute();
  // 10분 주기
  //.everyTenMinutes();
}
