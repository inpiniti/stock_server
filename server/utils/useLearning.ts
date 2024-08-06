import * as tf from "@tensorflow/tfjs";
import { pgAiModel } from "./pgAiModels";
import { eq, and } from "drizzle-orm";

export const useLearning = () => {
  // 전처리
  const preprocess = (data: any, ago: AgoType) => {
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

      // 5% 보다 큰지 확인 하고 있는 것으로 보임.
      const label = row[`change_${ago}`] > 0 ? 1 : 0; // 컬럼 이름은 실제 데이터에 맞게 수정

      features.push(feature);
      labels.push(label);
    });

    return {
      features: tf.tensor2d(features),
      labels: tf.tensor2d(labels, [labels.length, 1]),
    };
  };

  // 훈련
  const train = async (features: any, labels: any) => {
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

  // 모델 저장
  const save = async (model: any, sotckType: string, ago: AgoType) => {
    try {
      // 불러오기 후 있으면 업데이트
      const data = await load(sotckType, ago);
      // 없으면 새로 생성
      if (data.length == 0) {
        await useGalaxy()
          .insert(pgAiModel)
          .values({
            model: await model.save(),
            market_sector: sotckType,
            ago: ago,
          });
      } else {
        await useGalaxy()
          .update(pgAiModel)
          .set({
            model: await model.save(),
          })
          .where(
            and(eq(pgAiModel.market_sector, sotckType), eq(pgAiModel.ago, ago))
          );
      }
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // 모델 불러오기
  const load = async (sotckType: string, ago: AgoType) => {
    try {
      const data = await useGalaxy()
        .select()
        .from(pgAiModel)
        .where(
          and(eq(pgAiModel.market_sector, sotckType), eq(pgAiModel.ago, ago))
        );
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // ai 학습 후 저장까지
  const run = async (sotckType: string, ago: AgoType) => {
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
        const model = await train(features, labels); // 훈련
        console.timeLog(`run ${sotckType} ${ago}`, "훈련");
        await save(model, sotckType, ago); // 모델 저장
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

  // 모든 색터, 시간에 대해 학습
  const runAll = async () => {
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
      "1w",
      "2w",
      "3w",
      "4w",
      "1m",
      "2m",
      "3m",
      "4m",
      "5m",
      "6m",
      "7m",
      "8m",
      "9m",
      "10m",
      "11m",
    ];

    for (const sector of sectors) {
      for (const ago of agos) {
        console.log(`Running for sector: ${sector}, ago: ${ago}`); // Debugging log
        await run(sector, ago as AgoType);
      }
    }
  };

  return {
    runAll,
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
