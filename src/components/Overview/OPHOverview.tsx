import { useEffect, useState } from 'react';
import { OverviewData } from './Overview';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function OPHOverview() {
  const [cardData, setCardData] = useState<OverviewData[]>();
  const OPHdata = useSelector((state: RootState) => state.stat.OPH);

  useEffect(() => {
    if (OPHdata) {
      const sorted1 = OPHdata.slice(0).sort((a, b) => {
        return a.value1 - b.value1;
      });

      while (sorted1[0].value1 === 0) sorted1.shift();

      const sorted2 = OPHdata.slice(0).sort((a, b) => {
        return a.value2 - b.value2;
      });

      while (sorted2[0].value2 === 0) sorted2.shift();

      setCardData([
        {
          description: 'Hour with Least Customers',
          name: sorted1[0].name,
          value: sorted1[0].value1,
        },
        {
          description: 'Hour with Most Customers',
          name: sorted1[sorted1.length - 1].name,
          value: sorted1[sorted1.length - 1].value1,
        },
        {
          description: 'Hour with Least Food Sold',
          name: sorted2[0].name,
          value: sorted2[0].value2,
        },
        {
          description: 'Hour with Most Food Sold',
          name: sorted2[sorted2.length - 1].name,
          value: sorted2[sorted2.length - 1].value2,
        },
      ]);
    }
  }, [OPHdata]);

  function formatTime(time: string) {
    if (time <= '12') return time + ' AM';
    else if (time >= '13') return +time - 12 + ' PM';
  }

  return (
    <div id='oph-container'>
      {cardData &&
        cardData.map((card) => {
          return (
            <div
              className='card-container'
              key={card.description}>
              <span>{card.description}</span>
              <span>{formatTime(card.name)}</span>
              <span>@ {card.value} orders</span>
            </div>
          );
        })}
    </div>
  );
}
