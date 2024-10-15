CREATE TABLE public.ai_models_price (
	model_id serial4 NOT NULL,
	model bytea NULL,
	weights bytea NULL,
	market_sector text NULL,
	ago text NULL,
	CONSTRAINT ai_models_price_pkey PRIMARY KEY (model_id)
);
CREATE INDEX ai_models_price_ago_idx ON public.ai_models_price USING btree (ago);
CREATE INDEX ai_models_price_market_sector_idx ON public.ai_models_price USING btree (market_sector);