import { pgTable, text, serial, customType } from "drizzle-orm/pg-core";

const bytea = customType<{ data: Buffer; notNull: false; default: false }>({
  dataType() {
    return "bytea";
  },
});

export const pgTableAiModelsPrice = pgTable("ai_models_price", {
  model_id: serial("model_id").primaryKey(),
  model: bytea("model"),
  weights: bytea("weights"),
  market_sector: text("market_sector"),
  ago: text("ago"),
});

// CREATE TABLE public.stock_info (
// 	stock_code text NOT NULL,
// 	country text NULL,
// 	market text NULL,
// 	CONSTRAINT stock_info_pkey PRIMARY KEY (stock_code)
// );
