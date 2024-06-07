import { statSync, readdirSync, existsSync } from 'fs'
import { join } from 'path'
import imagemin from 'imagemin'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminPngquant from 'imagemin-pngquant'
import imageminGifsicle from 'imagemin-gifsicle'
import imageminSvgo from 'imagemin-svgo'

function getDirectories(path) {
  return readdirSync(path)
    .map((name) => join(path, name))
    .filter((path) => statSync(path).isDirectory())
}

function getDirectoriesRecursive(path) {
  return [
    path,
    ...getDirectories(path)
      .map(getDirectoriesRecursive)
      .reduce((a, b) => a.concat(b), []),
  ]
}

function handleImagemin() {
  if (!existsSync('dist/images')) return

  const imageDirs = Array(0).concat(getDirectoriesRecursive('dist/images'))
  const regex = new RegExp('^' + 'dist/images')

  imageDirs.forEach(async (imageDir) => {
    await imagemin([`${imageDir}/*.{jpeg,jpg,png,gif,svg}`], {
      destination: join('dist/images', imageDir.replace(regex, '')),
      plugins: [
        imageminMozjpeg({ quality: 95 }), // jpg圧縮
        imageminPngquant({ quality: [0.6, 0.8] }), // png圧縮
        imageminGifsicle(), // gif圧縮
        imageminSvgo(), // svg圧縮
      ],
    })
  })
}

handleImagemin()
