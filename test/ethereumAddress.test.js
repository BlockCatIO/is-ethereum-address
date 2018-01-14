import isAddress from '../src/ethereumAddress';

describe('Ethereum address validator', () => {
  it('accepts a valid ethereum address with prefix (0x[...])', () => {
    expect(
      isAddress('0xa57e3290d0b7cb2748ed410c19c1d58f7f192bc0')
    ).toBeTruthy();
  });

  it('accepts a valid ethereum address without 0x prefix', () => {
    expect(isAddress('a57e3290d0b7cb2748ed410c19c1d58f7f192bc0')).toBeTruthy();
  });

  it('does not accept invalid characters in the address', () => {
    expect(isAddress('g57e3290d0b7cb2748ed410c19c1d58f7f192bc0')).toBeFalsy();
    expect(isAddress('a57$3290d0b7cb2748ed410c19c1d58f7f192bc0')).toBeFalsy();
    expect(isAddress('a57e3290www7cb2748ed410c19c1d58f7f192bc0')).toBeFalsy();
  });

  it('does not accept an invalid length', () => {
    expect(isAddress('748ed410c19c1d58f7f192bc0')).toBeFalsy();
    expect(
      isAddress(
        '748ed410c19c1d58f7f192bc0748ed410c19c1d58f7f192bc0748ed410c19c1d58f7f192bc0748ed410c19c1d58f7f192bc0'
      )
    ).toBeFalsy();
  });

  it('does not accept empty string', () => {
    expect(isAddress('')).toBeFalsy();
  });

  it('does not accept invalid types', () => {
    expect(isAddress(null)).toBeFalsy();
    expect(isAddress(0)).toBeFalsy();
    expect(isAddress(142)).toBeFalsy();
  });

  it('accepts a valid capitalization checksum from EIP 55', () => {
    // valid capitalization
    expect(
      isAddress('0xA57E3290D0b7cb2748Ed410C19c1D58F7F192bc0')
    ).toBeTruthy();
    expect(isAddress('A57E3290D0b7cb2748Ed410C19c1D58F7F192bc0')).toBeTruthy();
  });

  it('rejects an invalid capitalization checksum from EIP 55', () => {
    // invalid capitalization
    expect(isAddress('0xa57E3290d0b7cb2748Ed410C19c1D58F7F192bc0')).toBeFalsy();
  });
});
