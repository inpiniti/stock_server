export default defineEventHandler(async (event) => {
  try {
    const [usResult] = await Promise.all([useLive().newUs()]);
    const { originNasdaq } = usResult;

    // // 모델 불러오기
    // const {
    //   model_id,
    //   model: modelJson,
    //   weights: weightsJson,
    //   market_sector,
    //   ago,
    // } = await useLearning().loadModelFromDrizzle("all", "h4", pgAiModel);

    // // 역직렬화
    // const model = await useLearning().deserializeModel(
    //   JSON.parse(modelJson.toString()),
    //   JSON.parse(weightsJson.toString())
    // ); // 16

    // // 전처리
    // const inputData = useLearning().preprocessForPrediction(originNasdaq); // 17

    // // 예측
    // const predicts = await useLearning().predictWithModel(model, inputData); // 18

    // const enrichedOriginNasdaq = originNasdaq.map(
    //   (item: any, index: number) => {
    //     return {
    //       ...item, // 원본 데이터의 모든 필드를 복사
    //       predict: predicts[index], // 예측 결과 추가
    //     };
    //   }
    // );

    // return enrichedOriginNasdaq;

    // 전처리
    const inputData = useLearning().preprocessForPrediction(originNasdaq); // 17

    // h1 부터 h23까지 예측
    const predictPromises = []; // 프로미스를 저장할 배열

    for (let hour = 1; hour <= 23; hour++) {
      const agoType = `h${hour}` as AgoType; // 타입 단언을 통해 타입을 명시적으로 설정

      // 모델 불러오기 및 예측을 프로미스로 추가
      predictPromises.push(
        (async () => {
          // 모델 불러오기
          const {
            model_id,
            model: modelJson,
            weights: weightsJson,
            market_sector,
            ago,
          } = await useLearning().loadModelFromDrizzle(
            "all",
            agoType,
            pgAiModel
          );

          // 역직렬화
          const model = await useLearning().deserializeModel(
            JSON.parse(modelJson.toString()),
            JSON.parse(weightsJson.toString())
          );

          // 예측
          return await useLearning().predictWithModel(model, inputData);
        })()
      );
    }

    // 모든 예측 프로미스가 완료될 때까지 기다림
    let allPredicts = await Promise.all(predictPromises);

    // 원본 데이터에 예측 결과 추가
    const enrichedOriginNasdaqFull = originNasdaq.map(
      (item: any, index: number) => {
        const predictorFields: { [key: string]: number } = {}; // 키를 문자열로 설정하고 값의 타입을 지정
        allPredicts.forEach((predicts, hour) => {
          predictorFields[`full_model_${hour + 1}h_predictor`] =
            predicts[index];
        });

        return {
          ...item, // 원본 데이터의 모든 필드를 복사
          ...predictorFields, // 예측 결과 추가
        };
      }
    );

    for (let hour = 1; hour <= 23; hour++) {
      const agoType = `h${hour}` as AgoType; // 타입 단언을 통해 타입을 명시적으로 설정

      // 모델 불러오기 및 예측을 프로미스로 추가
      predictPromises.push(
        (async () => {
          // 모델 불러오기
          const {
            model_id,
            model: modelJson,
            weights: weightsJson,
            market_sector,
            ago,
          } = await useLearning().loadModelFromDrizzle(
            "nasdaq",
            agoType,
            pgAiModel
          );

          // 역직렬화
          const model = await useLearning().deserializeModel(
            JSON.parse(modelJson.toString()),
            JSON.parse(weightsJson.toString())
          );

          // 예측
          return await useLearning().predictWithModel(model, inputData);
        })()
      );
    }

    // 모든 예측 프로미스가 완료될 때까지 기다림
    allPredicts = await Promise.all(predictPromises);

    // 원본 데이터에 예측 결과 추가
    const enrichedOriginNasdaqMarket = enrichedOriginNasdaqFull.map(
      (item: any, index: number) => {
        const predictorFields: { [key: string]: number } = {}; // 키를 문자열로 설정하고 값의 타입을 지정
        allPredicts.forEach((predicts, hour) => {
          predictorFields[`market_model_${hour + 1}h_predictor`] =
            predicts[index];
        });

        return {
          ...item, // 원본 데이터의 모든 필드를 복사
          ...predictorFields, // 예측 결과 추가
        };
      }
    );

    return enrichedOriginNasdaqMarket;
  } catch (error) {
    console.error("error019");
    throw error;
  }
});
