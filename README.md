# frontapp
> FrontApp Node.js API Wrapper

## Installation

```bash
npm install frontapp-node
```

## Testing

```bash
npm test
```

## Running the code locally

Compile using babel:

```bash
gulp babel
```

Require FrontApp:

```node
var FrontApp = require('./dist/index');
```

## Usage

Require FrontApp:

```node
var FrontApp = require('frontapp-node');
```

Create a client:
#### Using Personal Access Tokens
```node
var client = new FrontApp.Client('token');
```

## Callbacks

This client library supports two kinds of callbacks:

```node
client.analytics.get({}, function (err, r) {
  // err is an error response object, or null
  // r is a successful response object, or null
});
```

## Promises

This client library also supports using Promises instead of callbacks:

```node
client.analytics.get({}).then(function (r) {
  // ...
});
```

## Analytics

```node
// To get statistics about activities happening in Front, you need to requests the correspondig metrics of the analytics.
client.analytics.get({
  start: '',
  end: '',
  metrics: []
}, callback);
