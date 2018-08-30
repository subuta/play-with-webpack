import "@babel/polyfill"

const hoge = 'hoge'

const obj = {
  hoge,
  fuga: 1
}

const obj2 = { ...obj }

const { fuga, ...rest } = obj2

console.log(fuga)
console.log(rest)