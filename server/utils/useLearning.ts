import * as tf from "@tensorflow/tfjs-node";
import { pgAiModel } from "./pgAiModels";

export const useLearning = () => {
  const sectors = [
    "all",
    "seoul",
    "kosdaq",
    "nasdaq",
    "communications",
    "energyMinerals",
    "healthTechnology",
    "nonEnergyMinerals",
    "utilities",
    "consumerDurables",
    "technologyServices",
    "distributionServices",
    "finance",
    "consumerServices",
    "processIndustries",
    "producerManufacturing",
    "commercialServices",
    "industrialServices",
    "transportation",
    "miscellaneous",
    "consumerNonDurables",
    "healthServices",
    "retailTrade",
    "electronicTechnology",
  ];

  const agos = [
    "h1",
    "d1",
    "d2",
    "d3",
    "d4",
    "d5",
    "d6",
    "w1",
    "w2",
    "w3",
    "w4",
    "m1",
    "m2",
    "m3",
    "m4",
    "m5",
    "m6",
    "m7",
    "m8",
    "m9",
    "m10",
    "m11",
  ];

  // 전처리
  const preprocessCommon = (
    data: any,
    ago: AgoType,
    labelCallback: (row: any, dbFieldAgo: string) => number
  ) => {
    const features: number[][] = []; // 특징
    const labels: number[] = []; // 라벨

    data.forEach((row: any) => {
      // 예제상 간단하게 전 처리 하는 코드를 작성합니다.
      // 실제 데이터에서는 사전 정제 과정을 거치는 것이 좋습니다.
      // 각 행의 특징을 숫자 배열로 변환합니다.

      // 사용할 필드 이름을 배열로 정의
      const selectedFields = [
        "operating_margin_ttm",
        "relative_volume_10d_calc",
        "enterprise_value_to_revenue_ttm",
        "volatility_w",
        "volatility_m",
        "dividends_yield_current",
        "gap",
        "volume_change",
        "pre_tax_margin_ttm",
        "perf_1_y_market_cap",
        "perf_w",
        "perf_1_m",
        "perf_3_m",
        "perf_6_m",
        "perf_y_t_d",
        "perf_y",
        "perf_5_y",
        "perf_10_y",
        "recommend_all",
        "recommend_m_a",
        "recommend_other",
        "r_s_i",
        "mom",
        "c_c_i20",
        "stoch_k",
        "stoch_d",
      ];

      // 선택된 필드만 feature 배열에 추가합니다.
      const feature = selectedFields.map((field) => {
        const value = row[field];
        // 숫자로 변환 가능한지 확인하고, 가능하면 변환합니다.
        // 숫자로 변환할 수 없는 경우 0으로 처리합니다.
        return isNaN(parseFloat(value)) ? 0 : parseFloat(value);
      }) as number[];

      // 0% 보다 큰지 확인 하고 있는 것으로 보임.
      // ago 부분이 거꿀로 되어 있다.
      // 변수들은 h1, d1, ... d11, ... y1 뭐 이런식인데,
      // 디비의 필드르은 1h, 1d, ... 11d, ... 1y 이런식으로 되어 있다.
      // 그래서 ago를 거꿀로 해서 사용해야 한다.
      // 아래 코드를 수정가능할까?

      function convertAgoFormat(ago: string): string {
        // ago 변수의 첫 글자와 나머지 부분을 분리
        const firstChar = ago.charAt(0);
        const rest = ago.slice(1);
        // 순서를 바꾸어 데이터베이스 필드 형식에 맞게 조합
        return `${rest}${firstChar}`;
      }
      const dbFieldAgo = convertAgoFormat(ago);

      const label = labelCallback(row, dbFieldAgo); // 컬럼 이름은 실제 데이터에 맞게 수정

      features.push(feature);
      labels.push(label);
    });

    return {
      features: tf.tensor2d(features),
      labels: tf.tensor2d(labels, [labels.length, 1]),
    };
  };

  const preprocess = (data: any, ago: AgoType) => {
    return preprocessCommon(data, ago, (row, dbFieldAgo) =>
      row[`change_${dbFieldAgo}`] > 0 ? 1 : 0
    );
  };

  const preprocessWithOriginalLabel = (data: any, ago: AgoType) => {
    return preprocessCommon(data, ago, (row, dbFieldAgo) =>
      isNaN(parseFloat(row[`change_${dbFieldAgo}`]))
        ? 0
        : parseFloat(row[`change_${dbFieldAgo}`])
    );
  };

  // 훈련
  const trainBinary = async (features: any, labels: any) => {
    const model = tf.sequential();
    model.add(
      tf.layers.dense({
        units: 64,
        activation: "relu",
        inputShape: [features.shape[1]],
      })
    );
    model.add(tf.layers.dense({ units: 32, activation: "relu" }));
    model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));

    model.compile({
      optimizer: tf.train.adam(),
      loss: "binaryCrossentropy", // 여기를 수정했습니다.
      metrics: ["accuracy"],
    });

    await model.fit(features, labels, {
      epochs: 50,
      batchSize: 32,
      validationSplit: 0.2,
    });

    return model;
  };

  // 훈련2
  const trainRegression = async (features: any, labels: any) => {
    const model = tf.sequential();
    model.add(
      tf.layers.dense({
        units: 64,
        activation: "relu",
        inputShape: [features.shape[1]],
      })
    );
    model.add(tf.layers.dense({ units: 32, activation: "relu" }));
    model.add(tf.layers.dense({ units: 1, activation: "linear" }));

    model.compile({
      optimizer: tf.train.adam(),
      loss: "meanSquaredError",
      metrics: ["mae"], // Mean Absolute Error
    });

    await model.fit(features, labels, {
      epochs: 50,
      batchSize: 32,
      validationSplit: 0.2,
    });

    return model;
  };

  // 모델을 JSON 형태로 직렬화하고 가중치를 직렬화하는 함수
  const serializeModel = async (model: any) => {
    if (model instanceof tf.LayersModel) {
      console.log("model is an instance of tf.Model");
    } else {
      console.error("model is not an instance of tf.Model");
      throw new Error("Invalid model instance");
    }

    const modelJson = await model.toJSON();
    const modelWeights = await model.getWeights();
    const serializedWeights = modelWeights.map((weight: any) =>
      weight.dataSync()
    );
    const weightsJson = JSON.stringify(Array.from(serializedWeights));

    return { modelJson, weightsJson };
  };

  // 모델을 Supabase에 저장하는 함수
  const saveModelToSupabase = async (
    modelJson: any,
    weightsJson: any,
    sotckType: string,
    ago: AgoType,
    tableName: string
  ) => {
    const { data, error } = await useGalaxy()
      .upsert(tableName)
      .values(
        {
          model: modelJson,
          weights: weightsJson,
          market_sector: sotckType,
          ago: ago,
        },
        { onConflict: ["market_sector", "ago"] }
      );

    if (data) {
      console.log(
        `model upsert data in ${tableName}`,
        data.slice(0, 100) + "..."
      );
    } else {
      console.log(`No data returned from upsert in ${tableName}`);
    }

    if (error) {
      throw new Error(
        `Error upserting model to ${tableName}: ${error.message}`
      );
    }
  };

  // 모델 저장 함수
  const save = async (
    model: any,
    sotckType: string,
    ago: AgoType,
    tableName: any
  ) => {
    try {
      const { modelJson, weightsJson } = await serializeModel(model);
      await saveModelToSupabase(
        modelJson,
        weightsJson,
        sotckType,
        ago,
        tableName
      );
      return true;
    } catch (error) {
      console.error("error006", error);
      throw error;
    }
  };

  // 예제 사용
  const saveBinaryModel = async (
    model: any,
    sotckType: string,
    ago: AgoType
  ) => {
    return save(model, sotckType, ago, pgAiModel);
  };

  const saveRegressionModel = async (
    model: any,
    sotckType: string,
    ago: AgoType
  ) => {
    return save(model, sotckType, ago, pgTableAiModelsPrice);
  };

  // ai 학습 후 저장까지
  const runBinary = async (sotckType: string, ago: AgoType) => {
    console.time(`run ${sotckType} ${ago}`);
    try {
      console.timeLog(`run ${sotckType} ${ago}`, "시작");
      const stcokData = await sotckDataOnType[sotckType](ago); // 데이터 가져오기
      console.timeLog(
        `run ${sotckType} ${ago}`,
        `데이터 가져오기 ${stcokData.length}`
      );
      if (stcokData.length == 0) {
        console.timeEnd(`run ${sotckType} ${ago}`);
        return false;
      } else {
        const { features, labels } = preprocess(stcokData, ago); // 전처리
        console.timeLog(`run ${sotckType} ${ago}`, "전처리");
        const model = await trainBinary(features, labels); // 훈련
        console.timeLog(`run ${sotckType} ${ago}`, "훈련");
        await saveBinaryModel(model, sotckType, ago); // 모델 저장
        console.timeLog(`run ${sotckType} ${ago}`, "모델 저장");
        console.timeEnd(`run ${sotckType} ${ago}`);
        return true;
      }
    } catch (error) {
      console.log("error", error);
      console.timeEnd(`run ${sotckType} ${ago}`);
      throw error;
    }
  };

  const runRegression = async (sotckType: string, ago: AgoType) => {
    console.time(`run ${sotckType} ${ago}`);
    try {
      console.timeLog(`run ${sotckType} ${ago}`, "시작");
      const stcokData = await sotckDataOnType[sotckType](ago); // 데이터 가져오기
      console.timeLog(
        `run ${sotckType} ${ago}`,
        `데이터 가져오기 ${stcokData.length}`
      );
      if (stcokData.length == 0) {
        console.timeEnd(`run ${sotckType} ${ago}`);
        return false;
      } else {
        const { features, labels } = preprocessWithOriginalLabel(
          stcokData,
          ago
        ); // 전처리
        console.timeLog(`run ${sotckType} ${ago}`, "전처리");
        const model = await trainRegression(features, labels); // 훈련
        console.timeLog(`run ${sotckType} ${ago}`, "훈련");
        await saveRegressionModel(model, sotckType, ago); // 모델 저장
        console.timeLog(`run ${sotckType} ${ago}`, "모델 저장");
        console.timeEnd(`run ${sotckType} ${ago}`);
        return true;
      }
    } catch (error) {
      console.log("error", error);
      console.timeEnd(`run ${sotckType} ${ago}`);
      throw error;
    }
  };

  const runForAllSectorsAndAgos = async (
    runFunction: (sector: string, ago: AgoType) => Promise<boolean>
  ) => {
    for (const sector of sectors) {
      for (const ago of agos) {
        console.log(`Running for sector: ${sector}, ago: ${ago}`); // Debugging log
        await runFunction(sector, ago as AgoType);
      }
    }
  };

  const runAllBinary = async () => {
    await runForAllSectorsAndAgos(runBinary);
  };

  const runAllRegression = async () => {
    await runForAllSectorsAndAgos(runRegression);
  };

  return {
    runAllBinary,
    runAllRegression,
  };
};

