import { randomBytes } from "crypto";

export function generateSecret(size = 20) {
    return new Promise<string>((resolve, reject) => {
        randomBytes(size, (err: any, buffer: any) => {
            if (err) {
                reject(-1);
            }
    
            resolve(buffer.toString('hex'));
        });
    })
};