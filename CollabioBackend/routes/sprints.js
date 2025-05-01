const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Sprint = require('../models/Sprint');
const Project = require('../models/Project');
const Issue = require('../models/Issue');

// Projedeki tüm sprint'leri getir
router.get('/project/:projectId', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    
    if (!project) {
      return res.status(404).json({ error: 'Proje bulunamadı' });
    }

    // Proje üyesi veya sahibi değilse erişim engelle
    if (!project.members.includes(req.user._id) && project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Bu projeye erişim yetkiniz yok' });
    }

    const sprints = await Sprint.find({ project: req.params.projectId })
      .sort({ startDate: -1 });

    res.json(sprints);
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Yeni sprint oluştur
router.post('/', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.body.project);
    
    if (!project) {
      return res.status(404).json({ error: 'Proje bulunamadı' });
    }

    // Sadece proje sahibi veya PM sprint oluşturabilir
    if (project.owner.toString() !== req.user._id.toString() && req.user.role !== 'pm') {
      return res.status(403).json({ error: 'Bu işlem için yetkiniz yok' });
    }

    const sprint = new Sprint(req.body);
    await sprint.save();

    res.status(201).json(sprint);
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Sprint detaylarını getir
router.get('/:id', auth, async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.params.id);
    
    if (!sprint) {
      return res.status(404).json({ error: 'Sprint bulunamadı' });
    }

    const project = await Project.findById(sprint.project);
    
    // Proje üyesi veya sahibi değilse erişim engelle
    if (!project.members.includes(req.user._id) && project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Bu sprinte erişim yetkiniz yok' });
    }

    const issues = await Issue.find({ sprint: sprint._id })
      .populate('assignee', 'name email')
      .populate('reporter', 'name email');

    res.json({ sprint, issues });
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Sprint'i güncelle
router.put('/:id', auth, async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.params.id);
    
    if (!sprint) {
      return res.status(404).json({ error: 'Sprint bulunamadı' });
    }

    const project = await Project.findById(sprint.project);
    
    // Sadece proje sahibi veya PM sprint'i güncelleyebilir
    if (project.owner.toString() !== req.user._id.toString() && req.user.role !== 'pm') {
      return res.status(403).json({ error: 'Bu işlem için yetkiniz yok' });
    }

    const updatedSprint = await Sprint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedSprint);
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Sprint'e görev ekle
router.post('/:id/issues', auth, async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.params.id);
    
    if (!sprint) {
      return res.status(404).json({ error: 'Sprint bulunamadı' });
    }

    const project = await Project.findById(sprint.project);
    
    // Proje üyesi veya sahibi değilse erişim engelle
    if (!project.members.includes(req.user._id) && project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Bu sprinte erişim yetkiniz yok' });
    }

    const { issueId } = req.body;
    const issue = await Issue.findById(issueId);
    
    if (!issue) {
      return res.status(404).json({ error: 'Görev bulunamadı' });
    }

    if (issue.project.toString() !== sprint.project.toString()) {
      return res.status(400).json({ error: 'Görev bu projeye ait değil' });
    }

    issue.sprint = sprint._id;
    await issue.save();

    res.json(issue);
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Sprint'ten görev çıkar
router.delete('/:id/issues/:issueId', auth, async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.params.id);
    
    if (!sprint) {
      return res.status(404).json({ error: 'Sprint bulunamadı' });
    }

    const project = await Project.findById(sprint.project);
    
    // Proje üyesi veya sahibi değilse erişim engelle
    if (!project.members.includes(req.user._id) && project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Bu sprinte erişim yetkiniz yok' });
    }

    const issue = await Issue.findById(req.params.issueId);
    
    if (!issue) {
      return res.status(404).json({ error: 'Görev bulunamadı' });
    }

    if (issue.sprint.toString() !== sprint._id.toString()) {
      return res.status(400).json({ error: 'Görev bu sprinte ait değil' });
    }

    issue.sprint = null;
    await issue.save();

    res.json(issue);
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

module.exports = router; 