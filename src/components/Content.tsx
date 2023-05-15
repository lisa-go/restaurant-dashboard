import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Overview from './Overview/Overview';
import Statistics from './Statistics/Statistics';
import Menu from './Menu/Menu';
import {
  useGetMenuDrinksQuery,
  useGetMenuFoodsQuery,
  useGetTransactionsQuery,
} from '../redux/slices/apiSlice';
import { useEffect, useState } from 'react';
import {
  updateDrinks,
  updateFoods,
  updateTransactions,
} from '../redux/slices/dataSlice';
import Orders from './Orders/Orders';
import {
  DataPoint,
  DataTwoPoint,
  updateIOF,
  updateOPDW,
  updateOPH,
} from '../redux/slices/statSlice';
import moment from 'moment';

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
    if (foodData) {
      dispatch(updateFoods(foodData));
    }
    if (drinkData) {
      dispatch(updateDrinks(drinkData));
    }
  }, [transactionData, foodData, drinkData]);

  useEffect(() => {
    if (transactionData) {
      const interval = setInterval(() => refetch(), 150000);
      return () => clearInterval(interval);
    }
  }, [transactionData]);

  /* data statistics */
  const { tData, fData, dData } = useSelector((state: RootState) => state.data);

  /* populate IOF data with all items */
  useEffect(() => {
    if (tData) {
      let list: DataPoint[] = [];
      if (dData && fData) {
        dData.concat(fData).forEach((item) => {
          list.push({ name: item.name, value: 0 });
        });
      }

      tData.forEach((trans) => {
        trans.order.forEach((item) => {
          let tempItem = list.filter(
            (element) => element.name === item.name
          )[0];
          tempItem.value += item.qty;
        });
      });
      list.sort((a, b) => {
        return a.value - b.value;
      });
      dispatch(updateIOF(list));
    }
  }, [dData, fData, tData]);

  /* populate OPDW data */
  useEffect(() => {
    if (tData) {
      let days: DataPoint[] = [
        { name: 'Monday', value: 0 },
        { name: 'Tuesday', value: 0 },
        { name: 'Wednesday', value: 0 },
        { name: 'Thursday', value: 0 },
        { name: 'Friday', value: 0 },
        { name: 'Saturday', value: 0 },
        { name: 'Sunday', value: 0 },
      ];

      tData.forEach((trans) => {
        switch (moment(trans.orderDate).format('dddd')) {
          case 'Monday':
            days[0].value += 1;
            break;
          case 'Tuesday':
            days[1].value += 1;
            break;
          case 'Wednesday':
            days[2].value += 1;
            break;
          case 'Thursday':
            days[3].value += 1;
            break;
          case 'Friday':
            days[4].value += 1;
            break;
          case 'Saturday':
            days[5].value += 1;
            break;
          case 'Sunday':
            days[6].value += 1;
            break;
          default:
            break;
        }
      });
      dispatch(updateOPDW(days));
    }
  }, [tData]);

  /* populate OPH data */
  useEffect(() => {
    if (tData) {
      let hours: DataTwoPoint[] = [
        { name: '00', value1: 0, value2: 0 },
        { name: '01', value1: 0, value2: 0 },
        { name: '02', value1: 0, value2: 0 },
        { name: '03', value1: 0, value2: 0 },
        { name: '04', value1: 0, value2: 0 },
        { name: '05', value1: 0, value2: 0 },
        { name: '06', value1: 0, value2: 0 },
        { name: '07', value1: 0, value2: 0 },
        { name: '08', value1: 0, value2: 0 },
        { name: '09', value1: 0, value2: 0 },
        { name: '10', value1: 0, value2: 0 },
        { name: '11', value1: 0, value2: 0 },
        { name: '12', value1: 0, value2: 0 },
        { name: '13', value1: 0, value2: 0 },
        { name: '14', value1: 0, value2: 0 },
        { name: '15', value1: 0, value2: 0 },
        { name: '16', value1: 0, value2: 0 },
        { name: '17', value1: 0, value2: 0 },
        { name: '18', value1: 0, value2: 0 },
        { name: '19', value1: 0, value2: 0 },
        { name: '20', value1: 0, value2: 0 },
        { name: '21', value1: 0, value2: 0 },
        { name: '22', value1: 0, value2: 0 },
        { name: '23', value1: 0, value2: 0 },
      ];

      /* value1 being amount of orders, value2 being amount of items ordered */
      tData.forEach((trans) => {
        hours[+moment(trans.orderDate).format('HH')].value1 += 1;
        hours[+moment(trans.orderDate).format('HH')].value2 += trans.totalQty;
      });
      dispatch(updateOPH(hours));
    }
  }, [tData]);

  return (
    <main>
      {page === 'Overview' ? (
        <Overview />
      ) : page === "Today's Orders" ? (
        <Orders mode={'today'} />
      ) : page === 'Past Orders' ? (
        <Orders mode={'past'} />
      ) : page === 'Statistics' ? (
        <Statistics />
      ) : page === 'Menu' ? (
        <Menu />
      ) : null}
    </main>
  );
}
