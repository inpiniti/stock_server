type AgoType =
  | "h1"
  | "d1"
  | "d2"
  | "d3"
  | "d4"
  | "d5"
  | "d6"
  | "1w"
  | "2w"
  | "3w"
  | "4w"
  | "1m"
  | "2m"
  | "3m"
  | "4m"
  | "5m"
  | "6m"
  | "7m"
  | "8m"
  | "9m"
  | "10m"
  | "11m";

const AgoTypeSeoulFiled: any = {
  h1: pgTableSeoul.change_1h,
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

export const useTrainingData = () => {
  const getSoeul = async (ago: AgoType) => {
    return await useGalaxy()
      .select()
      .from(pgTableSeoul)
      .where(isNotNull(AgoTypeSeoulFiled[ago]));
  };
  const getKosdaq = async (ago: AgoType) => {
    return await useGalaxy()
      .select()
      .from(pgTableKosdaq)
      .where(isNotNull(AgoTypeKosdaqFiled[ago]));
  };
  const getNasdaq = async (ago: AgoType) => {
    return await useGalaxy()
      .select()
      .from(pgTableNasdaq)
      .where(isNotNull(AgoTypeNasdaqFiled[ago]));
  };

  //Communications
  const getCommunications = async (ago: AgoType) => {
    const seoul = await useGalaxy()
      .select()
      .from(pgTableSeoul)
      .whereNotNull(`change_${ago}`)
      .andWhere("sector", "Communications");
  };
  //Energy Minerals
  const getEnergyMinerals = async (ago: AgoType) => {};
  // Health Technology
  const getHealthTechnology = async (ago: AgoType) => {};
  // Non-Energy Minerals
  const getNonEnergyMinerals = async (ago: AgoType) => {};
  // Utilities
  const getUtilities = async (ago: AgoType) => {};
  // Consumer Durables
  const getConsumerDurables = async (ago: AgoType) => {};
  // Technology Services
  const getTechnologyServices = async (ago: AgoType) => {};
  // Distribution Services
  const getDistributionServices = async (ago: AgoType) => {};
  // Finance
  const getFinance = async (ago: AgoType) => {};
  // Consumer Services
  const getConsumerServices = async (ago: AgoType) => {};
  // Process Industries
  const getProcessIndustries = async (ago: AgoType) => {};
  // Producer Manufacturing
  const getProducerManufacturing = async (ago: AgoType) => {};
  // Commercial Services
  const getCommercialServices = async (ago: AgoType) => {};
  // Industrial Services
  const getIndustrialServices = async (ago: AgoType) => {};
  // Transportation
  const getTransportation = async (ago: AgoType) => {};
  // Miscellaneous
  const getMiscellaneous = async (ago: AgoType) => {};
  // Consumer Non-Durables
  const getConsumerNonDurables = async (ago: AgoType) => {};
  // Health Services
  const getHealthServices = async (ago: AgoType) => {};
  // Retail Trade
  const getRetailTrade = async (ago: AgoType) => {};
  // Electronic Technology
  const getElectronicTechnology = async (ago: AgoType) => {};

  return {
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
