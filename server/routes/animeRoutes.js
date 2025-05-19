require('dotenv').config(); // Load environment variables

console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY ? 'Exists ✅' : 'Missing ❌');

const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// 🔍 Log all incoming requests to /api/anime
router.use((req, res, next) => {
  console.log(`📥 Incoming request to /api/anime - ${req.method}`);
  next();
});

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// GET all anime from Supabase
router.get('/', async (req, res) => {
  console.log('📥 GET /api/anime');
  const { data, error } = await supabase.from('anime').select('*');

  if (error) {
    console.error('❌ Supabase fetch error:', error.message);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// POST a new anime to Supabase
router.post('/', async (req, res) => {
  console.log('📩 POST /api/anime');
  console.log('Request body:', req.body);

  const { title, genre } = req.body;

  // Validate input
  if (!title || !genre) {
    console.error('❌ Missing title or genre in request body');
    return res.status(400).json({ error: 'Title and genre are required' });
  }

  // Insert into Supabase
  const { data, error } = await supabase
    .from('anime')
    .insert([{ title, genre }]);

  if (error) {
    console.error('❌ Supabase insert error:', error.message, error.details || '');
    return res.status(500).json({ error: error.message });
  }

  console.log('✅ Anime inserted successfully:', data);
  res.status(201).json(data);
});

module.exports = router;
