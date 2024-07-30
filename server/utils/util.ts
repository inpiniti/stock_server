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
