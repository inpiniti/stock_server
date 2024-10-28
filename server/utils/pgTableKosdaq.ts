import { pgTable, text, numeric, timestamp } from "drizzle-orm/pg-core";

export const pgTableKosdaq = pgTable("kosdaq", {
  name: text("name").notNull(),
  description: text("description"),
  logoid: text("logoid"),
  update_mode: text("update_mode"),
  type: text("type"),
  close: numeric("close"),
  pricescale: numeric("pricescale"),
  minmov: numeric("minmov"),
  fractional: text("fractional"),
  minmove2: numeric("minmove2"),
  currency: text("currency"),
  change: numeric("change"),
  volume: numeric("volume").notNull(),
  relative_volume_10d_calc: numeric("relative_volume_10d_calc"),
  market_cap_basic: numeric("market_cap_basic"),
  fundamental_currency_code: text("fundamental_currency_code"),
  price_earnings_ttm: numeric("price_earnings_ttm"),
  earnings_per_share_diluted_ttm: numeric("earnings_per_share_diluted_ttm"),
  earnings_per_share_diluted_yoy_growth_ttm: numeric(
    "earnings_per_share_diluted_yoy_growth_ttm"
  ),
  dividends_yield_current: numeric("dividends_yield_current"),
  sector_tr: text("sector_tr"),
  market: text("market"),
  sector: text("sector"),
  recommendation_mark: numeric("recommendation_mark"),
  exchange: text("exchange"),
  perf_w: numeric("perf_w"),
  perf_1_m: numeric("perf_1_m"),
  perf_3_m: numeric("perf_3_m"),
  perf_6_m: numeric("perf_6_m"),
  perf_y_t_d: numeric("perf_y_t_d"),
  perf_y: numeric("perf_y"),
  perf_5_y: numeric("perf_5_y"),
  perf_10_y: numeric("perf_10_y"),
  perf_all: numeric("perf_all"),
  volatility_w: numeric("volatility_w"),
  volatility_m: numeric("volatility_m"),
  gap: numeric("gap"),
  volume_change: numeric("volume_change"),
  perf_1_y_market_cap: numeric("perf_1_y_market_cap"),
  price_earnings_growth_ttm: numeric("price_earnings_growth_ttm"),
  price_sales_current: numeric("price_sales_current"),
  price_book_fq: numeric("price_book_fq"),
  price_to_cash_f_operating_activities_ttm: numeric(
    "price_to_cash_f_operating_activities_ttm"
  ),
  price_free_cash_flow_ttm: numeric("price_free_cash_flow_ttm"),
  price_to_cash_ratio: numeric("price_to_cash_ratio"),
  enterprise_value_current: numeric("enterprise_value_current"),
  enterprise_value_to_revenue_ttm: numeric("enterprise_value_to_revenue_ttm"),
  enterprise_value_to_ebit_ttm: numeric("enterprise_value_to_ebit_ttm"),
  enterprise_value_ebitda_ttm: numeric("enterprise_value_ebitda_ttm"),
  dps_common_stock_prim_issue_fy: numeric("dps_common_stock_prim_issue_fy"),
  dividends_yield: numeric("dividends_yield"),
  dividend_payout_ratio_ttm: numeric("dividend_payout_ratio_ttm"),
  dps_common_stock_prim_issue_yoy_growth_fy: numeric(
    "dps_common_stock_prim_issue_yoy_growth_fy"
  ),
  continuous_dividend_payout: numeric("continuous_dividend_payout"),
  continuous_dividend_growth: numeric("continuous_dividend_growth"),
  gross_margin_ttm: numeric("gross_margin_ttm"),
  operating_margin_ttm: numeric("operating_margin_ttm"),
  pre_tax_margin_ttm: numeric("pre_tax_margin_ttm"),
  net_margin_ttm: numeric("net_margin_ttm"),
  free_cash_flow_margin_ttm: numeric("free_cash_flow_margin_ttm"),
  return_on_assets_fq: numeric("return_on_assets_fq"),
  return_on_equity_fq: numeric("return_on_equity_fq"),
  return_on_invested_capital_fq: numeric("return_on_invested_capital_fq"),
  research_and_dev_ratio_ttm: numeric("research_and_dev_ratio_ttm"),
  sell_gen_admin_exp_other_ratio_ttm: numeric(
    "sell_gen_admin_exp_other_ratio_ttm"
  ),
  total_assets_fq: numeric("total_assets_fq"),
  total_current_assets_fq: numeric("total_current_assets_fq"),
  cash_n_short_term_invest_fq: numeric("cash_n_short_term_invest_fq"),
  total_liabilities_fq: numeric("total_liabilities_fq"),
  total_debt_fq: numeric("total_debt_fq"),
  net_debt_fq: numeric("net_debt_fq"),
  total_equity_fq: numeric("total_equity_fq"),
  current_ratio_fq: numeric("current_ratio_fq"),
  quick_ratio_fq: numeric("quick_ratio_fq"),
  debt_to_equity_fq: numeric("debt_to_equity_fq"),
  cash_n_short_term_invest_to_total_debt_fq: numeric(
    "cash_n_short_term_invest_to_total_debt_fq"
  ),
  cash_f_operating_activities_ttm: numeric("cash_f_operating_activities_ttm"),
  cash_f_investing_activities_ttm: numeric("cash_f_investing_activities_ttm"),
  cash_f_financing_activities_ttm: numeric("cash_f_financing_activities_ttm"),
  free_cash_flow_ttm: numeric("free_cash_flow_ttm"),
  capital_expenditures_ttm: numeric("capital_expenditures_ttm"),
  recommend_all: numeric("recommend_all"),
  recommend_m_a: numeric("recommend_m_a"),
  recommend_other: numeric("recommend_other"),
  r_s_i: numeric("r_s_i"),
  mom: numeric("mom"),
  a_o: numeric("a_o"),
  c_c_i20: numeric("c_c_i20"),
  stoch_k: numeric("stoch_k"),
  stoch_d: numeric("stoch_d"),
  created_at: timestamp("created_at").notNull(),
  change_1h: numeric("change_1h"),
  change_2h: numeric("change_2h"),
  change_3h: numeric("change_3h"),
  change_4h: numeric("change_4h"),
  change_5h: numeric("change_5h"),
  change_6h: numeric("change_6h"),
  change_7h: numeric("change_7h"),
  change_8h: numeric("change_8h"),
  change_9h: numeric("change_9h"),
  change_10h: numeric("change_10h"),
  change_11h: numeric("change_11h"),
  change_12h: numeric("change_12h"),
  change_13h: numeric("change_13h"),
  change_14h: numeric("change_14h"),
  change_15h: numeric("change_15h"),
  change_16h: numeric("change_16h"),
  change_17h: numeric("change_17h"),
  change_18h: numeric("change_18h"),
  change_19h: numeric("change_19h"),
  change_20h: numeric("change_20h"),
  change_21h: numeric("change_21h"),
  change_22h: numeric("change_22h"),
  change_23h: numeric("change_23h"),
  change_1d: numeric("change_1d"),
  change_2d: numeric("change_2d"),
  change_3d: numeric("change_3d"),
  change_4d: numeric("change_4d"),
  change_5d: numeric("change_5d"),
  change_6d: numeric("change_6d"),
  change_1w: numeric("change_1w"),
  change_2w: numeric("change_2w"),
  change_3w: numeric("change_3w"),
  change_4w: numeric("change_4w"),
  change_1m: numeric("change_1m"),
  change_2m: numeric("change_2m"),
  change_3m: numeric("change_3m"),
  change_4m: numeric("change_4m"),
  change_5m: numeric("change_5m"),
  change_6m: numeric("change_6m"),
  change_7m: numeric("change_7m"),
  change_8m: numeric("change_8m"),
  change_9m: numeric("change_9m"),
  change_10m: numeric("change_10m"),
  change_11m: numeric("change_11m"),
});

