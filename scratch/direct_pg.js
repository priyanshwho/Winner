const { Client } = require('pg');

const url = "postgresql://neondb_owner:REDACTED_PASSWORD@ep-frosty-moon-atf8ukaa-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

async function main() {
  const client = new Client({ connectionString: url });
  try {
    await client.connect();
    const res = await client.query('SELECT * FROM "user"');
    console.log('Users:');
    for (const u of res.rows) {
      console.log(`- ID: ${u.id}, Name: ${u.name}, Email: ${u.email}`);
    }
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await client.end();
  }
}

main();
