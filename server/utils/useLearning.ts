import * as tf from "@tensorflow/tfjs";

export const useLearning = async () => {
  // 전처리
  const preprocess = (data: any) => {
    const features: number[][] = []; // 특징
    const labels: number[] = []; // 라벨

    data.forEach((row: any) => {
      // 예제상 간단하게 전 처리 하는 코드를 작성합니다.
      // 실제 데이터에서는 사전 정제 과정을 거치는 것이 좋습니다.
      // 각 행의 특징을 숫자 배열로 변환합니다.
      const feature = Object.values(row)
        .slice(0, -1)
        .map((value: any) => {
          // 숫자로 변환 가능한지 확인하고, 가능하면 변환합니다.
          // 숫자로 변환할 수 없는 경우 0으로 처리합니다.
          return isNaN(parseFloat(value)) ? 0 : parseFloat(value);
        }) as number[];
      const label = row.percent_change > 5 ? 1 : 0; // 컬럼 이름은 실제 데이터에 맞게 수정

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
  const save = async (model: any, sotckType: string, ago: AgoType) => {};

  // 모델 불러오기
  const load = async (sotckType: string, ago: AgoType) => {};

  // 모델 생성
  const run = async (sotckType: string, ago: AgoType) => {
    const stcokData = await sotckDataOnType[sotckType](ago);
    const { features, labels } = preprocess(stcokData);
    const model = train(features, labels);
    save(model, sotckType, ago);
  };
};

// getSoeul,
// getKosdaq,
// getNasdaq,
// getCommunications,
// getEnergyMinerals,
// getHealthTechnology,
// getNonEnergyMinerals,
// getUtilities,
// getConsumerDurables,
// getTechnologyServices,
// getDistributionServices,
// getFinance,
// getConsumerServices,
// getProcessIndustries,
// getProducerManufacturing,
// getCommercialServices,
// getIndustrialServices,
// getTransportation,
// getMiscellaneous,
// getConsumerNonDurables,
// getHealthServices,
// getRetailTrade,
// getElectronicTechnology,

const sotckDataOnType: { [key: string]: (ago: AgoType) => Promise<any> } = {
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
