CREATE TABLE public.stock_info (
	stock_code text NOT NULL,
	country text NULL,
	market text NULL,
	CONSTRAINT stock_info_pkey PRIMARY KEY (stock_code)
);