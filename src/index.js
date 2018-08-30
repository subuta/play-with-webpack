import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const hoge = 'hoge'

const obj = {
  hoge,
  fuga: 1
}

const obj2 = { ...obj }

const { fuga, ...rest } = obj2

const waait = new Promise((resolve) => {
  setTimeout(resolve, 1000)
})

const render = (state) => {
  ReactDOM.render(<App state={state} />, document.getElementById('app'))
}

const main = async () => {
  render('started!')

  await waait

  render('awaited')

  console.log('env = ', process.env.NODE_ENV)
  console.log(fuga)
  console.log(rest)

  render('ended')
}

// Native
// Check if the DOMContentLoaded has already been completed
if (document.readyState !== 'loading') {
  main()
} else {
  document.addEventListener('DOMContentLoaded', main)
}

if (module.hot) {
  module.hot.accept()
}
