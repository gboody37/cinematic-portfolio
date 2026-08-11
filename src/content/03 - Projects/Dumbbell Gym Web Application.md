---
tags:
  - project
  - dumbbellgym
  - nextjs
  - prisma
status: Active
priority: P1
created: 2026-08-10
modified: 2026-08-10
repository: gboody37/dumbbellgym
---

# 🏋️ Dumbbell Gym Web Application (`dumbbellgym`)

> **Repository**: [gboody37/dumbbellgym](https://github.com/gboody37/dumbbellgym)  
> **Tech Stack**: Next.js | React | Prisma ORM | PostgreSQL | JOSE JWT | Jimp | XLSX

---

## 📌 Application Summary
**Dumbbell Gym** is a full-stack gym management web system. It provides real-time member registration, membership tracking, active status indexing, payment history, and an integrated cafeteria point-of-sale (POS) and inventory system.

---

## 🛠️ Tech Stack & Key Modules
- **Framework**: Next.js & React
- **Database & ORM**: PostgreSQL with Prisma ORM
- **Authentication**: JWT authentication with `jose` and `bcryptjs` password hashing
- **Media & Export**: `jimp` for avatar optimization & `xlsx` for Excel report generation

---

## 🗄️ Core Database Models
- **`User`**: System staff & coaches with JSON privilege management.
- **`Member`**: Gym members with membership start/end dates, pricing, and active state.
- **`MembershipPayment`**: Tracking financial transactions and member renewals.
- **`CafeteriaSale` & `CafeteriaItem`**: Inventory stock and cafeteria POS sales tracking.

---

## 🔗 Related Knowledge Nodes
- [[02 - Core Brain/01 - AI & Agentic Hub/Dumbbell Gym System Architecture|Dumbbell Gym System Architecture]]
- [[02 - Core Brain/02 - MCP Network/Dumbbell Gym Database Schema|Dumbbell Gym Database Schema]]
- [[03 - Projects/Gym Data Backup Repository|Gym Data Backup Repository]]
- [[00 - Home Dashboard|Home Dashboard]]
