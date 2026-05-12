import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logDirectory = path.join(__dirname, '..', '..', 'logs');

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), {
  flags: 'a'
});

morgan.token('body-email', (req) => req.body?.email || '-');

export const requestLogger = [
  morgan('combined', { stream: accessLogStream }),
  morgan(':method :url :status :response-time ms - :remote-addr - email=:body-email')
];
