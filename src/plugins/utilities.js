/**
 *  @name - utilities
 *
 *  @desc - globals helper functions.
 * Can be used globally by adding a `$` in front of the
 * function name, e.g. `$getImageName(image), 'jpg')`
 *
 *  @author - Front End Dev @Certipath
 *
 */

export default function({ config }, inject) {
  const randNum = (min, max) => Math.floor(Math.random() * (+max - +min)) + +min
  const assetImage = (directory, min, max, format = 'png') =>
    `/images/${directory}/${randNum(min, max)}.${format}`
  const getImage = (directory, name, format = 'png') =>
    `/images/${directory}/${name}.${format}`
  const getImageName = name => {
    if (name) {
      return name.replace(/\s/g, '_').toLowerCase()
    }
  }
  const convertSpeed = speed => {
    const factor = 1.609
    const decimals = Math.pow(10, 2)
    return Math.round((speed / factor) * decimals) / decimals
  }
  inject('randNum', randNum)
  inject('assetImage', assetImage)
  inject('getImage', getImage)
  inject('getImageName', getImageName)
  inject('convertSpeed', convertSpeed)
}
