
import { createHmac, randomBytes } from 'crypto';
import * as thirtytwo from 'thirty-two';
import { TOTPOptions } from './totp-options';


function hex2dec(hex: string): number {
    return Number(`0x${hex}`);
}

export class TOTP {
    private _options: TOTPOptions = {
        period: 30, // time between each token
        algorithm: 'sha1', // algorithm of hmac
        length: 6 // length of the token
    }

    private _secret: string;

    get options(): TOTPOptions {
        return this._options;
    }

    constructor(secret: string, options: TOTPOptions) {
        this._options = {...options};
        this._secret = secret;
    }

    generate() {
        const epoch = Math.round(Date.now() / 1000);
        const time = Math.floor(epoch / this.options.period).toString(16).toString().padStart(16, '0');
        const hmac = createHmac(this.options.algorithm, Buffer.from(thirtytwo.decode(this._secret).toString('hex'), 'hex'));
        hmac.update(time, 'hex');
        const digest = hmac.digest('hex');
        const offset = hex2dec(digest.substring(digest.length - 1));
        let otp = (hex2dec(digest.substring(offset * 2, offset * 2 + 8)) & hex2dec("7fffffff")) + "";
        otp = otp.substring(Math.max(otp.length - this.options.length, 0), Math.max(otp.length - this.options.length, 0) + this.options.length);
        return otp;
    }

    verify(code) {
        return this.generate() === code;
    }
}