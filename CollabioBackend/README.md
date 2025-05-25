# 📦 Collabio Backend API – README

## 🌐 Base URL
```http
http://localhost:5000/api
```

---

## 👤 Kullanıcı (Auth) Endpoints

### 🔹 Kayıt Olma
```bash
POST /auth/register
```
**Body:**
```json
{
  "username": "ömer",
  "email": "omer@example.com",
  "password": "123456"
}
```

### 🔹 Giriş Yapma
```bash
POST /auth/login
```
**Body:**
```json
{
  "email": "omer@example.com",
  "password": "123456"
}
```
🔐 Giriş başarılı olduğunda JWT token döner. Diğer endpoint’lerde:
```makefile
Authorization: Bearer <token>
```
header'ı ile kullanılmalıdır.

### 🔹 Geçerli Kullanıcı Bilgisi
```bash
GET /users/me
```

### 🔹 Proje Favorilerine Ekle
```bash
POST /users/favorites/:projectId
```

### 🔹 Proje Favorilerinden Çıkar
```bash
DELETE /users/favorites/:projectId
```

### 🔹 Favori Projeleri Listele
```bash
GET /users/favorites
```

---

## 📁 Proje (Project) Endpoints

### 🔹 Projeleri Listele (owner & members)
```bash
GET /projects
```

### 🔹 Yeni Proje Oluştur
```bash
POST /projects
```
**Body:**
```json
{
  "name": "Proje Adı",
  "description": "Açıklama",
  "teamId": "<teamId>",
  "members": ["<userId1>", "<userId2>"]
}
```

### 🔹 Projeye Üye Ekle (email ile)
```bash
POST /projects/:id/members
```
**Body:**
```json
{
  "email": "user@example.com"
}
```

### 🔹 Proje Güncelle
```bash
PUT /projects/:id
```

### 🔹 Proje Sil
```bash
DELETE /projects/:id
```

---

## ✅ Görev (Task) Endpoints

### 🔹 Projeye Ait Görevleri Listele
```bash
GET /tasks/:projectId
```

### 🔹 Yeni Görev Oluştur
```bash
POST /tasks
```
**Body:**
```json
{
  "title": "API Geliştir",
  "description": "JWT ile giriş sistemi",
  "priority": "high",
  "status": "to-do",
  "projectId": "<projectId>",
  "assignee": "<userId>"
}
```

### 🔹 Görev Güncelle
```bash
PUT /tasks/:id
```

### 🔹 Görev Sil
```bash
DELETE /tasks/:id
```

### 🔹 Statü Değiştir (drag & drop)
```bash
PUT /tasks/:id/status
```
**Body:**
```json
{
  "status": "in_progress"
}
```

### 🔹 Görev Onay Durumu Güncelle (approved/rejected/pending)
```bash
PUT /tasks/:id/approve
```
**Body:**
```json
{
  "status": "approved"
}
```

---

## 💬 Yorum (Comment) Endpoints

### 🔹 Yorum Ekle (isteğe bağlı PDF eklenebilir)
```bash
POST /comments/:taskId
```
**FormData:**
- `content`: Yorum metni (zorunlu)
- `file`: PDF dosyası (isteğe bağlı)

### 🔹 Yorumları Listele
```bash
GET /comments/:taskId
```

### 🔹 Yorumu Güncelle (isteğe bağlı yeni PDF dosyası)
```bash
PUT /comments/:id
```
**FormData:**
- `content`: Güncellenmiş yorum metni
- `file`: Yeni PDF dosyası (isteğe bağlı)

### 🔹 Yorumu Sil
```bash
DELETE /comments/:id
```

---

## 📎 Dosya (Attachment) Endpoints

### 🔹 Göreve Dosya Ekle
```bash
POST /attachments
```
**Body:**
```json
{
  "fileUrl": "https://cdn.com/file.pdf",
  "fileName": "Plan.pdf",
  "taskId": "<taskId>"
}
```

### 🔹 Göreve Ait Dosyaları Listele
```bash
GET /attachments/:taskId
```

### 🔹 Dosya Sil
```bash
DELETE /attachments/:id
```

---

## 📜 Log (Geçmiş) Endpoints

### 🔹 Tüm Logları Listele (filtre destekli)
```bash
GET /logs
```
**Query Parametreleri (opsiyonel):**
- `startDate`: Başlangıç tarihi (ISO)
- `endDate`: Bitiş tarihi (ISO)
- `actionType`: Eylem tipi (ör. CREATE_TASK, DELETE_TASK)
- `taskStatus`: İlgili task durumu (ör. TODO, INPROGRESS)

### 🔹 Belirli Görevin Logları
```bash
GET /logs/:taskId
```

---

## 🔐 Authorization
Tüm korumalı endpoint’lerde JWT token gereklidir.

**Header formatı:**
```makefile
Authorization: Bearer <token>
```
