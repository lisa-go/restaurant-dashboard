import { useDispatch } from 'react-redux';
import { toggle } from '../redux/slices/viewModeSlice';

export default function NavBar() {
  const dispatch = useDispatch();
  return (
    <header>
      <span>logo</span>
      <span>things</span>
      <button onClick={() => dispatch(toggle())}>switch</button>
    </header>
  );
}
