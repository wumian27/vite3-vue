/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare const defName: {
  name: string
}

interface ImportMetaEnv extends ImportMetaEnv {
  VITE_API_URL: string
  VITE_APP_ID: string
}
interface Process extends NodeJS.Process {
  env: {
    appKey: string
  }
}
declare const process: Process

// declare module 'axios' {
//   export default any
// }
