CREATE TABLE public.nasdaq (
    "name" text NOT NULL,
    description text NULL,
    logoid text NULL,
    update_mode text NULL,
    "type" text NULL,
    "close" numeric NULL,
    pricescale numeric NULL,
    minmov numeric NULL,
    fractional text NULL,
    minmove2 numeric NULL,
    currency text NULL,
    "change" numeric NULL,
    volume numeric NOT NULL,
    relative_volume_10d_calc numeric NULL,
    market_cap_basic numeric NULL,
    fundamental_currency_code text NULL,
    price_earnings_ttm numeric NULL,
    earnings_per_share_diluted_ttm numeric NULL,
    earnings_per_share_diluted_yoy_growth_ttm numeric NULL,
    dividends_yield_current numeric NULL,
    sector_tr text NULL,
    market text NULL,
    sector text NULL,
    recommendation_mark numeric NULL,
    exchange text NULL,
    perf_w numeric NULL,
    perf_1_m numeric NULL,
    perf_3_m numeric NULL,
    perf_6_m numeric NULL,
    perf_y_t_d numeric NULL,
    perf_y numeric NULL,
    perf_5_y numeric NULL,
    perf_10_y numeric NULL,
    perf_all numeric NULL,
    volatility_w numeric NULL,
    volatility_m numeric NULL,
    premarket_close numeric NULL,
    premarket_change numeric NULL,
    premarket_gap numeric NULL,
    premarket_volume numeric NULL,
    gap numeric NULL,
    volume_change numeric NULL,
    postmarket_close numeric NULL,
    postmarket_change numeric NULL,
    postmarket_volume numeric NULL,
    perf_1_y_market_cap numeric NULL,
    price_earnings_growth_ttm numeric NULL,
    price_sales_current numeric NULL,
    price_book_fq numeric NULL,
    price_to_cash_f_operating_activities_ttm numeric NULL,
    price_free_cash_flow_ttm numeric NULL,
    price_to_cash_ratio numeric NULL,
    enterprise_value_current numeric NULL,
    enterprise_value_to_revenue_ttm numeric NULL,
    enterprise_value_to_ebit_ttm numeric NULL,
    enterprise_value_ebitda_ttm numeric NULL,
    dps_common_stock_prim_issue_fy numeric NULL,
    dps_common_stock_prim_issue_fq numeric NULL,
    dividends_yield numeric NULL,
    dividend_payout_ratio_ttm numeric NULL,
    dps_common_stock_prim_issue_yoy_growth_fy numeric NULL,
    continuous_dividend_payout numeric NULL,
    continuous_dividend_growth numeric NULL,
    gross_margin_ttm numeric NULL,
    operating_margin_ttm numeric NULL,
    pre_tax_margin_ttm numeric NULL,
    net_margin_ttm numeric NULL,
    free_cash_flow_margin_ttm numeric NULL,
    return_on_assets_fq numeric NULL,
    return_on_equity_fq numeric NULL,
    return_on_invested_capital_fq numeric NULL,
    research_and_dev_ratio_ttm numeric NULL,
    sell_gen_admin_exp_other_ratio_ttm numeric NULL,
    total_assets_fq numeric NULL,
    total_current_assets_fq numeric NULL,
    cash_n_short_term_invest_fq numeric NULL,
    total_liabilities_fq numeric NULL,
    total_debt_fq numeric NULL,
    net_debt_fq numeric NULL,
    total_equity_fq numeric NULL,
    current_ratio_fq numeric NULL,
    quick_ratio_fq numeric NULL,
    debt_to_equity_fq numeric NULL,
    cash_n_short_term_invest_to_total_debt_fq numeric NULL,
    cash_f_operating_activities_ttm numeric NULL,
    cash_f_investing_activities_ttm numeric NULL,
    cash_f_financing_activities_ttm numeric NULL,
    free_cash_flow_ttm numeric NULL,
    capital_expenditures_ttm numeric NULL,
    recommend_all numeric NULL,
    recommend_m_a numeric NULL,
    recommend_other numeric NULL,
    r_s_i numeric NULL,
    mom numeric NULL,
    a_o numeric NULL,
    c_c_i20 numeric NULL,
    stoch_k numeric NULL,
    stoch_d numeric NULL,
    change_10m numeric NULL,
    change_11m numeric NULL,
    change_1d numeric NULL,
    change_1h numeric NULL,
    change_1m numeric NULL,
    change_1w numeric NULL,
    change_2d numeric NULL,
    change_2m numeric NULL,
    change_2w numeric NULL,
    change_3d numeric NULL,
    change_3m numeric NULL,
    change_3w numeric NULL,
    change_4d numeric NULL,
    change_4m numeric NULL,
    change_4w numeric NULL,
    change_5d numeric NULL,
    change_5m numeric NULL,
    change_6d numeric NULL,
    change_6m numeric NULL,
    change_7m numeric NULL,
    change_8m numeric NULL,
    change_9m numeric NULL,
    created_at timestamp NOT NULL DEFAULT now(),
    CONSTRAINT nasdaq_pkey PRIMARY KEY (name, volume, created_at)
);

