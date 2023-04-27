import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  LabelList,
} from 'recharts';
import { DataPoint, updateIOF } from '../../redux/slices/statSlice';

export default function ItemOrderFrequency() {
  const viewMode = useSelector((state: RootState) => state.viewMode.mode);
  const { tData, fData, dData } = useSelector((state: RootState) => state.data);

  const data = useSelector((state: RootState) => state.stat.IOF);
  const dispatch = useDispatch();

  /* populate data state with all items */
  useEffect(() => {
    let list: DataPoint[] = [];
    if (dData && fData) {
      dData.concat(fData).forEach((item) => {
        list.push({ name: item.name, value: 0 });
      });
    }

    tData?.forEach((trans) => {
      trans.order.forEach((item) => {
        let tempItem = list.filter((element) => element.name === item.name)[0];
        tempItem.value += item.qty;
        list.sort((a, b) => {
          return a.value - b.value;
        });
      });
    });
    dispatch(updateIOF(list));
  }, [dData, fData]);

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
        <Legend />
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
