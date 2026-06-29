import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const env = Object.fromEntries(
  readFileSync(".env", "utf-8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#") && l.trim())
    .map((l) => {
      const idx = l.indexOf("=");
      const k = l.slice(0, idx).trim();
      const v = l.slice(idx + 1).trim().replace(/^"|"$/g, "");
      return [k, v];
    })
);

const url = env.SUPABASE_URL;
const key = env.SUPABASE_PUBLISHABLE_KEY;

console.log("🔗 Supabase URL:", url);

if (!url || !key) {
  console.error("❌ Missing SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY in .env");
  process.exit(1);
}

const supabase = createClient(url, key);

const { data, error } = await supabase.from("profiles").select("count").limit(1);

if (error) {
  if (error.code === "42P01") {
    console.log("✅ Connected to Supabase! (table 'profiles' not found but DB responded)");
  } else if (error.message.includes("fetch") || error.message.includes("network")) {
    console.log("❌ Cannot reach Supabase — check your URL or internet connection");
    console.log("   Error:", error.message);
  } else {
    console.log("✅ Connected to Supabase! DB response:", error.code, "-", error.message);
  }
} else {
  console.log("✅ Connected to Supabase! Rows returned:", JSON.stringify(data));
}
