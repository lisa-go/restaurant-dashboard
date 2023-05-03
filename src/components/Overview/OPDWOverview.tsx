import { useEffect, useState } from 'react';
import { OverviewData } from './Overview';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function OPDWOverview() {
  const [cardData, setCardData] = useState<OverviewData[]>();
  const OPDWdata = useSelector((state: RootState) => state.stat.OPDW);

  useEffect(() => {
    if (OPDWdata) {
      const sorted = OPDWdata.slice(0).sort((a, b) => {
        return a.value - b.value;
      });
      setCardData([
        {
          description: 'Slowest Day',
          name: sorted[0].name,
          value: sorted[0].value,
        },
        {
          description: 'Busiest Day',
          name: sorted[sorted.length - 1].name,
          value: sorted[sorted.length - 1].value,
        },
      ]);
    }
  }, [OPDWdata]);

  return (
    <div id='opdw-container'>
      {cardData &&
        cardData.map((card) => {
          return (
            <div
              className='card-container'
              key={card.description}>
              <span>{card.description}</span>
              <span>{card.name}</span>
              <span>@ {card.value} orders</span>
            </div>
          );
        })}
    </div>
  );
}
