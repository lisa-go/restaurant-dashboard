import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';
import { toggle } from './redux/slices/viewModeSlice';

export default function App() {
  const viewMode = useSelector((state: RootState) => state.viewMode.mode);
  const dispatch = useDispatch();

  return (
    <div
      className='App'
      id={viewMode}>
      <button onClick={() => dispatch(toggle())}>switch</button>
    </div>
  );
}
