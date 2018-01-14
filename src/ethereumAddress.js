import createKeccakHash from 'keccak';

const ADDRESS_LENGTH = 40;
const INVALID_CHARACTERS = /([^0-9a-fA-F])/;

function toChecksumAddress(input) {
  // source is EIP 55: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-55.md
  const address = input.toLowerCase();
  const hash = createKeccakHash('keccak256')
    .update(address)
    .digest('hex');

  let ret = '';
  for (let i = 0; i < address.length; i += 1) {
    if (parseInt(hash[i], 16) >= 8) {
      ret += address[i].toUpperCase();
    } else {
      ret += address[i];
    }
  }

  return ret;
}

function hasMixedCase(str) {
  return /([A-F])/.test(str) && /([a-f])/.test(str);
}

function validateCharacterSet(str) {
  return !INVALID_CHARACTERS.test(str);
}

function validateChecksum(str) {
  // either we have no mixed case, or we have a valid checksum.
  return !hasMixedCase(str) || str === toChecksumAddress(str);
}

export default function isAddress(value) {
  if (typeof value !== 'string') return false;

  let standardizedAddress = '';
  if (value.substr(0, 2).toLowerCase() === '0x') {
    standardizedAddress = value.substr(2);
  } else {
    standardizedAddress = value;
  }

  if (!validateCharacterSet(standardizedAddress)) return false;
  if (!validateChecksum(standardizedAddress)) return false;

  return standardizedAddress.length === ADDRESS_LENGTH;
}
