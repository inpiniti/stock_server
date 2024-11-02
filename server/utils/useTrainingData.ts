export type AgoType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "h7"
  | "h8"
  | "h9"
  | "h10"
  | "h11"
  | "h12"
  | "h13"
  | "h14"
  | "h15"
  | "h16"
  | "h17"
  | "h18"
  | "h19"
  | "h20"
  | "h21"
  | "h22"
  | "h23"
  | "d1"
  | "d2"
  | "d3"
  | "d4"
  | "d5"
  | "d6"
  | "w1"
  | "w2"
  | "w3"
  | "w4"
  | "m1"
  | "m2"
  | "m3"
  | "m4"
  | "m5"
  | "m6"
  | "m7"
  | "m8"
  | "m9"
  | "m10"
  | "m11";

const AgoTypeSeoulFiled: any = {
  h1: pgTableSeoul.change_1h,
  h2: pgTableSeoul.change_2h,
  h3: pgTableSeoul.change_3h,
  h4: pgTableSeoul.change_4h,
  h5: pgTableSeoul.change_5h,
  h6: pgTableSeoul.change_6h,
  h7: pgTableSeoul.change_7h,
  h8: pgTableSeoul.change_8h,
  h9: pgTableSeoul.change_9h,
  h10: pgTableSeoul.change_10h,
  h11: pgTableSeoul.change_11h,
  h12: pgTableSeoul.change_12h,
  h13: pgTableSeoul.change_13h,
  h14: pgTableSeoul.change_14h,
  h15: pgTableSeoul.change_15h,
  h16: pgTableSeoul.change_16h,
  h17: pgTableSeoul.change_17h,
  h18: pgTableSeoul.change_18h,
  h19: pgTableSeoul.change_19h,
  h20: pgTableSeoul.change_20h,
  h21: pgTableSeoul.change_21h,
  h22: pgTableSeoul.change_22h,
  h23: pgTableSeoul.change_23h,
  d1: pgTableSeoul.change_1d,
  d2: pgTableSeoul.change_2d,
  d3: pgTableSeoul.change_3d,
  d4: pgTableSeoul.change_4d,
  d5: pgTableSeoul.change_5d,
  d6: pgTableSeoul.change_6d,
  w1: pgTableSeoul.change_1w,
  w2: pgTableSeoul.change_2w,
  w3: pgTableSeoul.change_3w,
  w4: pgTableSeoul.change_4w,
  m1: pgTableSeoul.change_1m,
  m2: pgTableSeoul.change_2m,
  m3: pgTableSeoul.change_3m,
  m4: pgTableSeoul.change_4m,
  m5: pgTableSeoul.change_5m,
  m6: pgTableSeoul.change_6m,
  m7: pgTableSeoul.change_7m,
  m8: pgTableSeoul.change_8m,
  m9: pgTableSeoul.change_9m,
  m10: pgTableSeoul.change_10m,
  m11: pgTableSeoul.change_11m,
};

const AgoTypeKosdaqFiled: any = {
  h1: pgTableKosdaq.change_1h,
  h2: pgTableKosdaq.change_2h,
  h3: pgTableKosdaq.change_3h,
  h4: pgTableKosdaq.change_4h,
  h5: pgTableKosdaq.change_5h,
  h6: pgTableKosdaq.change_6h,
  h7: pgTableKosdaq.change_7h,
  h8: pgTableKosdaq.change_8h,
  h9: pgTableKosdaq.change_9h,
  h10: pgTableKosdaq.change_10h,
  h11: pgTableKosdaq.change_11h,
  h12: pgTableKosdaq.change_12h,
  h13: pgTableKosdaq.change_13h,
  h14: pgTableKosdaq.change_14h,
  h15: pgTableKosdaq.change_15h,
  h16: pgTableKosdaq.change_16h,
  h17: pgTableKosdaq.change_17h,
  h18: pgTableKosdaq.change_18h,
  h19: pgTableKosdaq.change_19h,
  h20: pgTableKosdaq.change_20h,
  h21: pgTableKosdaq.change_21h,
  h22: pgTableKosdaq.change_22h,
  h23: pgTableKosdaq.change_23h,
  d1: pgTableKosdaq.change_1d,
  d2: pgTableKosdaq.change_2d,
  d3: pgTableKosdaq.change_3d,
  d4: pgTableKosdaq.change_4d,
  d5: pgTableKosdaq.change_5d,
  d6: pgTableKosdaq.change_6d,
  w1: pgTableKosdaq.change_1w,
  w2: pgTableKosdaq.change_2w,
  w3: pgTableKosdaq.change_3w,
  w4: pgTableKosdaq.change_4w,
  m1: pgTableKosdaq.change_1m,
  m2: pgTableKosdaq.change_2m,
  m3: pgTableKosdaq.change_3m,
  m4: pgTableKosdaq.change_4m,
  m5: pgTableKosdaq.change_5m,
  m6: pgTableKosdaq.change_6m,
  m7: pgTableKosdaq.change_7m,
  m8: pgTableKosdaq.change_8m,
  m9: pgTableKosdaq.change_9m,
  m10: pgTableKosdaq.change_10m,
  m11: pgTableKosdaq.change_11m,
};

