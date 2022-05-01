import * as thirtytwo from 'thirty-two';

export function toBase32(secret: string) {
    return thirtytwo.encode(secret).toString('utf8');
}