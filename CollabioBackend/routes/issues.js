const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Issue = require('../models/Issue');
const Project = require('../models/Project');

// Projedeki tüm görevleri getir
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

    const issues = await Issue.find({ project: req.params.projectId })
      .populate('assignee', 'name email')
      .populate('reporter', 'name email')
      .populate('sprint', 'name')
      .sort({ createdAt: -1 });

    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Yeni görev oluştur
router.post('/', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.body.project);
    
    if (!project) {
      return res.status(404).json({ error: 'Proje bulunamadı' });
    }

    // Proje üyesi veya sahibi değilse erişim engelle
    if (!project.members.includes(req.user._id) && project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Bu projeye erişim yetkiniz yok' });
    }

    const issue = new Issue({
      ...req.body,
      reporter: req.user._id
    });
    await issue.save();

    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Görev detaylarını getir
router.get('/:id', auth, async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate('assignee', 'name email')
      .populate('reporter', 'name email')
      .populate('sprint', 'name')
      .populate('comments.user', 'name email');
    
    if (!issue) {
      return res.status(404).json({ error: 'Görev bulunamadı' });
    }

    const project = await Project.findById(issue.project);
    
    // Proje üyesi veya sahibi değilse erişim engelle
    if (!project.members.includes(req.user._id) && project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Bu göreve erişim yetkiniz yok' });
    }

    res.json(issue);
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Görevi güncelle
router.put('/:id', auth, async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    
    if (!issue) {
      return res.status(404).json({ error: 'Görev bulunamadı' });
    }

    const project = await Project.findById(issue.project);
    
    // Proje üyesi veya sahibi değilse erişim engelle
    if (!project.members.includes(req.user._id) && project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Bu göreve erişim yetkiniz yok' });
    }

    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    .populate('assignee', 'name email')
    .populate('reporter', 'name email')
    .populate('sprint', 'name')
    .populate('comments.user', 'name email');

    res.json(updatedIssue);
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Göreve yorum ekle
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    
    if (!issue) {
      return res.status(404).json({ error: 'Görev bulunamadı' });
    }

    const project = await Project.findById(issue.project);
    
    // Proje üyesi veya sahibi değilse erişim engelle
    if (!project.members.includes(req.user._id) && project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Bu göreve erişim yetkiniz yok' });
    }

    issue.comments.push({
      user: req.user._id,
      content: req.body.content
    });
    await issue.save();

    const updatedIssue = await Issue.findById(req.params.id)
      .populate('assignee', 'name email')
      .populate('reporter', 'name email')
      .populate('sprint', 'name')
      .populate('comments.user', 'name email');

    res.json(updatedIssue);
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

module.exports = router; 