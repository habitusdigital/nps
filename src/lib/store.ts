import { appendFile, mkdir } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "submissions.jsonl");

export async function appendSubmission(record: Record<string, unknown>): Promise<void> {
  try {
    await mkdir(DATA_DIR, { recursive: true });
    await appendFile(DATA_FILE, JSON.stringify(record) + "\n", "utf8");
  } catch (err) {
    console.error("[store] failed to persist submission locally:", err);
  }
}
