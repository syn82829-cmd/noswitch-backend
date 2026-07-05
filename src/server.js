import 'dotenv/config';

import cors from 'cors';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
  response.json({
    name: 'nazovi-soboy-backend',
    status: 'listening'
  });
});

app.get('/health', (request, response) => {
  response.json({ ok: true });
});

app.listen(port, () => {
  console.log(`Nazovi Soboy backend is listening on port ${port}`);
});
