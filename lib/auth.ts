// Simple auth validation for admin
export function validateAdminToken(token: string | null): boolean {
  if (!token) return false;
  
  try {
    // Decode the token
    const decoded = Buffer.from(token, 'base64').toString();
    const [username, timestamp] = decoded.split(':');
    
    // Check if token is valid (username matches and not expired - 24 hours)
    const isValid = username === 'admin' && 
                    (Date.now() - parseInt(timestamp)) < 24 * 60 * 60 * 1000;
    
    return isValid;
  } catch {
    return false;
  }
}
