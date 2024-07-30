import { createClient } from "@supabase/supabase-js";

let supabaseClient: any;

const Reference_ID = "hgzzjhjgefunjjtajsgo";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnenpqaGpnZWZ1bmpqdGFqc2dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg2MjQ2NDcsImV4cCI6MjAzNDIwMDY0N30.hkd9fEpbYcaFuflCqsZm76ykMX0QJBlh023FsC6O0JM";

export const useSupabase = () => {
  if (!supabaseClient) {
    supabaseClient = createClient(
      `https://${Reference_ID}.supabase.co`,
      supabaseKey
    );
  }

  return supabaseClient;
};
