# Milbos Guru — Expo App

Aplikasi mobile Android/iOS untuk guru dan murobbi Milbos. Scope: **tanpa fitur admin**.

## Fase 1 (saat ini)

- Login guru/murobbi via REST API
- Session persist (`expo-secure-store`)
- Bottom tabs: Beranda, Scan, Profil
- API client dengan JWT Bearer token

## Setup

```bash
npm install
cp .env.example .env
npm start
```

Set `EXPO_PUBLIC_API_URL` ke URL deploy `milbos-daily-hub` (Vercel).

## Backend requirement

Pastikan backend sudah deploy dengan:

- `JWT_SECRET` di environment Vercel
- `AUTH_REQUIRED=true` (default)

User web/mobile dengan token lama perlu login ulang setelah deploy auth JWT.

## GitHub

Repository: https://github.com/iyanqalbi/sklh-teacher-apps
