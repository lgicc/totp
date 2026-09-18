import { randomBytes } from "crypto";
import { toBase32 } from "./toBase32";

export function generateSecret(size = 20, asBase32 = true): string {
    const buffer = randomBytes(size);
    const secret = buffer.toString('hex');
    if (asBase32) {
        return toBase32(secret);
    }
    return secret;
};