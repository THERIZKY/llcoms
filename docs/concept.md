# Love Live Concert Archive — Project Concept

## Project Overview

This project is a personal web-based streaming platform designed specifically for watching Love Live concert recordings. The goal is to create a simple and organized streaming-style interface similar to a movie streaming website, but dedicated to a private archive of Love Live live concerts.

The video files themselves are not hosted on the website server. Instead, they are stored in Google Drive and streamed directly through the web application using embedded or streaming links.

The website acts as a clean and organized interface where users can browse concerts by groups or category and watch them through a built-in media player.

This platform is intended to function like a lightweight personal streaming service.

---

# Tech Stack

The project uses the following technologies:

### Framework

- **Next.js 16 (App Router)**
- **Prefer Server component instead of client coponents**

### UI / Styling

- **TailwindCSS v4**
- **Shadcn UI**
- **Motion (for small UI animations)**

### Video Player

- **Plyr**

Requirements for the video player:

- Clean modern UI
- Fullscreen support
- Seek / timeline
- Volume control
- Responsive
- If possible, allow **custom markers on the timeline** (for example to mark songs in a concert setlist)

### Database (Optional)

- **Supabase**

The database will only be used if needed for storing metadata such as:

- concert information
- thumbnails
- group/generation data
- video links
- timestamps / markers

### ORM

- **Prisma v7**

Used if the project requires database operations.

---

# UI Design Guidelines

The UI should remain **simple and clean**.

Important requirements:

- Support **Dark Mode / Light Mode**
- Focus on **usability rather than complex visuals**
- Use **Tailwind + Shadcn UI components**
- Minimal animations using **Motion**

The layout should resemble a lightweight streaming platform interface.

---

# Video Source

Concert videos are stored in **Google Drive**.

The website should:

- Stream videos from Google Drive links
- Use a media player interface
- Avoid uploading or storing video files directly on the website server

---

# Website Structure

## 1. Home Page

The main page should contain multiple sections.

### Section 1 — Concerts by Groups

Displays a list of Love Live Groups with thumbnails.

Examples:

- μ's
- Aqours
- Nijigasaki
- Liella
- Other groups if added later

Each group item should display:

- groups name
- Thumbnail image

When clicked, it should navigate to that generation's concert page.

---

### Section 2 — Cross Generation Concerts

This section contains concerts involving multiple groups or special collaborations.

Examples:

- Love Live Fes
- Unit Lives
- Collaboration concerts

Displayed as a list of concerts with thumbnails.

---

## 2. Latest Posts Page

This page displays the **latest uploaded videos**.

Content includes:

- Newly added concert videos
- Sorted by upload date
- Displayed as a list or grid with thumbnails

---

## 3. Recent Concert Page

This page displays the **most recently added concerts**.

Content includes:

- Recently added concert events
- Each concert includes:
    - title
    - thumbnail
    - generation/group
    - date added

---

## 4. Generation Pages

Each Love Live groups should have its own page.

Examples:
/groups/muse
/groups/aqours
/groups/nijigasaki
/groups/liella

These pages display concerts belonging to that specific groups.

Each concert card should show:

- concert title
- thumbnail
- year or event name

Clicking a concert card navigates to the concert watch page.

---

# Concert Page (Video Player)

Each concert should have a dedicated page where users can watch the video.

Features:

- Embedded **Plyr video player**
- Fullscreen playback
- Timeline scrubbing
- Volume control

Optional advanced feature:

- **Timeline markers** for songs in the concert setlist.

Example:
00:00 Opening
05:12 Song 1
10:45 Song 2

Markers should appear on the player timeline if possible.

---

# Data Model (Concept)

If a database is used, the structure may include:

### Generations

id
name
slug
thumbnail

### Concerts

id
title
generationId
thumbnail
description
createdAt

### Videos

id
concertId
title
videoUrl
order

### Markers (Optional)

id
videoId
timestamp
label

---

# Project Goal

The main goal of this project is to create a **personal Love Live concert archive** that behaves like a small streaming platform.

The focus is on:

- Easy browsing
- Organized concert catalog
- Smooth video playback
- Clean and simple UI

Complex features such as authentication, user accounts, or social features are **not required for the initial version**.

Future expansions may include additional features if needed.