// CREATE TABLE public.kr_seoul (
// 	"name" text NOT NULL,
// 	description text NULL,
// 	logoid text NULL,
// 	update_mode text NULL,
// 	"type" text NULL,
// 	"close" numeric NULL,
// 	pricescale numeric NULL,
// 	minmov numeric NULL,
// 	fractional text NULL,
// 	minmove2 numeric NULL,
// 	currency text NULL,
// 	"change" numeric NULL,
// 	volume numeric NOT NULL,
// 	relative_volume_10d_calc numeric NULL,
// 	market_cap_basic numeric NULL,
// 	fundamental_currency_code text NULL,
// 	price_earnings_ttm numeric NULL,
// 	earnings_per_share_diluted_ttm numeric NULL,
// 	earnings_per_share_diluted_yoy_growth_ttm numeric NULL,
// 	dividends_yield_current numeric NULL,
// 	sector_tr text NULL,
// 	market text NULL,
// 	sector text NULL,
// 	recommendation_mark numeric NULL,
// 	exchange text NULL,
// 	perf_w numeric NULL,
// 	perf_1_m numeric NULL,
// 	perf_3_m numeric NULL,
// 	perf_6_m numeric NULL,
// 	perf_y_t_d numeric NULL,
// 	perf_y numeric NULL,
// 	perf_5_y numeric NULL,
// 	perf_10_y numeric NULL,
// 	perf_all numeric NULL,
// 	volatility_w numeric NULL,
// 	volatility_m numeric NULL,
// 	gap numeric NULL,
// 	volume_change numeric NULL,
// 	perf_1_y_market_cap numeric NULL,
// 	price_earnings_growth_ttm numeric NULL,
// 	price_sales_current numeric NULL,
// 	price_book_fq numeric NULL,
// 	price_to_cash_f_operating_activities_ttm numeric NULL,
// 	price_free_cash_flow_ttm numeric NULL,
// 	price_to_cash_ratio numeric NULL,
// 	enterprise_value_current numeric NULL,
// 	enterprise_value_to_revenue_ttm numeric NULL,
// 	enterprise_value_to_ebit_ttm numeric NULL,
// 	enterprise_value_ebitda_ttm numeric NULL,
// 	dps_common_stock_prim_issue_fy numeric NULL,
// 	dividends_yield numeric NULL,
// 	dividend_payout_ratio_ttm numeric NULL,
// 	dps_common_stock_prim_issue_yoy_growth_fy numeric NULL,
// 	continuous_dividend_payout numeric NULL,
// 	continuous_dividend_growth numeric NULL,
// 	gross_margin_ttm numeric NULL,
// 	operating_margin_ttm numeric NULL,
// 	pre_tax_margin_ttm numeric NULL,
// 	net_margin_ttm numeric NULL,
// 	free_cash_flow_margin_ttm numeric NULL,
// 	return_on_assets_fq numeric NULL,
// 	return_on_equity_fq numeric NULL,
// 	return_on_invested_capital_fq numeric NULL,
// 	research_and_dev_ratio_ttm numeric NULL,
// 	sell_gen_admin_exp_other_ratio_ttm numeric NULL,
// 	total_assets_fq numeric NULL,
// 	total_current_assets_fq numeric NULL,
// 	cash_n_short_term_invest_fq numeric NULL,
// 	total_liabilities_fq numeric NULL,
// 	total_debt_fq numeric NULL,
// 	net_debt_fq numeric NULL,
// 	total_equity_fq numeric NULL,
// 	current_ratio_fq numeric NULL,
// 	quick_ratio_fq numeric NULL,
// 	debt_to_equity_fq numeric NULL,
// 	cash_n_short_term_invest_to_total_debt_fq numeric NULL,
// 	cash_f_operating_activities_ttm numeric NULL,
// 	cash_f_investing_activities_ttm numeric NULL,
// 	cash_f_financing_activities_ttm numeric NULL,
// 	free_cash_flow_ttm numeric NULL,
// 	capital_expenditures_ttm numeric NULL,
// 	recommend_all numeric NULL,
// 	recommend_m_a numeric NULL,
// 	recommend_other numeric NULL,
// 	r_s_i numeric NULL,
// 	mom numeric NULL,
// 	a_o numeric NULL,
// 	c_c_i20 numeric NULL,
// 	stoch_k numeric NULL,
// 	stoch_d numeric NULL,
// 	created_at timestamp NOT NULL DEFAULT now(),
// 	CONSTRAINT kr_seoul_pkey PRIMARY KEY (name, volume, created_at)
// );
