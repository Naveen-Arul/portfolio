import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/leetcode', async (req, res) => {
  const { query, variables } = req.body;
  const response = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const data = await response.json();
  res.json(data);
});

const PORT = 4000;
app.listen(PORT, () => console.log(`LeetCode proxy running on port ${PORT}`)); 