CREATE INDEX nasdaq_change_10m_idx ON public.nasdaq USING btree (change_10m);
CREATE INDEX nasdaq_change_11m_idx ON public.nasdaq USING btree (change_11m);
CREATE INDEX nasdaq_change_1d_idx ON public.nasdaq USING btree (change_1d);
CREATE INDEX nasdaq_change_1h_idx ON public.nasdaq USING btree (change_1h);
CREATE INDEX nasdaq_change_1m_idx ON public.nasdaq USING btree (change_1m);
CREATE INDEX nasdaq_change_1w_idx ON public.nasdaq USING btree (change_1w);
CREATE INDEX nasdaq_change_2d_idx ON public.nasdaq USING btree (change_2d);
CREATE INDEX nasdaq_change_2m_idx ON public.nasdaq USING btree (change_2m);
CREATE INDEX nasdaq_change_2w_idx ON public.nasdaq USING btree (change_2w);
CREATE INDEX nasdaq_change_3d_idx ON public.nasdaq USING btree (change_3d);
CREATE INDEX nasdaq_change_3m_idx ON public.nasdaq USING btree (change_3m);
CREATE INDEX nasdaq_change_3w_idx ON public.nasdaq USING btree (change_3w);
CREATE INDEX nasdaq_change_4d_idx ON public.nasdaq USING btree (change_4d);
CREATE INDEX nasdaq_change_4m_idx ON public.nasdaq USING btree (change_4m);
CREATE INDEX nasdaq_change_4w_idx ON public.nasdaq USING btree (change_4w);
CREATE INDEX nasdaq_change_5d_idx ON public.nasdaq USING btree (change_5d);
CREATE INDEX nasdaq_change_5m_idx ON public.nasdaq USING btree (change_5m);
CREATE INDEX nasdaq_change_6d_idx ON public.nasdaq USING btree (change_6d);
CREATE INDEX nasdaq_change_6m_idx ON public.nasdaq USING btree (change_6m);
CREATE INDEX nasdaq_change_7m_idx ON public.nasdaq USING btree (change_7m);
CREATE INDEX nasdaq_change_8m_idx ON public.nasdaq USING btree (change_8m);
CREATE INDEX nasdaq_change_9m_idx ON public.nasdaq USING btree (change_9m);

ALTER TABLE nasdaq ADD COLUMN change_2h numeric NULL;
ALTER TABLE nasdaq ADD COLUMN change_3h numeric NULL;
ALTER TABLE nasdaq ADD COLUMN change_4h numeric NULL;
ALTER TABLE nasdaq ADD COLUMN change_5h numeric NULL;
ALTER TABLE nasdaq ADD COLUMN change_6h numeric NULL;
ALTER TABLE nasdaq ADD COLUMN change_7h numeric NULL;
ALTER TABLE nasdaq ADD COLUMN change_8h numeric NULL;
ALTER TABLE nasdaq ADD COLUMN change_9h numeric NULL;
ALTER TABLE nasdaq ADD COLUMN change_10h numeric NULL;
ALTER TABLE nasdaq ADD COLUMN change_11h numeric NULL;
ALTER TABLE nasdaq ADD COLUMN change_12h numeric NULL;
ALTER TABLE nasdaq ADD COLUMN change_13h numeric NULL;
ALTER TABLE nasdaq ADD COLUMN change_14h numeric NULL;
ALTER TABLE nasdaq ADD COLUMN change_15h numeric NULL;
ALTER TABLE nasdaq ADD COLUMN change_16h numeric NULL;
ALTER TABLE nasdaq ADD COLUMN change_17h numeric NULL;
ALTER TABLE nasdaq ADD COLUMN change_18h numeric NULL;
ALTER TABLE nasdaq ADD COLUMN change_19h numeric NULL;
ALTER TABLE nasdaq ADD COLUMN change_20h numeric NULL;
ALTER TABLE nasdaq ADD COLUMN change_21h numeric NULL;
ALTER TABLE nasdaq ADD COLUMN change_22h numeric NULL;
ALTER TABLE nasdaq ADD COLUMN change_23h numeric NULL;

