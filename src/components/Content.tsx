import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Overview from './Overview/Overview';
import Past from './PastOrders/Past';
import Statistics from './Statistics/Statistics';
import Menu from './Menu/Menu';
import {
  useGetMenuDrinksQuery,
  useGetMenuFoodsQuery,
  useGetTransactionsQuery,
} from '../redux/slices/apiSlice';
import { useEffect } from 'react';
import {
  updateDrinks,
  updateFoods,
  updateTransactions,
} from '../redux/slices/dataSlice';
import Today from './TodaysOrders/Today';

export default function Content() {
  const page = useSelector((state: RootState) => state.page.current);

  /* fetch data and update data state when data changes */
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data);
  const { data: transactionData, refetch } = useGetTransactionsQuery();
  const { data: foodData } = useGetMenuFoodsQuery();
  const { data: drinkData } = useGetMenuDrinksQuery();

  useEffect(() => {
    if (transactionData && transactionData !== data.tData) {
      dispatch(updateTransactions(transactionData));
    }
    if (foodData && foodData !== data.fData) {
      dispatch(updateFoods(foodData));
    }
    if (drinkData && drinkData !== data.dData) {
      dispatch(updateDrinks(drinkData));
    }
  }, [transactionData, foodData, drinkData]);

  useEffect(() => {
    const interval = setInterval(() => refetch(), 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      {page === 'Overview' ? (
        <Overview />
      ) : page === "Today's Orders" ? (
        <Today />
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
