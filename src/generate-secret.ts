import { randomBytes } from "crypto";
import { toBase32 } from "./toBase32";

export function generateSecret(size = 20, asBase32 = true): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        randomBytes(size, (err: any, buffer: any) => {
            if (err) {
                reject(-1);
            }

            const secret = buffer.toString('hex');
    
            if(asBase32) {
                resolve(toBase32(secret));
                return;
            }
            
            resolve(secret);
        });
    })
};