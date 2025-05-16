const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth');
const Project = require('../models/Project');
const User = require('../models/User');

// Tüm projeleri getir
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { owner: req.user._id },
        { members: req.user._id }
      ]
    }).populate('owner', 'name email').populate('members', 'name email');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Yeni proje oluştur
router.post('/', auth, async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      owner: req.user._id,
      members: [req.user._id]
    });
    await project.save();
    
    // Kullanıcının projeler listesine ekle
    await User.findByIdAndUpdate(req.user._id, {
      $push: { projects: project._id }
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Proje detaylarını getir
router.get('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'name email')
      .populate('members', 'name email');
    
    if (!project) {
      return res.status(404).json({ error: 'Proje bulunamadı' });
    }

    // Proje üyesi veya sahibi değilse erişim engelle
    if (!project.members.includes(req.user._id) && project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Bu projeye erişim yetkiniz yok' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Projeyi güncelle
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ error: 'Proje bulunamadı' });
    }

    // Sadece proje sahibi güncelleyebilir
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Bu işlem için yetkiniz yok' });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('owner', 'name email').populate('members', 'name email');

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Projeye üye ekle
router.post('/:id/members', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ error: 'Proje bulunamadı' });
    }

    // Sadece proje sahibi veya PM üye ekleyebilir
    if (project.owner.toString() !== req.user._id.toString() && req.user.role !== 'pm') {
      return res.status(403).json({ error: 'Bu işlem için yetkiniz yok' });
    }

    const { userId } = req.body;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    if (project.members.includes(userId)) {
      return res.status(400).json({ error: 'Kullanıcı zaten proje üyesi' });
    }

    project.members.push(userId);
    await project.save();

    // Kullanıcının projeler listesine ekle
    await User.findByIdAndUpdate(userId, {
      $push: { projects: project._id }
    });

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Projeden üye çıkar
router.delete('/:id/members/:userId', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ error: 'Proje bulunamadı' });
    }

    // Sadece proje sahibi veya PM üye çıkarabilir
    if (project.owner.toString() !== req.user._id.toString() && req.user.role !== 'pm') {
      return res.status(403).json({ error: 'Bu işlem için yetkiniz yok' });
    }

    const userId = req.params.userId;
    
    if (!project.members.includes(userId)) {
      return res.status(400).json({ error: 'Kullanıcı proje üyesi değil' });
    }

    project.members = project.members.filter(member => member.toString() !== userId);
    await project.save();

    // Kullanıcının projeler listesinden çıkar
    await User.findByIdAndUpdate(userId, {
      $pull: { projects: project._id }
    });

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

module.exports = router; 