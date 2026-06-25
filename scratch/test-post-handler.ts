import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load env
const envFiles = ['.env.local', '.env', '.env.production'];
for (const file of envFiles) {
  const p = path.resolve(process.cwd(), file);
  if (fs.existsSync(p)) {
    dotenv.config({ path: p, override: true });
    if (process.env.DATABASE_URL) {
      break;
    }
  }
}

async function main() {
  // Dynamically import the POST handler
  const { POST } = await import('../app/api/chat/route');
  
  console.log('Successfully imported POST handler!');
}

main().catch(console.error);
