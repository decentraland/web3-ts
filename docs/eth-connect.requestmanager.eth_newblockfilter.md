[Home](./index) &gt; [eth-connect](./eth-connect.md) &gt; [RequestManager](./eth-connect.requestmanager.md) &gt; [eth\_newBlockFilter](./eth-connect.requestmanager.eth_newblockfilter.md)

# RequestManager.eth\_newBlockFilter property

Creates a filter in the node, to notify when a new block arrives. To check if the state has changed, call eth\_getFilterChanges.

**Signature:**
```javascript
eth_newBlockFilter: () => Promise<Data>
```