const AgoTypeNasdaqFiled: any = {
  h1: pgTableNasdaq.change_1h,
  h2: pgTableNasdaq.change_2h,
  h3: pgTableNasdaq.change_3h,
  h4: pgTableNasdaq.change_4h,
  h5: pgTableNasdaq.change_5h,
  h6: pgTableNasdaq.change_6h,
  h7: pgTableNasdaq.change_7h,
  h8: pgTableNasdaq.change_8h,
  h9: pgTableNasdaq.change_9h,
  h10: pgTableNasdaq.change_10h,
  h11: pgTableNasdaq.change_11h,
  h12: pgTableNasdaq.change_12h,
  h13: pgTableNasdaq.change_13h,
  h14: pgTableNasdaq.change_14h,
  h15: pgTableNasdaq.change_15h,
  h16: pgTableNasdaq.change_16h,
  h17: pgTableNasdaq.change_17h,
  h18: pgTableNasdaq.change_18h,
  h19: pgTableNasdaq.change_19h,
  h20: pgTableNasdaq.change_20h,
  h21: pgTableNasdaq.change_21h,
  h22: pgTableNasdaq.change_22h,
  h23: pgTableNasdaq.change_23h,
  d1: pgTableNasdaq.change_1d,
  d2: pgTableNasdaq.change_2d,
  d3: pgTableNasdaq.change_3d,
  d4: pgTableNasdaq.change_4d,
  d5: pgTableNasdaq.change_5d,
  d6: pgTableNasdaq.change_6d,
  w1: pgTableNasdaq.change_1w,
  w2: pgTableNasdaq.change_2w,
  w3: pgTableNasdaq.change_3w,
  w4: pgTableNasdaq.change_4w,
  m1: pgTableNasdaq.change_1m,
  m2: pgTableNasdaq.change_2m,
  m3: pgTableNasdaq.change_3m,
  m4: pgTableNasdaq.change_4m,
  m5: pgTableNasdaq.change_5m,
  m6: pgTableNasdaq.change_6m,
  m7: pgTableNasdaq.change_7m,
  m8: pgTableNasdaq.change_8m,
  m9: pgTableNasdaq.change_9m,
  m10: pgTableNasdaq.change_10m,
  m11: pgTableNasdaq.change_11m,
};

import { eq, and, isNotNull } from "drizzle-orm";

// Generic function to get sector data
const getSectorData = async (ago: AgoType, sector: string) => {
  const [seoul, kosdaq, nasdaq] = await Promise.all([
    useDrizzle()
      .select()
      .from(pgTableSeoul)
      .where(
        and(isNotNull(AgoTypeSeoulFiled[ago]), eq(pgTableSeoul.sector, sector))
      ),
    useDrizzle()
      .select()
      .from(pgTableKosdaq)
      .where(
        and(
          isNotNull(AgoTypeKosdaqFiled[ago]),
          eq(pgTableKosdaq.sector, sector)
        )
      ),
    useDrizzle()
      .select()
      .from(pgTableNasdaq)
      .where(
        and(
          isNotNull(AgoTypeNasdaqFiled[ago]),
          eq(pgTableNasdaq.sector, sector)
        )
      ),
  ]);

  return [...seoul, ...kosdaq, ...nasdaq];
};

