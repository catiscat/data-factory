function setKeys(list) {
  return list ? list.map((k, i) => ({ ...k, key: i })) : undefined
}

export {
  setKeys
}