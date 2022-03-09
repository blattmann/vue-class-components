/*
 *
 */
/*
 *  Common Dependencies
 */
const { series, parallel, watch, src, dest, gulp } = require('gulp')
const fileExists = require('file-exists')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const appKey = 'tv-lobby-commons'

/**
 * ***********************************************************************************
 * DEVELOPMENT TASKS - No Minify, Source maps
 * * ***********************************************************************************
 */
/**
 ********* watch .shared tasks ******************
 */
function start(cb) {
  const watcher = watch(['src/**/*.shared.vue'])

  watcher.on('change', (path, stats) => {
    // console.log(`File ${path} was changed`)
    const pathStr = `${path}`

    const testFile = pathStr.replace('.vue', '.spec.js')
    copyTestSpec(testFile)

    return src(`${path}`)
      .pipe(
        rename(path => {
          path.basename = path.basename.replace('.shared', '')
        })
      )
      .pipe(dest(`../TrustVisitor.Vue.SharedLibraries/${appKey}/`))
  })
  //  watcher.close()
  cb()
}

function copyTestSpec(testFile) {
  if (fileExists.sync(`${testFile}`)) {
    return src(`${testFile}`)
      .pipe(replace(/.shared/g, ''))
      .pipe(
        rename(path => {
          path.basename = path.basename.replace('.shared', '')
        })
      )
      .pipe(dest(`../TrustVisitor.Vue.SharedLibraries/${appKey}/`))
  }
}

/**
 * ***********************************************************************************
 * DEFAULT TASK
 * * ***********************************************************************************
 *
 */
exports.default = series(start)
