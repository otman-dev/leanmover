import Groq from "groq-sdk";
import dotenv from "dotenv";

// Load environment variables in non-Next.js context (scripts)
if (!process.env.NEXT_RUNTIME) {
  dotenv.config({ path: '.env.local' });
}

if (!process.env.GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is not set in environment variables");
}

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const GROQ_MODEL = "llama-3.3-70b-versatile"; // Updated model (FREE & powerful)
