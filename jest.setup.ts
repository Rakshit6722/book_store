import "@testing-library/jest-dom";

const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
console.log('Jest setup loaded');
Object.defineProperty(global, 'import', {
    value: {
      meta: {
        env: {
          VITE_BASE_URL: 'your-base-url', 
        },
      },
    },
  });
