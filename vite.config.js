import process from 'process'
import path from 'node:path'
import autoprefixer from 'autoprefixer'
import postcssSortMediaQueries from 'postcss-sort-media-queries'
import postcssUrl from 'postcss-url'
import liveReload from 'vite-plugin-live-reload'
import mockServer from 'vite-plugin-mock-server'
import { readdirSync, statSync } from 'fs'
import { resolve, join } from 'path'
import { defineConfig } from 'vite'
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const htmlFilePathList = []

function handleSearchFile(path) {
  const itemList = readdirSync(path)
  for (const item of itemList) {
    const itemPath = join(path, item)
    if (statSync(itemPath).isDirectory()) {
      if (['ejs', 'scss', 'public', 'js'].includes(item)) {
        continue
      }
      handleSearchFile(itemPath)
    } else if (item.includes('.html')) {
      const srcStrIndex = itemPath.indexOf('src/')
      const htmlFilePath = itemPath.slice(srcStrIndex)
      htmlFilePathList.push(htmlFilePath)
    }
  }
}

function getPageList() {
  const srcPath = resolve(__dirname, 'src')
  handleSearchFile(srcPath)
  return htmlFilePathList.reduce((acc, path) => {
    acc[path] = resolve(__dirname, path)
    return acc
  }, {})
}

export default defineConfig(() => ({
  root: './src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    minify: process.env.MINIFY ? true : false,
    assetsInlineLimit: 0,
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      input: getPageList(),
      output: {
        assetFileNames: ({ name }) => {
          const extType = name.split('.')[1]
          if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
            return `fonts/[name][extname]`
          } else if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `images/[name][extname]`
          } else if (extType === 'css') {
            return `css/style.css`
          } else {
            return `[name].[ext]`
          }
        },
        entryFileNames: `js/index.js`,
        chunkFileNames: `js/[name].js`,
      },
    },
  },
  server: {
    port: 8000,
    host: '0.0.0.0',
  },
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [autoprefixer, postcssSortMediaQueries, postcssUrl],
    },
  },
  plugins: [
    liveReload(['**/*.ejs']),
    mockServer({
      urlPrefixes: ['/_api/'],
    }),
    ViteEjsPlugin((viteConfig) => {
      return {
        root: viteConfig.root,
      }
    }),
  ],
}))
