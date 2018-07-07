function setKeys(list = []) {
  return list.map((k, i) => ({ ...k, key: i }))
}

export {
  setKeys
}