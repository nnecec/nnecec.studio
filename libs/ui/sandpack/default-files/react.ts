import type { SandpackFiles } from '@codesandbox/sandpack-react'

const IndexJs = `import React, { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import "./styles.css";

import App from "./App";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
`

const StylesCss = `/* Custom styles for your React previews here */
body {
  font-family: sans-serif;
  -webkit-font-smoothing: auto;
  -moz-font-smoothing: auto;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: auto;
  text-rendering: optimizeLegibility;
  font-smooth: always;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}
`

const IndexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`

export const reactFiles: SandpackFiles = {
  '/index.js': {
    code: IndexJs,
    hidden: true,
  },
  '/public/index.html': {
    code: IndexHtml,
    hidden: true,
  },
  '/styles.css': {
    code: StylesCss,
    hidden: true,
  },
}
