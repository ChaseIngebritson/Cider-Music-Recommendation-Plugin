# Cider Plugin Template

This is a [Cider Music](https://github.com/ciderapp/Cider) plugin template designed to streamline the plugin creation process while using Typescript. The template attempts to adhere to the [Cider Music v2 plugin schema](https://github.com/ciderapp/plugin-schema-poc/tree/main/v2_plugin).

## Please Note

Version 2 of the Cider Music plugin schema is still in active development and will not work with the production version of Cider at the time of writing. This template will be updated as the plugin schema is better fleshed out.

## Installation

```bash
npm install
```

## Building

This template utilizes [rollup.js](https://rollupjs.org/guide/en/) to compile the Typescript and package all required files.

### Development

Running in development mode will allow hot reloading on the build.

```bash
npm start
```

### Production

```bash
npm run build
```

## Resources

* [Cider Music Plugin Schema](https://github.com/ciderapp/plugin-schema-poc)
* [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
* [rollup.js](https://rollupjs.org/guide/en/)
