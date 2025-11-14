import Dexie, { Table } from 'dexie'

export interface OfflineStatus {
  id: string
  isWarming: boolean
  isReady: boolean
  cached?: number
  total?: number
  progress?: number
  startedAt?: string
  completedAt?: string
  failedAt?: string
  error?: string
  updatedAt: string
}

// Dedicated database for offline status (shared between SW and GUI)
export class OfflineStatusDB extends Dexie {
  status!: Table<OfflineStatus>

  constructor() {
    super('OfflineStatus')
    this.version(1).stores({
      status: 'id'
    })
  }
}

export const offlineDB = new OfflineStatusDB()