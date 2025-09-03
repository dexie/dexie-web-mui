---
title: Getting Started
description: A simple introduction to the documentation system
category: introduction
order: 1
---

# Getting Started

Welcome to the new documentation system! This system is built with:

- **Next.js 15** with App Router
- **MUI v7** for styling
- **MDX** for rich markdown content
- **TypeScript** for type safety

## Features

### 🚀 Performance

The system uses static generation for optimal performance.

### 🎨 Beautiful Design

Styled with Material-UI components for a modern look.

### 📱 Responsive

Works perfectly on desktop, tablet, and mobile devices.

### 🔍 Easy Navigation

Hierarchical sidebar navigation with breadcrumbs.

## Code Example

```javascript
import { getAllDocuments } from "../utils/mdx"

// Get all documentation files
const docs = await getAllDocuments("./docs")
console.log("Found documents:", docs.length)
```

## Next Steps

1. Explore the navigation sidebar
2. Check out more documentation pages
3. See how MDX rendering works with MUI components

> **Note**: This is a test page to demonstrate the documentation system functionality.
