import React from 'react'
import { hot } from 'react-hot-loader'
import {
  compose,
  withState,
  withHandlers
} from 'recompose'

const enhance = compose(
  hot(module),
  withState('counter', 'setCounter', 0),
  withHandlers({
    increment: ({ counter, setCounter }) => () => {
      setCounter(counter + 1)
    }
  })
)

export default enhance(({ state, increment, counter }) => {
  return (
    <div>
      <b>{state}</b>

      <div style={{ marginTop: 8 }}>
        <b style={{ marginRight: 8 }}>{counter}</b>
        <button onClick={increment}>+</button>
      </div>
    </div>
  )
})
