// BroadcastChannel used to sync patient data changes across browser tabs in real-time

export const patientSyncChannel = new BroadcastChannel('patient-sync');