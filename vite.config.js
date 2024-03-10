import process from 'process'
import path from 'node:path'
import autoprefixer from 'autoprefixer'
import postcssSortMediaQueries from 'postcss-sort-media-queries'
import postcssUrl from 'postcss-url'
import liveReload from 'vite-plugin-live-reload'
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
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      input: getPageList(),
      output: {
        assetFileNames: ({ name }) => {
          const extType = name.split('.')[1]
          if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
            return `assets/fonts/[name][extname]`
          } else if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name][extname]`
          } else if (extType === 'css') {
            return `assets/css/style.css`
          } else {
            return `assets/[name].[ext]`
          }
        },
        entryFileNames: `assets/js/[name].js`,
        chunkFileNames: `assets/js/[name].js`,
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
    ViteEjsPlugin((viteConfig) => {
      return {
        root: viteConfig.root,
      }
    }),
  ],
}))
