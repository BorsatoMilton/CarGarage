import crypto from 'crypto';
export function generateToken() {
    return crypto.randomBytes(32).toString('hex');
}
//# sourceMappingURL=tokenGenerator.js.map