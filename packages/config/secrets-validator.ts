const REQUIRED_SECRETS = [
  'MONGO_URI',
  'JWT_ACCESS_TOKEN_SECRET',
  'JWT_REFRESH_TOKEN_SECRET',
];

export function validateStartupSecrets(): void {
  const missing = REQUIRED_SECRETS.filter((k) => !process.env[k]);
  if (missing.length > 0 && process.env.NODE_ENV === 'production') {
    throw new Error(`Missing required secrets: ${missing.join(', ')}`);
  }
}

export function logSecretsStatus(): void {
  for (const key of REQUIRED_SECRETS) {
    const status = process.env[key] ? '✅' : '⚠️  missing';
    console.log(`  ${key}: ${status}`);
  }
}
