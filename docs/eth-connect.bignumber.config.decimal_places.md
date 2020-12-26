<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [eth-connect](./eth-connect.md) &gt; [BigNumber](./eth-connect.bignumber.md) &gt; [Config](./eth-connect.bignumber.config.md) &gt; [DECIMAL\_PLACES](./eth-connect.bignumber.config.decimal_places.md)

## BigNumber.Config.DECIMAL\_PLACES property

An integer, 0 to 1e+9. Default value: 20.

The maximum number of decimal places of the result of operations involving division, i.e. division, square root and base conversion operations, and exponentiation when the exponent is negative.

```ts
BigNumber.config({ DECIMAL_PLACES: 5 })
BigNumber.set({ DECIMAL_PLACES: 5 })

```

<b>Signature:</b>

```typescript
DECIMAL_PLACES?: number;
```