export const useTrainingData = () => {
  const getAll = async (ago: AgoType) => {
    const [seoul, kosdaq, nasdaq] = await Promise.all([
      getSoeul(ago),
      getKosdaq(ago),
      getNasdaq(ago),
    ]);
    return [...seoul, ...kosdaq, ...nasdaq];
  };
  const getSoeul = async (ago: AgoType) => {
    const query = useDrizzle()
      .select()
      .from(pgTableSeoul)
      .where(isNotNull(AgoTypeSeoulFiled[ago]));
    return await query;
  };
  const getKosdaq = async (ago: AgoType) => {
    const query = useDrizzle()
      .select()
      .from(pgTableKosdaq)
      .where(isNotNull(AgoTypeKosdaqFiled[ago]));
    return await query;
  };
  const getNasdaq = async (ago: AgoType) => {
    const query = useDrizzle()
      .select()
      .from(pgTableNasdaq)
      .where(isNotNull(AgoTypeNasdaqFiled[ago]));
    return await query;
  };

  //Communications
  const getCommunications = async (ago: AgoType) =>
    getSectorData(ago, "Communications");
  //Energy Minerals
  const getEnergyMinerals = async (ago: AgoType) =>
    getSectorData(ago, "Energy Minerals");

  // Health Technology
  const getHealthTechnology = async (ago: AgoType) =>
    getSectorData(ago, "Health Technology");
  // Non-Energy Minerals
  const getNonEnergyMinerals = async (ago: AgoType) =>
    getSectorData(ago, "Non-Energy Minerals");
  // Utilities
  const getUtilities = async (ago: AgoType) => getSectorData(ago, "Utilities");
  // Consumer Durables
  const getConsumerDurables = async (ago: AgoType) =>
    getSectorData(ago, "Consumer Durables");
  // Technology Services
  const getTechnologyServices = async (ago: AgoType) =>
    getSectorData(ago, "Technology Services");
  // Distribution Services
  const getDistributionServices = async (ago: AgoType) =>
    getSectorData(ago, "Distribution Services");
  // Finance
  const getFinance = async (ago: AgoType) => getSectorData(ago, "Finance");
  // Consumer Services
  const getConsumerServices = async (ago: AgoType) =>
    getSectorData(ago, "Consumer Services");
  // Process Industries
  const getProcessIndustries = async (ago: AgoType) =>
    getSectorData(ago, "Process Industries");
  // Producer Manufacturing
  const getProducerManufacturing = async (ago: AgoType) =>
    getSectorData(ago, "Producer Manufacturing");
  // Commercial Services
  const getCommercialServices = async (ago: AgoType) =>
    getSectorData(ago, "Commercial Services");
  // Industrial Services
  const getIndustrialServices = async (ago: AgoType) =>
    getSectorData(ago, "Industrial Services");
  // Transportation
  const getTransportation = async (ago: AgoType) =>
    getSectorData(ago, "Transportation");
  // Miscellaneous
  const getMiscellaneous = async (ago: AgoType) =>
    getSectorData(ago, "Miscellaneous");
  // Consumer Non-Durables
  const getConsumerNonDurables = async (ago: AgoType) =>
    getSectorData(ago, "Consumer Non-Durables");
  // Health Services
  const getHealthServices = async (ago: AgoType) =>
    getSectorData(ago, "Health Services");
  // Retail Trade
  const getRetailTrade = async (ago: AgoType) =>
    getSectorData(ago, "Retail Trade");
  // Electronic Technology
  const getElectronicTechnology = async (ago: AgoType) =>
    getSectorData(ago, "Electronic Technology");

  return {
    getAll,
    getSoeul,
    getKosdaq,
    getNasdaq,
    getCommunications,
    getEnergyMinerals,
    getHealthTechnology,
    getNonEnergyMinerals,
    getUtilities,
    getConsumerDurables,
    getTechnologyServices,
    getDistributionServices,
    getFinance,
    getConsumerServices,
    getProcessIndustries,
    getProducerManufacturing,
    getCommercialServices,
    getIndustrialServices,
    getTransportation,
    getMiscellaneous,
    getConsumerNonDurables,
    getHealthServices,
    getRetailTrade,
    getElectronicTechnology,
  };
};
