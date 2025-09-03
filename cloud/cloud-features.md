---
title: Cloud Features
description: Overview of Dexie Cloud features and capabilities
category: cloud
order: 1
---

# Dexie Cloud Features

Dexie Cloud extends your IndexedDB database with powerful cloud synchronization capabilities.

## Key Features

### Real-time Sync

- Automatic synchronization across devices
- Conflict resolution
- Offline-first approach

### Authentication

- Built-in user management
- Multiple authentication providers
- Role-based access control

### Data Security

- End-to-end encryption options
- Secure data transmission
- Privacy-focused design

## Getting Started with Cloud

```typescript
import Dexie from "dexie"
import dexieCloud from "dexie-cloud-addon"

// Apply the cloud addon
Dexie.addon("cloud", dexieCloud)

// Configure your database
const db = new Dexie("MyCloudDB", {
  cloud: {
    databaseUrl: "https://your-database-url.dexie.cloud",
    requireAuth: true,
  },
})
```

## Learn More

Check out the detailed documentation for specific cloud features and configuration options.
