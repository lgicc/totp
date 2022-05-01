# TOTP

###Generate Random Secret.  

*Default length is 20*
```javascript
    import {generateSecret} from '@lgicc/totp';

    // Generate Secret with Default length of 20
    const secret = generateSecret();

    // Generate Secret with custom length
    const customSecret = generateSecret(30);
```
  

###Convert manual to Base32.  

*To support Google Authenticator*
```javascript
    import {generateSecret} from '@lgicc/totp';
    import {toBase32} from '@lgicc/totp';
    
    // Convert to secret without automatic base32 convertion
    const secretNoBase32 = generateSecret(20, false);

    // Convert to secret to base32 manually
    const secretBase32 = toBase32(secretNoBase32);
```
  

###Generate TOTP

```javascript
    import {TOTP} from '@lgicc/totp';
    import {generateSecret} from '@lgicc/totp';

    // Generate Secret with Default Length of 20
    const secret = generateSecret();

    const totp = new TOTP();
    console.log(totp.generate(secret));

    // Verify TOTP
    console.log(totp.verify('000000')); // inject your code instead of 000000
```