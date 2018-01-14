# is-ethereum-address

Just a simple utility for lightweight validation an Ethereum address.

This is a standalone implementation of `web3.isEthereumAddress` with limited dependencies and an ES5 build. The `keccak` package depended on will use `libkeccak` for performance _if_ the platform in question is supported; if not, a pure Javascript implementation is used.

## Usage

```js
const isEthereumAddress = require('is-ethereum-address');
if (isEthereumAddress('0xa57e3290d0b7cb2748ed410c19c1d58f7f192bc0')) {
  console.log('This is a valid Ethereum address, prefixed with a 0x');
}

if (isEthereumAddress('a57e3290d0b7cb2748ed410c19c1d58f7f192bc0')) {
  console.log('This is a valid Ethereum address with no prefix');
}

if (isEthereumAddress('0xA57E3290D0b7cb2748Ed410C19c1D58F7F192bc0')) {
  console.log(
    'This is a valid Ethereum address, with EIP 55-style checksumming'
  );
}
```

The library validates capitalization per [EIP 55](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-55.md) _if_ there is mixed capitalization provided.
