// Security utilities and configurations

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254 && email.length >= 3;
}

export function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function sanitizeString(input: string, maxLength: number = 255): string {
  return input.replace(/[<>'"&]/g, '').trim().substring(0, maxLength);
}

export function isValidAuthToken(token: string): boolean {
  return typeof token === 'string' && token.length >= 10;
}

export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
} as const;

export const API_RATE_LIMITS = {
  default: 60, // requests per minute
  newsletter: 5, // requests per minute for newsletter signup
  auth: 10, // requests per minute for authenticated endpoints
} as const;

export function validateAuthHeader(authHeader: string | null, expectedSecret: string): boolean {
  if (!authHeader) return false;

  const token = authHeader.replace('Bearer ', '');
  return token === expectedSecret && isValidAuthToken(token);
}

export function createSecureResponse(data: unknown, status: number = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...SECURITY_HEADERS,
    },
  });
}
