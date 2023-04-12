import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Overview from './Overview/Overview';
import Current from './CurrentOrders/Current';
import Past from './PastOrders/Past';
import Statistics from './Statistics/Statistics';
import Menu from './Menu/Menu';

export default function Content() {
  const page = useSelector((state: RootState) => state.page.current);

  return (
    <main>
      {page === 'Overview' ? (
        <Overview />
      ) : page === 'Current Orders' ? (
        <Current />
      ) : page === 'Past Orders' ? (
        <Past />
      ) : page === 'Statistics' ? (
        <Statistics />
      ) : page === 'Menu' ? (
        <Menu />
      ) : null}
    </main>
  );
}
