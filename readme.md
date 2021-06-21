# @i/sketch-plugin

Sketch plugin for the Intouch Design System


## Installation

- Download the latest release of the plugin
- Un-zip
- Double-click on intouch-design-system.sketchplugin


## Production Build

1. Update the version number in the `package.json` and `src/manifest.json`

2. Add the new plugin version to the `appcast.xml`

3. Run the `build-prod` npm script

4. Delete the metadata files from the Sketch Plugin: `intouch-design-system.sketchplugin/Contents/Sketch/metadata`

5. Zip the Sketch Plugin: `intouch-design-system.sketchplugin`

6. Add the zipped Sketch Plugin and the `appcast.xml` file to the @i/docs `public` directory

7. Run the `@i/docs` release process

8. Users of the Sketch Plugin will be automatically notified to update


## Architecture

The plugin is split into three main directories.

The `src/` directory contains the JavaScript code for the Sketch Plugin backend. The `src/` directory uses SKPM and the `webpack.skpm.config.js` configuration file.

The `resources/` directory contains the `webview.html` page and the `styles.css` file which are used to render the Webview inside the Sketch Plugin.

The `app/` directory contains the React TypeScript application code which is rendered into the Webview. This code gets bundled into `app-bundle.js` and is referenced from `resources/webview.html`. The `app/` directory uses Tarot and the `webpack.app.config.js` configuration file.

**NOTE:** Communication from the Sketch Plugin backend to the React TypeScript frontend app is achieved through the `browserWindow.executeJavaScript()` API. Communication from the React TypeScript frontend app to the Sketch Plugin backend is achieved through the `window.postMessage()` API.
<br>


### Fontbook Parser

This plugin includes the [@i/fontbook-parser](https://intazdoweb.intouchsol.com/IntouchDesignSystem/IntouchDesignSystem/_git/fontbook-parser) module in the production bundle using the `copy-webpack-plugin` as part of the `webpack.skpm.config.js`. The ADAL Server is initialized using NodeJS `child_process.spawn` and passing an XML filepath and JSON filepath.
<br>


## Development Guide

_This plugin was created using `skpm`. For a detailed explanation on how things work, checkout the [skpm Readme](https://github.com/skpm/skpm/blob/master/README.md)._


### Documentation

Sketch provides a JavaScript API as a bridge to its Objective-C core. You can [use Mocha](https://github.com/logancollins/Mocha#introspecting-the-objective-c-runtime) to inspect Sketch's native Objective-C objects. Sketch runs JavaScript code in JavaScriptCore, the JavaScript engine that powers Safari, with full ES6 support. You can render web-based React applications to a DOM with Sketch Webviews, or render React Primitive or React Native applications to a Sketch artboard with `react-sketchapp`. The Sketch Plugin Manager (SKPM) provides build and bundle configuration, as well as several polyfills for Node.js standard modules. You can [communicate between the Sketch Plugin and Sketch Webviews](https://github.com/skpm/sketch-module-web-view/blob/master/docs/communication-plugin-webview.md) using the `window.postMessage` API.

Sketch Plugin Documentation
* [Developer Sketch API Reference](https://developer.sketch.com/reference/api)
* [Developer Sketch API Action Reference](https://developer.sketch.com/reference/action/)
* [Developer Sketch Plugins Reference](https://developer.sketch.com/plugins/)
* [Sketch API](https://github.com/sketch-hq/SketchAPI)
* [Sketch API Examples](https://github.com/sketch-hq/SketchAPI/tree/develop/examples/) (plugin examples)
* [Sketch-Dev-Tools](https://github.com/skpm/sketch-dev-tools)
* [Debugging Sketch Plugins](https://developer.sketch.com/plugins/debugging)
* [SKPM/With-WebView](https://github.com/skpm/with-webview) (template)
* [Sketch-Module-Web-View](https://github.com/skpm/sketch-module-web-view)
* [Communication Between WebView and Plugin](https://github.com/skpm/sketch-module-web-view/blob/master/docs/communication-plugin-webview.md)

Sketch Headers
* [Sketch Headers](https://github.com/abynim/Sketch-Headers)

React-SketchApp
* [React-SketchApp](https://github.com/airbnb/react-sketchapp)
* [React-SketchApp Examples](https://github.com/airbnb/react-sketchapp/tree/master/examples)
* [React-SketchApp Styled-Components](https://github.com/airbnb/react-sketchapp/tree/master/examples/styled-components)

SKPM Modules
* [SKPM Git Repos](https://github.com/skpm)
* [Sketch Utils](https://github.com/skpm/sketch-utils)

SKPM Stdlib Polyfills
* [Util](https://github.com/skpm/util)
* [Path](https://github.com/skpm/path)
* [Dialog](https://github.com/skpm/dialog)
* [Events](https://github.com/skpm/events)
* [Process](https://github.com/skpm/process)
* [child_process](https://github.com/skpm/child_process)
* [OS](https://github.com/skpm/os)


### Usage

Install the dependencies:
```bash
yarn
```

Run the dev process and watch for changes:
```bash
yarn start
```

Use the Sketch Developer Tools from the Plugins menu inside Sketch.

Use this plugin, "Intouch Design System", from the Plugins menu inside Sketch.


### Custom Configuration

#### Babel

To customize Babel, you have two options:

- You may create a [`.babelrc`](https://babeljs.io/docs/usage/babelrc) file in your project's root directory. Any settings you define here will overwrite matching config-keys within skpm preset. For example, if you pass a "presets" object, it will replace & reset all Babel presets that skpm defaults to.

- If you'd like to modify or add to the existing Babel config, you must use a `webpack.skpm.config.js` file. Visit the [Webpack](#webpack) section for more info.

#### Webpack

To customize webpack create `webpack.skpm.config.js` file which exports function that will change webpack's config.

```js
/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config - original webpack config.
 * @param {object} entry - entry property from webpack config
 * @param {boolean} entry.isPluginCommand - whether the config is for a plugin command or a resource
 **/
module.exports = function(config, entry) {
  /** you can change config here **/
};
```

To use the polyfills or the mocks for certain Node.js globals and modules use the `node` property.

Visit [the official documention](https://webpack.js.org/configuration/node/) for available options.

```js
if(entry.isPluginCommand ){
  config.node = {
    setImmediate: false
  }
} else {
  config.node = false;
}
```

### Debugging

To view the output of your `console.log`, you have a few different options:

- Use the [`sketch-dev-tools`](https://github.com/skpm/sketch-dev-tools)
- Open `Console.app` and look for the sketch logs
- Look at the `~/Library/Logs/com.bohemiancoding.sketch3/Plugin Output.log` file

Skpm provides a convenient way to do the latter:

```bash
skpm log
```

The `-f` option causes `skpm log` to not stop when the end of logs is reached, but rather to wait for additional data to be appended to the input

### Publishing your plugin

```bash
skpm publish <bump>
```

(where `bump` can be `patch`, `minor` or `major`)

`skpm publish` will create a new release on your GitHub repository and create an appcast file in order for Sketch users to be notified of the update.

You will need to specify a `repository` in the `package.json`:

```diff
...
+ "repository" : {
+   "type": "git",
+   "url": "git+https://github.com/ORG/NAME.git"
+  }
...
```
