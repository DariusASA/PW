const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://DariusPW:darius26@pw.1gjgqfw.mongodb.net/?appName=PW')
  .then(function() { console.log('Conectat la MongoDB Atlas!'); })
  .catch(function(err) { console.error('Eroare conectare MongoDB:', err); });

const Project = require('./models/Project');

app.get('/api/projects', async function(req, res) {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Eroare ' + err });
  }
});

app.post('/api/projects', async function(req, res) {
  try {
    const newProject = new Project({
      title: req.body.title,
      tech: req.body.tech,
      done: req.body.done || false,
    });
    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/projects/:id', async function(req, res) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Proiectul nu a fost gasit' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Eroare ' + err });
  }
});

app.put('/api/projects/:id', async function(req, res) {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/projects/:id', async function(req, res) {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Proiectul nu a fost gasit' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Eroare ' + err });
  }
});

app.get('/api/stats', async function(req, res) {
  try {
    const total = await Project.countDocuments();
    const done = await Project.countDocuments({ done: true });
    res.json({ total: total, done: done, inProgress: total - done });
  } catch (err) {
    res.status(500).json({ error: 'Eroare server: ' + err });
  }
});

app.listen(3000, function() {
  console.log('Server pornit pe http://localhost:3000');
});
