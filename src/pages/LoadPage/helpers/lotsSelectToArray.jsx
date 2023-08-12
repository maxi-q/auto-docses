export const lotsSelectToArray = (obj) => {
  const newObj = {}
  for (const [key, value] of Object.entries(obj)) {
    if(key.split('-').length == 1) { 
      newObj[key] = value
     }else {
      if(newObj[key.split('-')[0]]) {
        newObj[key.split('-')[0]].push(value)
      }else {
        newObj[key.split('-')[0]] = [value]
      }
     }
  }

  return newObj
}