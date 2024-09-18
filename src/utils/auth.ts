const tokenKey = 'token';
const tokenRole = 'user_role';
const expiresAtKey = 'expires_at';

/**
 * The function sets a token and token type in session storage if they are provided as arguments.
 */
export function setToken(token?: string, userRole? :number) {
  if (token) {
    sessionStorage.setItem(tokenKey, token);
  }
  if (userRole) {
    sessionStorage.setItem(tokenRole,userRole ? userRole.toString() : '0');
  }
//   if (expiresAt) {
//     sessionStorage.setItem(expiresAtKey, expiresAt.toString());
//   }
}

/**
 * This function retrieves a token from the session storage or returns an empty string if it doesn't
 * exist.
 */
export function getToken() {
  return sessionStorage.getItem(tokenKey) || '';
}

// export function getUserRole(){
//   return sessionStorage.getItem(tokenRole) || '';
// }



/**
 * This function retrieves the expiration time from the session storage.
 */
export function getExpiresAt() {
  const exp = sessionStorage.getItem(expiresAtKey) || '0';
  return parseInt(exp);
}

/**
 * The function removes a token and its type from the session storage.
 */
export function removeToken() {
  sessionStorage.removeItem(tokenKey);
  sessionStorage.removeItem(tokenRole);
//   sessionStorage.removeItem(expiresAtKey);
}