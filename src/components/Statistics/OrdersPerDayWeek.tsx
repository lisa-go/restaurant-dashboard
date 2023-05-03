import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  LineChart,
  Legend,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import { DataPoint } from '../../redux/slices/statSlice';
import { useEffect, useState } from 'react';

export default function OrdersPerDayWeek() {
  const viewMode = useSelector((state: RootState) => state.viewMode.mode);
  const OPDWdata = useSelector((state: RootState) => state.stat.OPDW);

  const [data, setData] = useState<DataPoint[]>();

  useEffect(() => {
    setData(OPDWdata);
  }, [OPDWdata]);

  const darkColors = ['#08203e', '#27143f', '#11473c', '#710c30'];
  const lightColors = ['#caefd7', '#f5bfd7', '#abc9e9', '#be98d3'];

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
          label='Day'
          dataKey='name'
          stroke={viewMode === 'light' ? '#1f232c' : '#f5f5f5'}
        />
        <YAxis
          label='Orders'
          domain={['dataMin - 25', 'dataMax + 25']}
          stroke={viewMode === 'light' ? '#1f232c' : '#f5f5f5'}
        />
        <Tooltip />
        <Line
          type='monotone'
          dataKey='value'
          stroke='#8884d8'
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
