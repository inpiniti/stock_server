import { pgTable, text } from "drizzle-orm/pg-core";

export const pgTableStockInfo = pgTable("stock_info", {
  stock_code: text("stock_code").notNull(),
  country: text("country"),
  market: text("market"),
});

// CREATE TABLE public.stock_info (
// 	stock_code text NOT NULL,
// 	country text NULL,
// 	market text NULL,
// 	CONSTRAINT stock_info_pkey PRIMARY KEY (stock_code)
// );
