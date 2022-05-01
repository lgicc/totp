export interface TOTPOptions {
    period: number; // time between each token
    algorithm: 'sha1'|'sha256'|'sha512';
    length: number;
}