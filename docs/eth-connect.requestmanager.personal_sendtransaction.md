[Home](./index) &gt; [eth-connect](./eth-connect.md) &gt; [RequestManager](./eth-connect.requestmanager.md) &gt; [personal\_sendTransaction](./eth-connect.requestmanager.personal_sendtransaction.md)

# RequestManager.personal\_sendTransaction property

Imports the given unencrypted private key (hex string) into the key store, encrypting it with the passphrase. Returns the address of the new account.

**Signature:**
```javascript
personal_sendTransaction: (txObject: TransactionOptions, passPhrase: Data) => EthMethod<'personal_sendTransaction'>
```