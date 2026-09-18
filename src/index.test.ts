import { strict as assert } from 'assert';
import { test } from 'node:test';
import { TOTP, generateSecret, toBase32 } from './index';

test('generateSecret returns a string', () => {
    const secret = generateSecret();
    assert.equal(typeof secret, 'string');
    assert.ok(secret.length > 0);
});

test('generateSecret asBase32=false returns hex string', () => {
    const secret = generateSecret(20, false);
    assert.match(secret, /^[0-9a-f]+$/i);
});

test('toBase32 encodes a string', () => {
    const encoded = toBase32('hello');
    assert.equal(typeof encoded, 'string');
    assert.ok(encoded.length > 0);
});

test('TOTP generate returns a 6-digit string', () => {
    const secret = generateSecret();
    const totp = new TOTP(secret);
    const code = totp.generate();
    assert.equal(typeof code, 'string');
    assert.equal(code.length, 6);
    assert.match(code, /^\d+$/);
});

test('TOTP generate returns configured length code', () => {
    const secret = generateSecret();
    const totp = new TOTP(secret, { period: 30, algorithm: 'sha1', length: 8 });
    const code = totp.generate();
    assert.equal(code.length, 8);
});

test('TOTP verify returns true for current code', () => {
    const secret = generateSecret();
    const totp = new TOTP(secret);
    const code = totp.generate();
    assert.equal(totp.verify(code), true);
});

test('TOTP verify returns false for wrong code', () => {
    const secret = generateSecret();
    const totp = new TOTP(secret);
    assert.equal(totp.verify('000000'), false);
});

test('TOTP verify with skew=0 still matches current code', () => {
    const secret = generateSecret();
    const totp = new TOTP(secret);
    const code = totp.generate();
    assert.equal(totp.verify(code, 0), true);
});

test('TOTP generateAt is deterministic', () => {
    const secret = generateSecret();
    const totp = new TOTP(secret);
    const counter = 1700000000;
    assert.equal(totp.generateAt(counter), totp.generateAt(counter));
});
