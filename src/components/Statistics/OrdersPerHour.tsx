import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { DataTwoPoint } from '../../redux/slices/statSlice';
import { useEffect, useState } from 'react';

export default function OrdersPerHour() {
  const viewMode = useSelector((state: RootState) => state.viewMode.mode);
  const OPHdata = useSelector((state: RootState) => state.stat.OPH);

  const [data, setData] = useState<DataTwoPoint[]>();

  useEffect(() => {
    setData(OPHdata);
  }, [OPHdata]);

  return (
    <ResponsiveContainer
      width='100%'
      height='90%'>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dataKey='name'
          stroke={viewMode === 'light' ? '#1f232c' : '#f5f5f5'}
        />
        <YAxis stroke={viewMode === 'light' ? '#1f232c' : '#f5f5f5'} />
        <Tooltip />
        <Line
          name='Amount of Orders'
          type='monotone'
          dataKey='value1'
          stroke='#8884d8'
        />
        <Line
          name='Items ordered'
          type='monotone'
          dataKey='value2'
          stroke='#82ca9d'
        />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
}
