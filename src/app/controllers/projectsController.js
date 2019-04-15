const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Project = require('../models/projects');

const router = express.Router();
router.use(authMiddleware);

router.get('/', (req, res) => Project.find().populate('user')
  .then(projects => res.status(200).send({ projects }))
  .catch(err => res.status(400).send({ error: `Error loading new projects: ${err}` })));

router.post('/', (req, res) => Project.create({ ...req.body, user: req.userId })
  .then(project => res.status(200).send({ project }))
  .catch(err => res.status(400).send({ error: `Error creating new project: ${err}` })));

router.get('/:projectId', (req, res) => Project.findById(req.params.projectId).populate('user')
  .then(project => res.status(200).send({ project }))
  .catch(err => res.status(400).send({ error: `Error loading new project: ${err}` })));

router.put('/:projectId', async (req, res) => {
  res.send({ ok: true, userId: req.userId });
});

router.delete('/:projectId', (req, res) => Project.findByIdAndRemove(req.params.projectId)
  .then(() => res.status(200).send())
  .catch(err => res.status(400).send({ error: `Error removing new project: ${err}` })));

module.exports = app => app.use('/projects', router);
