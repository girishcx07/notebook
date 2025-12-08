import { config } from "dotenv";
import { db } from ".";
import { note, user, workspace, workspaceMember } from "./schema";

import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, "../../../apps/web/.env");
console.log("Current directory:", process.cwd());
console.log("Looking for .env at:", envPath);

if (fs.existsSync(envPath)) {
  console.log("Found .env file");
  config({ path: envPath });
} else {
  console.error("❌ .env file not found at:", envPath);
}

async function main() {
  console.log("🌱 Seeding database...");

  const [firstUser] = await db.select().from(user).limit(1);

  if (!firstUser) {
    console.error("❌ No user found. Please sign up first.");
    process.exit(1);
  }

  console.log(`👤 Found user: ${firstUser.name} (${firstUser.id})`);

  const notesToInsert = Array.from({ length: 10 }).map((_, i) => ({
    title: `Note ${i + 1}`,
    content: `This is the content for note ${i + 1}. It contains some dummy text to verify the fetching functionality.`,
    createdBy: firstUser.id,
    updatedBy: firstUser.id,
    status: "private" as const,
    pinned: i < 2, // Pin the first 2 notes
  }));

  await db.insert(note).values(notesToInsert);
  console.log("✅ Successfully added 10 notes!");

  console.log("🏢 Seeding workspaces...");

  const workspacesToInsert = Array.from({ length: 10 }).map((_, i) => {
    const workspaceId = crypto.randomUUID();
    return {
      workspace: {
        id: workspaceId,
        name: `Workspace ${i + 1}`,
        description: `Description for Workspace ${i + 1}`,
        visibility: "private" as const,
        createdBy: firstUser.id,
      },
      member: {
        id: crypto.randomUUID(),
        userId: firstUser.id,
        workspaceId: workspaceId,
        role: "admin",
        status: "active" as const,
      },
    };
  });

  // Insert workspaces
  await db.insert(workspace).values(workspacesToInsert.map((w) => w.workspace));

  // Insert members
  await db
    .insert(workspaceMember)
    .values(workspacesToInsert.map((w) => w.member));

  console.log("✅ Successfully added 10 workspaces!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
