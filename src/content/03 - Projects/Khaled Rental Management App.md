---
tags:
  - project
  - rental
  - nextjs
  - property-management
  - khaled
status: Active
priority: P1
created: 2026-08-10
modified: 2026-08-10
repository: gboody37/khaled-rental
owner: Khaled
stitch_project_id: "6818349380066261827"
design_system: Monaco Obsidian & Gold / Nordic Slate Dual-Theme System
---

# 🏠 Khaled Rental Management App (`khaled-rental`)


> **Repository**: [gboody37/khaled-rental](https://github.com/gboody37/khaled-rental)  
> **Tech Stack**: Next.js | React | Prisma ORM | PostgreSQL | PWA  
> **Owner**: Khaled (same owner as [[03 - Projects/Dumbbell Gym Web Application|Dumbbell Gym]])  
> **Workspace**: `/home/keyu/Ai/Rental`

---

## 📌 Application Summary
**Khaled Rental** is a full-stack property rental management application built for **Khaled**, the same client who owns the Dumbbell Gym. The app provides a premium dashboard for managing rental properties, tenants, payment schedules, revenue analytics, and owner notifications. It is designed as a **Progressive Web App (PWA)** so it can be installed on mobile devices and function like a native app.

---

## 🎯 Core Features

### 1. 📊 Dashboard & Analytics
- **Revenue Overview**: Total Revenue (JOD), Monthly Income, Pending Splits
- **Property Stats**: Active Properties count, Active Renters count
- **Revenue Chart**: Monthly income bar chart for the past 6–12 months
- **Payment Splits Timeline**: Upcoming split payments with property name, amount, due date, and status (Paid/Pending/Overdue)
- **Recent Activity Feed**: Latest renter actions and payment events

### 2. 🏘️ Property Management (CRUD)
- **Add Property**: Full form with name, address, type (Apartment/House/Villa/Commercial), annual rent (JOD), rental dates
- **Edit Property**: Modify any property details in-place
- **Delete Property**: Remove properties with confirmation
- **Property Cards**: Each card shows name, address, status badge (Occupied/Vacant), tenant name, annual rent, rental period, payment split count

### 3. 💰 Payment Split System
> **Key Business Logic**: Annual rent can be split into installments.
- **Split Configuration**: Owner selects number of splits (2, 3, 4, 6, or 12) per year
- **Auto-Calculation**: If annual rent = 12,000 JOD and splits = 4, then 4 payments of 3,000 JOD each
- **Due Date Generation**: Payments are evenly spaced across the rental period
- **Split Preview**: Visual preview of all split payments before saving
- **Payment Tracking**: Each split payment has status: Paid / Pending / Overdue
- **Example**:
  - Annual Rent: **12,000 JOD**
  - Splits: **3 times/year**
  - Payment 1: 4,000 JOD — Due: Month 4
  - Payment 2: 4,000 JOD — Due: Month 8
  - Payment 3: 4,000 JOD — Due: Month 12

### 4. 👥 Renter/Tenant Management
- **Tenant Directory**: List all active and past tenants
- **Tenant Cards**: Avatar/initials, name, phone, assigned property, payment amount, payment status, next due date
- **Search & Filter**: Search by name, filter by status (Active/Past)
- **Summary Stats**: Total Active Renters, Total Monthly Revenue, Overdue Payments count

### 5. 🔔 Notification System
- **Send to Owner (Khaled)**: Direct updates about property status, payments, etc.
- **Send to Tenants**: Payment reminders, announcements
- **Notification Form**: Recipient selector, subject, message, priority (Normal/Urgent)
- **Notification History**: Log of all sent notifications with delivery status (Sent/Delivered/Read)
- **Push Notifications**: PWA-based push notifications for real-time alerts

---

## 🎨 Design System — "Estate Noir"

> **Stitch Project ID**: `6953747027443059970`  
> **Design System ID**: `assets/ae681ae6f5e54b1995d4736d383dd00b`

### Color Palette
| Token | Hex | Usage |
| :--- | :--- | :--- |
| Background / Base | `#0f172a` | Main page background |
| Surface | `#0b1326` | App background |
| Surface Container | `#171f33` | Card backgrounds |
| Surface Container High | `#222a3d` | Elevated cards |
| Primary (Gold) | `#f59e0b` | CTAs, accents, highlights |
| Primary Light | `#ffc174` | Primary text on dark |
| Secondary | `#334155` | Borders, secondary elements |
| Tertiary | `#1e293b` | Sidebar, nav backgrounds |
| On-Surface | `#dae2fd` | Primary text color |
| Error | `#ffb4ab` | Error states |
| Outline | `#a08e7a` | Subtle borders |

### Typography
| Style | Font | Size | Weight |
| :--- | :--- | :--- | :--- |
| Headline Large | Playfair Display | 48px | 700 |
| Headline Medium | Playfair Display | 32px | 600 |
| Headline Small | Playfair Display | 24px | 600 |
| Body Large | Hanken Grotesk | 18px | 400 |
| Body Medium | Hanken Grotesk | 16px | 400 |
| Label Medium | Hanken Grotesk | 14px | 600 |
| Label Small | Hanken Grotesk | 12px | 500 |

### Design Principles
- **Dark Mode Only**: Deep navy foundation with gold accents
- **Tonal Layering**: Depth through color layers, not shadows
- **8px Spacing Grid**: All spacing follows 8px linear scale
- **Rounded-lg Cards**: 16px border radius for visual groupings
- **Gold CTAs**: Primary buttons use `#f59e0b` with black text
- **Status Badges**: Pill-shaped with low-opacity fills

---

## 🗄️ Database Schema (Planned)

### `Property`
- `id`, `name`, `address`, `type` (Apartment/House/Villa/Commercial)
- `annualRent` (JOD), `rentalStart`, `rentalEnd`
- `splitCount` (2/3/4/6/12), `status` (Occupied/Vacant)
- `tenantId` (FK), `notes`, `createdAt`, `updatedAt`

### `Tenant`
- `id`, `name`, `phone`, `email`
- `propertyId` (FK), `status` (Active/Past)
- `createdAt`, `updatedAt`

### `PaymentSplit`
- `id`, `propertyId` (FK), `tenantId` (FK)
- `amount` (JOD), `dueDate`, `paidDate`
- `status` (Paid/Pending/Overdue)
- `splitNumber`, `totalSplits`

### `Notification`
- `id`, `recipientType` (Owner/Tenant), `recipientId`
- `subject`, `message`, `priority` (Normal/Urgent)
- `status` (Sent/Delivered/Read), `sentAt`

---

## 📱 App Pages / Routes

| Route | Page | Description |
| :--- | :--- | :--- |
| `/` | Dashboard | Revenue overview, charts, splits timeline, activity |
| `/properties` | Properties | Grid/list of all rental properties |
| `/properties/new` | Add Property | Form to add new property with split config |
| `/properties/[id]/edit` | Edit Property | Edit existing property details |
| `/renters` | Renters | Active/past tenant directory |
| `/notifications` | Notifications | Send & view notification history |
| `/settings` | Settings | App configuration |

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js (App Router) with React
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Vanilla CSS with Estate Noir design tokens
- **PWA**: Service Worker + Web App Manifest for mobile install
- **Notifications**: Web Push API for real-time notifications to Khaled
- **Charts**: Chart.js or lightweight charting library
- **Authentication**: JWT-based (for admin access)
- **Deployment**: Vercel or similar

---

## 📐 Stitch Design Screens

| Screen | Stitch Screen ID | Status |
| :--- | :--- | :--- |
| Dashboard | `6e410704c3d94dd38cdb78f3955f4bf2` | ✅ Complete |
| Properties List | — | 🔄 Pending |
| Add/Edit Property Form | — | 🔄 Pending |
| Renters/Tenants | — | 🔄 Pending |
| Notifications | — | 🔄 Pending |

---

## 🔗 Related Knowledge Nodes
- [[03 - Projects/Dumbbell Gym Web Application|Dumbbell Gym Web Application]] — Same owner (Khaled)
- [[03 - Projects/Gym Data Backup Repository|Gym Data Backup Repository]]
- [[00 - Home Dashboard|Home Dashboard]]
