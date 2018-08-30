# play-with-webpack
Try to find a best way to configure webpack at this moment (Aug 2018)

### How to develop

```
# Install dependencies
npm i

# Start development server with HMR and file watcher
npm run serve
```

### Run production

```
# Compile sources
npm run build

# Start production server(only hosting static file)
npm run servep
```

### FAQ

> How to show bundle size?

Run `npm run stats` will show stats report via [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)

> Which browser supported(polyfilled)?

Run `npm run browsers` will list supported(will be polyfilled) browsers.

> How to run lint?

Run `npm run lint` will do that based on [JavaScript Standard Style](https://standardjs.com/)

and Run `npm run fix` will fix lint issues automatically :)

> TypeError: Cannot read property 'hash' of undefined

SEE: https://github.com/mzgoddard/hard-source-webpack-plugin/issues/416
Run `rm -rf ./node_modules/.cache/hard-source`