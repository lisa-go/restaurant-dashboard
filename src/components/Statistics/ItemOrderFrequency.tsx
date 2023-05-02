import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import { DataPoint } from '../../redux/slices/statSlice';
import { useEffect, useState } from 'react';

export default function ItemOrderFrequency() {
  const viewMode = useSelector((state: RootState) => state.viewMode.mode);

  const iofData = useSelector((state: RootState) => state.stat.IOF);

  const [data, setData] = useState<DataPoint[]>();

  useEffect(() => {
    setData(iofData);
  }, [iofData]);

  const darkColors = ['#08203e', '#27143f', '#11473c', '#710c30'];
  const lightColors = ['#caefd7', '#f5bfd7', '#abc9e9', '#be98d3'];

  return (
    <ResponsiveContainer
      width='100%'
      height='100%'>
      <BarChart
        layout='vertical'
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          type='number'
          stroke={viewMode === 'light' ? '#1f232c' : '#f5f5f5'}
        />
        <YAxis
          type='category'
          dataKey='name'
          domain={[0, 'dataMax']}
          hide
        />
        <Tooltip wrapperStyle={{ color: '#83746e' }} />

        <Bar dataKey='value'>
          {data &&
            data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  viewMode === 'light'
                    ? lightColors[index % 4]
                    : darkColors[index % 4]
                }
                strokeWidth={index === 2 ? 4 : 1}
              />
            ))}
          <LabelList
            dataKey='name'
            position='insideRight'
            fill={viewMode === 'light' ? '#1f232c' : '#f5f5f5'}
            offset={10}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
