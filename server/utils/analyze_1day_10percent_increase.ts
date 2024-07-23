//하루 뒤 10% 이상 오를 수 있는지 분석

import * as tf from "@tensorflow/tfjs";

// supabase 데이터 읽기
export const fetchData1Day10Percent = async (): Promise<any[]> => {
  //const { data, error } = await supabaseClient.from("stock").select("*");
  const p_market = "korea";
  const p_sector = "Electronic Technology";

  return [];
};

// 전처리
const preprocessData1Day10Percent = (data: any) => {
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

// 학습
const trainModel1Day10Percent = async (features: any, labels: any) => {
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
const saveModel1Day10Percent = () => {};
// 모델 불러오기
const loadModel1Day10Percent = () => {};
// 예측
const predict1Day10Percent = (model: tf.LayersModel, data: any) => {
  const { features } = preprocessData1Day10Percent(data);
  const predictions = model.predict(features) as tf.Tensor;

  // 반환 타입을 number[][]로 단언합니다.
  const predictionArray = predictions.arraySync() as number[][];
  return predictionArray.map((pred: number[]) => (pred[0] > 0.5 ? 1 : 0));
};

// 실제로 사용하는 예제 코드
export const main1Day10Percent = async () => {
  try {
    const data = await fetchData1Day10Percent();
    console.log("data", data);
    const { features, labels } = preprocessData1Day10Percent(data);
    console.log("features", features);
    console.log("labels", labels);

    // 모델 훈련
    const model = await trainModel1Day10Percent(features, labels);

    // 예측
    const predictions = predict1Day10Percent(model, data);

    console.log("Predictions:", predictions);
  } catch (error) {
    console.error(error);
  }
};
