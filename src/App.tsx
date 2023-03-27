import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './redux/store'
import { increment, decrement, incrementByAmount } from './redux/slices/counterSlice'
import { useState } from 'react'

function App() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()
  const [num, setNum] = useState<number>(0)

  return (
    <div className="App">

        <button onClick={() => dispatch(increment())}>
          count is {count}
        </button>
        <button onClick={() => dispatch(decrement())}>
          minus
        </button>
        <input type="number" onChange={(e) => setNum(+e.target.value)} />
        <button onClick={() => dispatch(incrementByAmount(num))}>add</button>
        
    </div>
  )
}

export default App