const sotckDataOnType: { [key: string]: (ago: AgoType) => Promise<any> } = {
  all: useTrainingData().getAll,
  seoul: useTrainingData().getSoeul,
  kosdaq: useTrainingData().getKosdaq,
  nasdaq: useTrainingData().getNasdaq,
  communications: useTrainingData().getCommunications,
  energyMinerals: useTrainingData().getEnergyMinerals,
  healthTechnology: useTrainingData().getHealthTechnology,
  nonEnergyMinerals: useTrainingData().getNonEnergyMinerals,
  utilities: useTrainingData().getUtilities,
  consumerDurables: useTrainingData().getConsumerDurables,
  technologyServices: useTrainingData().getTechnologyServices,
  distributionServices: useTrainingData().getDistributionServices,
  finance: useTrainingData().getFinance,
  consumerServices: useTrainingData().getConsumerServices,
  processIndustries: useTrainingData().getProcessIndustries,
  producerManufacturing: useTrainingData().getProducerManufacturing,
  commercialServices: useTrainingData().getCommercialServices,
  industrialServices: useTrainingData().getIndustrialServices,
  transportation: useTrainingData().getTransportation,
  miscellaneous: useTrainingData().getMiscellaneous,
  consumerNonDurables: useTrainingData().getConsumerNonDurables,
  healthServices: useTrainingData().getHealthServices,
  retailTrade: useTrainingData().getRetailTrade,
  electronicTechnology: useTrainingData().getElectronicTechnology,
};
