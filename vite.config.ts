import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import { viteExternalsPlugin } from 'vite-plugin-externals'
import EnvironmentPlugin from 'vite-plugin-environment'
import injectExternal from 'vite-plugin-inject-externals'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import * as fs from 'fs'
import { viteMockServe } from 'vite-plugin-mock'
import * as path from 'path'
const optimizeDepsElementPlusIncludes = ['element-plus/es']
fs.readdirSync('node_modules/element-plus/es/components').map((dirname) => {
  fs.access(
    `node_modules/element-plus/es/components/${dirname}/style/css.mjs`,
    (err) => {
      if (!err) {
        optimizeDepsElementPlusIncludes.push(
          `element-plus/es/components/${dirname}/style/css`
        )
      }
    }
  )
})
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  if (mode === 'development') {
    console.log('development mode')
  }
  if (mode === 'production') {
    console.log('production mode')
  }
  return {
    base: './', /// ==== publicPath
    optimizeDeps: {
      include: optimizeDepsElementPlusIncludes
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      // 给 process 定义变量  需要在d.ts 配合
      EnvironmentPlugin({
        appKey: 'vue'
      }),
      // html 注入
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: 'filename'
          }
        }
      }),

      // 相等于webpack 的externals
      // injectExternal({
      //   command: true,
      //   modules: [
      //     {
      //       name: 'axios',
      //       global: 'axios',
      //       path: 'https://cdn.jsdelivr.net/npm/axios@0.22.0/dist/axios.min.js'
      //     },
      //     {
      //       name: 'md-editor-v3/lib/style.css',
      //       // 如果有name，但是没有global，会删除掉name的导入，仅适用于裸导入(import 'md-editor-v3/lib/style.css')
      //       path: 'https://cdn.jsdelivr.net/npm/md-editor-v3@1.5.0/lib/style.css'
      //     }
      //   ]
      // }),
      // // 跟vite-plugin-inject-externals 配合使用
      // viteExternalsPlugin({
      //   axios: 'axios'
      // }),

      //  代码大小分析
      visualizer({
        // open: true
      }),
      viteMockServe({
        localEnabled: command === 'serve',
      })
    ],
    // 自定义变量 需要在d.ts 声明
    define: {
      defName: JSON.stringify({ name: 'b' })
    },
    // 静态资源路径
    publicDir: 'public', // 静态资源的路径，不需要编译打包
    resolve: {
      // extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
      alias: {
        '@': path.resolve(__dirname, 'src/'),
        assets: path.resolve(__dirname, 'src/assets/'),
        images: path.resolve(__dirname, 'src/assets/images/'),
        components: path.resolve(__dirname, 'src/components/'),
        views: path.resolve(__dirname, 'src/views/')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          /**如果引入多个文件，可以使用
           * '@import "@/assets/scss/globalVariable1.scss";
           * @import"@/assets/scss/globalVariable2.scss";'
           **/
          additionalData: '@import "@/assets/css/utils.scss";'
        }
      }
    },
    server: {
      port: 3000,
      strictPort: false,
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    // 打包 生成的资源
    build: {
      target: 'es2015',
      chunkSizeWarningLimit: 1024,
      rollupOptions: {
        output: {
          manualChunks: {
            vlib: ['vue', 'vue-router']
            // elmplus: ['element-plus'],
            // lodash: ['lodash'],
            // vlib: ['vue', 'vue-router', 'vuex', 'vue-i18n']
          }
        }
      },
      // 现网去除源码映射
      sourcemap: env.VITE_SOURCE_TYPE === 'production' ? false : 'inline'
    }
  }
})
