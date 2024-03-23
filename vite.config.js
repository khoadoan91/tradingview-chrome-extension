import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';
import { cwd } from 'node:process';

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [crx({ manifest })],
    define: {
      "process": {
        "env": {
          "NODE_ENV": "development"
        },
        cwd: cwd
      }
    }
  }
});

// export default defineConfig({
//   plugins: [crx(
//     {
//       manifest
//     })],
//   define: {
//     "process.env.NODE_ENV": "development"
//   }
// })
