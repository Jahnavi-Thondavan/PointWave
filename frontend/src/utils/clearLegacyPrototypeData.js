// One-time cleanup for old PointWave demo marketplace records.
// IMPORTANT: Never delete authentication data here. Existing sign-in state and
// locally registered accounts must survive app updates.
const LEGACY_DEMO_DATA_KEYS = [
  'pointwave-profile',
  'pointwave-client-projects',
  'pointwave-project-hires',
  'pointwave-applications',
  'pointwave-conversations',
  'pointwave-payments',
  'pointwave-shortlisted-talent',
  'pointwave-talent-invites',
  'pointwave-project-updates',
]

const CLEANUP_MARKER = 'pointwave-cleanup-v2'

export function clearLegacyPrototypeData() {
  if (typeof window === 'undefined') return

  try {
    if (window.localStorage.getItem(CLEANUP_MARKER) === 'done') return

    LEGACY_DEMO_DATA_KEYS.forEach((key) => window.localStorage.removeItem(key))
    // Preserve pointwave-user and pointwave-accounts. These contain the
    // current session and locally registered login credentials.
    window.localStorage.setItem(CLEANUP_MARKER, 'done')
  } catch (error) {
    console.error('PointWave demo-data cleanup could not complete:', error)
  }
}
