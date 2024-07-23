//import { updateStore } from "../api/investing/[countryCode]/[exchangeCode]";
import { updateStore } from "../api/tradingview/[countryCode]";
import { useScheduler } from "#scheduler";

export default defineNitroPlugin(() => {
  //startScheduler();
  //continuouslyRunTask();
});

function startScheduler() {
  const scheduler = useScheduler();

  scheduler
    .run(async () => {
      console.log("scheduler start");
      const kr_data = await updateStore("kr");
      console.log("kr", kr_data.length);
      const us_data = await updateStore("us");
      console.log("us", us_data.length);
      //const jp_data = await updateStore("jp");
      //console.log("jp", jp_data.length);
      //await insertDataToSupabase(jp_data);
      //const cn_data = await updateStore("cn");
      //await insertDataToSupabase(cn_data);
      //console.log("cn", cn_data.length);
    })
    // 매분 실행하도록
    //.cron("* * * * *");
    // 10분 주기
    .everyTenMinutes();
}

async function continuouslyRunTask() {
  try {
    console.log("scheduler start");

    const kr_data = await updateStore("kr");
    console.log("kr", kr_data.length);

    const us_data = await updateStore("us");
    console.log("us", us_data.length);

    const jp_data = await updateStore("jp");
    console.log("jp", jp_data.length);

    const cn_data = await updateStore("cn");
    console.log("cn", cn_data.length);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // Optionally add a delay if needed
    setTimeout(continuouslyRunTask, 0); // Adjust the delay as needed
  }
}
