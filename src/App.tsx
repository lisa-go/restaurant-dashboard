import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import NavBar from './components/NavBar/NavBar';
import Content from './components/Content';
import PortraitHeader from './components/PortraitHeader/PortraitHeader';

export default function App() {
  const viewMode = useSelector((state: RootState) => state.viewMode.mode);

  return (
    <div
      className='App'
      id={viewMode}>
      <div id='page-container'>
        <NavBar />
        <Content />
        <PortraitHeader />
      </div>
    </div>
  );
}
