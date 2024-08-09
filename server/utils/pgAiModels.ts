import { pgTable, text, numeric } from "drizzle-orm/pg-core";

export const pgAiModel = pgTable("ai_models", {
  model_id: numeric("model_id").notNull(),
  model: text("model"),
  market_sector: text("market_sector"),
  ago: text("ago"),
  weights: text("weights"), // weights 필드 추가
});

// CREATE TABLE public.ai_models (
// 	model_id serial4 NOT NULL,
// 	model bytea NULL,
// 	market_sector text NULL,
// 	ago text NULL,
// 	CONSTRAINT ai_models_pkey PRIMARY KEY (model_id)
// );
