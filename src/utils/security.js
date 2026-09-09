// Security utilities for Admin authentication and access control

const STORAGE_KEYS = {
  ADMIN_AUTH: 'gofayda_admin_auth_v1',
  FAILED_ATTEMPTS: 'gofayda_admin_failed_attempts',
  LOCKOUT_UNTIL: 'gofayda_admin_lockout_until',
  SESSION: 'gofayda_admin_session'
};

const SALT = 'gofayda_secure_salt_2026_x89q';
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 60 * 1000; // 60 seconds
const SESSION_DURATION_MS = 60 * 60 * 1000; // 1 hour

// Cryptographic hash using Web Crypto API SHA-256
export async function hashString(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str + SALT);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Get saved admin credentials or return defaults
export function getAdminCredentials() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading admin credentials:', e);
  }
  return null;
}

// Initialize credentials if not yet set
export async function initializeDefaultCredentials() {
  const existing = getAdminCredentials();
  if (!existing) {
    const defaultPasswordHash = await hashString('Admin@2026#Secure');
    const defaultCreds = {
      username: 'admin',
      passwordHash: defaultPasswordHash,
      isInitial: true,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, JSON.stringify(defaultCreds));
    return defaultCreds;
  }
  return existing;
}

// Verify entered credentials
export async function verifyCredentials(username, password) {
  // Check lockout
  const lockoutUntil = getLockoutStatus();
  if (lockoutUntil > Date.now()) {
    const remainingSeconds = Math.ceil((lockoutUntil - Date.now()) / 1000);
    return {
      success: false,
      locked: true,
      remainingSeconds,
      error: `Too many failed attempts. Access locked for ${remainingSeconds}s.`
    };
  }

  let creds = getAdminCredentials();
  if (!creds) {
    creds = await initializeDefaultCredentials();
  }

  const inputHash = await hashString(password);
  const isUsernameMatch = username.trim().toLowerCase() === creds.username.toLowerCase();
  const isPasswordMatch = inputHash === creds.passwordHash;

  if (isUsernameMatch && isPasswordMatch) {
    // Reset failed attempts upon successful login
    clearFailedAttempts();
    // Create authenticated session
    createSession(username);
    return { success: true, isInitial: creds.isInitial };
  } else {
    // Record failed attempt
    const failedData = recordFailedAttempt();
    return {
      success: false,
      locked: failedData.locked,
      remainingAttempts: failedData.remainingAttempts,
      remainingSeconds: failedData.remainingSeconds,
      error: failedData.locked
        ? `Too many failed attempts. Access locked for ${failedData.remainingSeconds}s.`
        : `Invalid username or password. ${failedData.remainingAttempts} attempt(s) remaining.`
    };
  }
}

// Update Admin Credentials
export async function updateAdminCredentials(currentPassword, newUsername, newPassword) {
  const creds = getAdminCredentials();
  if (!creds) {
    return { success: false, error: 'Credentials not found.' };
  }

  const currentHash = await hashString(currentPassword);
  if (currentHash !== creds.passwordHash) {
    return { success: false, error: 'Current password is incorrect.' };
  }

  if (!newPassword || newPassword.length < 6) {
    return { success: false, error: 'New password must be at least 6 characters.' };
  }

  const newHash = await hashString(newPassword);
  const updatedCreds = {
    username: newUsername.trim() || creds.username,
    passwordHash: newHash,
    isInitial: false,
    updatedAt: new Date().toISOString()
  };

  localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, JSON.stringify(updatedCreds));
  return { success: true };
}

// Failed attempts & lockout tracker
export function getLockoutStatus() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LOCKOUT_UNTIL);
    return raw ? parseInt(raw, 10) : 0;
  } catch (e) {
    return 0;
  }
}

function recordFailedAttempt() {
  let attempts = 0;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAILED_ATTEMPTS);
    attempts = raw ? parseInt(raw, 10) : 0;
  } catch (e) {}

  attempts += 1;
  localStorage.setItem(STORAGE_KEYS.FAILED_ATTEMPTS, attempts.toString());

  if (attempts >= MAX_ATTEMPTS) {
    const lockoutUntil = Date.now() + LOCKOUT_DURATION_MS;
    localStorage.setItem(STORAGE_KEYS.LOCKOUT_UNTIL, lockoutUntil.toString());
    localStorage.setItem(STORAGE_KEYS.FAILED_ATTEMPTS, '0');
    return {
      locked: true,
      remainingSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000),
      remainingAttempts: 0
    };
  }

  return {
    locked: false,
    remainingAttempts: MAX_ATTEMPTS - attempts,
    remainingSeconds: 0
  };
}

function clearFailedAttempts() {
  try {
    localStorage.removeItem(STORAGE_KEYS.FAILED_ATTEMPTS);
    localStorage.removeItem(STORAGE_KEYS.LOCKOUT_UNTIL);
  } catch (e) {}
}

// Session Management
export function createSession(username) {
  const session = {
    username,
    token: 'sec_' + Math.random().toString(36).substring(2) + Date.now().toString(36),
    expiresAt: Date.now() + SESSION_DURATION_MS
  };
  try {
    sessionStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
  } catch (e) {}
  return session;
}

export function isValidSession() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.SESSION);
    if (!raw) return false;
    const session = JSON.parse(raw);
    if (session && session.expiresAt > Date.now()) {
      return true;
    }
    clearSession();
    return false;
  } catch (e) {
    return false;
  }
}

export function clearSession() {
  try {
    sessionStorage.removeItem(STORAGE_KEYS.SESSION);
  } catch (e) {}
}
