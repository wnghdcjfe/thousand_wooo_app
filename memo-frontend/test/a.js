const a = '\"username\" length must be at least 2 characters long'
const b = a.replace(/"|\\/g, '')
console.log(a)
console.log(b)