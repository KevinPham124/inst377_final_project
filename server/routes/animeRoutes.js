require('dotenv').config(); // <- force .env load
console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY ? 'Exists ✅' : 'Missing ❌');

const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('anime').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

router.post('/', async (req, res) => {
  const { title, genre } = req.body;
  const { data, error } = await supabase.from('anime').insert([{ title, genre }]);
  if (error) return res.status(500).json({ error });
  res.status(201).json(data);
});

module.exports = router;