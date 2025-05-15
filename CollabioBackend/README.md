# 📦 Collabio Backend API – README

## 🌐 Base URL
```http://localhost:5000/api```

---

## 👤 Kullanıcı (Auth) Endpoints

### 🔹 Kayıt Olma
```
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
```
POST /auth/login
```
**Body:**
```json
{
  "email": "omer@example.com",
  "password": "123456"
}
```
🔐 Giriş başarılı olduğunda JWT token döner. Diğer endpoint’lerde ``Authorization: Bearer <token>`` header'ı ile kullanılmalıdır.

---

## 📁 Proje (Project) Endpoints

### 🔹 Projeleri Listele
```
GET /projects
```

### 🔹 Yeni Proje Oluştur
```
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
### 🔹 Proje Güncelle
```
PUT /projects/:id
```

### 🔹 Proje Sil
```
DELETE /projects/:id
```

🔐 Bu işlemleri sadece **project_manager** rolüne sahip kullanıcılar gerçekleştirebilir.

---

## ✅ Görev (Task) Endpoints

### 🔹 Projeye Ait Görevleri Listele
```
GET /tasks/:projectId
```

### 🔹 Yeni Görev Oluştur
```
POST /tasks
```
**Body**

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
```
PUT /tasks/:id
```

### 🔹 Görev Sil
```bash
DELETE /tasks/:id
```

### 🔹 Statü Değiştir (drag & drop desteği)
```bash
PUT /tasks/:id/status
```
**Body**
```json
{
  "status": "in_progress"
}
```

### 🔹 Görev Onayla (Yalnızca Project Manager)
```bash
PUT /tasks/:id/approve
```

---

## 💬 Yorum (Comment) Endpoints

### 🔹 Yorum Ekle
```bash
POST /comments/:taskId
```
**Body**
```json
{
  "content": "Bu işi ben alıyorum."
}
```

### 🔹 Yorumları Listele
```bash
GET /comments/:taskId
```

### 🔹 Yorumu Güncelle
```bash
PUT /comments/:id
```

### 🔹 Yorumu Sil
```bash
DELETE /comments/:id
```
---

## 📎 Dosya (Attachment) Endpoints

### 🔹 Dosya Ekle
```bash
POST /attachments
```
**Body**
```json
{
  "fileUrl": "https://cdn.com/file.pdf",
  "fileName": "Plan.pdf",
  "taskId": "<taskId>"
}
```

### 🔹 Görev Dosyalarını Listele
```bash
GET /attachments/:taskId
```

### 🔹 Dosya Sil
```bash
DELETE /attachments/:id
```
---

## 📜 Log (Geçmiş) Endpoints

### 🔹 Görev Geçmişini Görüntüle
```bash
GET /logs/:taskId
```
**Örnek Dönen Veri:**
```json
[
  {
    "actionType": "create_task",
    "authorUserId": { "username": "ömer" },
    "timeStamp": "2025-05-03T13:00:00Z"
  }
]
```
---

## 🔐 Authorization
Tüm korumalı endpoint’lerde JWT token gereklidir.

**Header formatı:**
```makefile
Authorization: Bearer <token>
```