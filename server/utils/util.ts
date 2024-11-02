export function splitData(data: any, chunkSize: number) {
  let result = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    result.push(data.slice(i, i + chunkSize));
  }
  return result;
}

export function toSnakeCase(obj: any): any {
  const newObj: any = {};
  Object.keys(obj).forEach((key) => {
    let snakeCaseKey = key
      .replace(/\.+/g, "_") // Replace dots with underscores
      .replace(/([A-Z])/g, "_$1") // Prefix uppercase letters with an underscore
      .toLowerCase() // Convert to lowercase
      .replace(/__+/g, "_"); // Replace double underscores with a single underscore

    // Remove leading underscore if it's the first character
    snakeCaseKey = snakeCaseKey.startsWith("_")
      ? snakeCaseKey.substring(1)
      : snakeCaseKey;

    newObj[snakeCaseKey] = obj[key];
  });
  return newObj;
}

export function oneHourAgo() {
  const oneHourAgo = new Date();
  oneHourAgo.setHours(oneHourAgo.getHours() - 1);

  // 한국 시간으로 변환
  const kstOffset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
  const kstDate = new Date(oneHourAgo.getTime() + kstOffset);
  const formattedDate = kstDate.toISOString().slice(0, 19).replace("T", " ");

  return formattedDate;
}

export function oneDayAgo() {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  // 한국 시간으로 변환
  const kstOffset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
  const kstDate = new Date(oneDayAgo.getTime() + kstOffset);
  const formattedDate = kstDate.toISOString().slice(0, 19).replace("T", " ");

  return formattedDate;
}

// 데이터 처리 및 콜백 함수 호출
export async function processDataInsert(
  data: any[],
  callback: (chunk: any[]) => Promise<void>
) {
  if (!data || data.length === 0) {
    throw new Error("데이터 배열이 비어 있습니다.");
  }

  // 데이터 분할
  // 예를 들어, 각 행이 83개의 파라미터를 사용한다고 가정하면, 최대 6553개의 행을 한 번에 삽입할 수 있습니다.
  // , 추가적인 여유 100을 두어 계산합니다.
  const firstRowParamCount = Object.keys(data[0]).length;
  const chunkSize = Math.floor(65534 / firstRowParamCount);
  const dataChunks = splitData(data, chunkSize);

  for (const chunk of dataChunks) {
    await callback(chunk);
  }
}

export const decodeByteaToJson = (byteaString: string) => {
  try {
    // bytea 문자열에서 \x를 제거하고, 16진수 문자열을 디코딩합니다.
    const hexString = byteaString.slice(2);
    const byteArray = hexString
      ? new Uint8Array(
          hexString.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
        )
      : new Uint8Array(0);
    const jsonString = new TextDecoder().decode(byteArray);
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Failed to decode bytea string:", e);
    return null;
  }
};

export function proxyToObject(proxy: any): any {
  if (Array.isArray(proxy)) {
    return proxy.map((item) => proxyToObject(item));
  } else if (proxy !== null && typeof proxy === "object") {
    const obj: any = {};
    for (const key in proxy) {
      if (proxy.hasOwnProperty(key)) {
        obj[key] = proxyToObject(proxy[key]);
      }
    }
    return obj;
  } else {
    return proxy;
  }
}
