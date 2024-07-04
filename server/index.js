const express = require('express');
const app = express();
const cors= require('cors');
const pool = require('./db');


app.use(cors());
app.use(express.json());

app.post('/listings', async (req, res) => {
    const { property_name, property_owner, property_locality } = req.body;
  
    try {
      const result = await pool.query(
        'INSERT INTO property (property_name, property_owner, property_locality) VALUES ($1, $2, $3) RETURNING *',
        [property_name, property_owner, property_locality]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  
  app.get('/listings', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM property');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/listings/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await pool.query('SELECT * FROM property WHERE property_id = $1', [id]);
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Property not found' });
      } else {
        res.json(result.rows[0]);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.put('/Listings/:id', async (req, res) => {
    const { id } = req.params;
    const { property_name, property_owner, property_locality } = req.body;
  
    try {
      const result = await pool.query(
        'UPDATE property SET property_name = $1, property_owner = $2, property_locality = $3 WHERE property_id = $4 RETURNING *',
        [property_name, property_owner, property_locality, id]
      );
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Property not found' });
      } else {
        res.json(result.rows[0]);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.delete('/listings/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await pool.query('DELETE FROM property WHERE property_id = $1 RETURNING *', [id]);
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Property not found' });
      } else {
        res.json('Property was successfully deleted');
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });




app.listen(5000,()=>{
    console.log('Server started on port 5000');
})