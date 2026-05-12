import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDirectory = path.join(__dirname, '..', 'data');
const usersPath = path.join(dataDirectory, 'users.json');

export async function readUsers() {
  try {
    const raw = await fs.readFile(usersPath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await writeUsers([]);
      return [];
    }

    throw error;
  }
}

export async function writeUsers(users) {
  await fs.mkdir(dataDirectory, { recursive: true });
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
}
