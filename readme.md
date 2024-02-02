# Myopic Defocus Browser Extension based on Manifest V3

## Features

- Calculate Longitudinal Chromatic Aberration and display any website with LCA myopic defoucs applied.
- Uses Manifest v3 ([not yet compatible with Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1578284))
- Use npm dependencies thanks to Parcel 2.
- [Auto-syncing options](#auto-syncing-options).
- [Auto-publishing](#publishing) with auto-versioning and support for manual releases.

### Example

Applied strong Myopic Defocus on Wikipedia. For best result, settings should be adjusted for viewing conditions.
<p align="center">
  <img src="https://lh3.googleusercontent.com/SSZTfl1r1BLk95HyGY9sctlw2jhLSUULIGAxL1D-5G-ic9rj0r_g518zH9kByFdk-JZhYx5D8JX-_-0PXcxMgtKFQQ=s800-w800-h500" alt="Myopic Defocus applied to Wikipedia">
</p>

## Download

### Prebuilt

- This extension from Chrome Web Store: [Myopic Defocus](https://chromewebstore.google.com/detail/refractify-myopic-defocus/dpnfdlnkgojjihdmgmacnmheflkojijm?hl=en) .
- Live demo and desktop version: [refractify.io](https://refractify.io/)

### 🛠 Build locally

1. Checkout the copied repository to your local machine eg. with `git clone https://github.com/my-username/my-awesome-extension/`
1. Run `npm install` to install all required dependencies
1. Run `npm run build`

The build step will create the `distribution` folder, this folder will contain the generated extension.

### 🏃 Run the extension

Using [web-ext](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/) is recommended for automatic reloading and running in a dedicated browser instance. Alternatively you can load the extension manually (see below).

1. Run `npm run watch` to watch for file changes and build continuously
1. Run `npm install --global web-ext` (only only for the first time)
1. In another terminal, run `web-ext run -t chromium`
1. Check that the extension is loaded by opening the extension options ([in Firefox](media/extension_options_firefox.png) or [in Chrome](media/extension_options_chrome.png)).

#### Manually

You can also [load the extension manually in Chrome](https://www.smashingmagazine.com/2017/04/browser-extension-edge-chrome-firefox-opera-brave-vivaldi/#google-chrome-opera-vivaldi) or [Firefox](https://www.smashingmagazine.com/2017/04/browser-extension-edge-chrome-firefox-opera-brave-vivaldi/#mozilla-firefox).

## Configuration

The extension doesn't target any specific ECMAScript environment or provide any transpiling by default. The extensions output will be the same ECMAScript you write. This allows us to always target the latest browser version, which is a good practice you should be following.

## Credits

Based on [browser-extension-template](https://github.com/fregante/browser-extension-template) by fragrante

## License

This browser extension template is released under the [GNU General Public License version 3.0 (GPL-3.0)](#license) and mentioned below.

[![GPL-3.0](https://www.gnu.org/graphics/gplv3-127x51.png)](https://www.gnu.org/licenses/gpl-3.0.html)

## Project home

[refractify.io](https://refractify.io/)
