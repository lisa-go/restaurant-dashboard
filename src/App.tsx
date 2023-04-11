import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import NavBar from './components/NavBar/NavBar';
import Content from './components/Content';

export default function App() {
  const viewMode = useSelector((state: RootState) => state.viewMode.mode);

  return (
    <div
      className='App'
      id={viewMode}>
      <div id='page-container'>
        <NavBar />
        <Content />
      </div>
    </div>
  );
}
