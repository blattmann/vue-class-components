export default function({ config }, inject) {
  const randNum = (min, max) => Math.floor(Math.random() * (+max - +min)) + +min
  const assetImage = (directory, min, max, format = 'png') =>
    `/images/${directory}/${randNum(min, max)}.${format}`
  const getImage = (directory, name, format = 'png') =>
    `/images/${directory}/${name}.${format}`

  inject('randNum', randNum)
  inject('assetImage', assetImage)
  inject('getImage', getImage)
}
