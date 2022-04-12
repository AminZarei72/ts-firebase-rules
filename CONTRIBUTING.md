
## Setup

0. First, remove any existing `ts-firebase-rules` global installations that may conflict.

   ```
   npm uninstall -g ts-firebase-rules
   ```

1. Fork this repository to your own GitHub account and clone it to your local device:

   ```
   git clone https://github.com/your-name/ts-firebase-rules.git
   cd ts-firebase-rules
   ```

1. Install the dependencies and build the TypeScript files to JavaScript:

   ```
   npm install
   npm run build
   ```

   > **Note:** you'll need to run `npm run build` any time you want to see your changes, or run `npm run watch` to leave it in watch mode.

1. link your modifed `ts-firebase-rules` local dev version:

   ```
   npm link
   ```

4) To use your local version when running, run this in the project:

   ```
   npm link ts-firebase-rules
   ```

   You should see a success message: `success Using linked package for "ts-firebase-rules".` The project will now use the locally linked version instead of a copy from `node_modules`.

## Submitting a PR

Be sure to run `npm run test` before you make your PR to make sure you haven't broken anything.

and thats it, start developing and lets create a useful pacakge for opensource community :D
