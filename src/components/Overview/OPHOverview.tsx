import { useEffect, useState } from 'react';
import { OverviewData } from './Overview';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function OPHOverview() {
  const [cardData, setCardData] = useState<OverviewData[]>();
  const OPHdata = useSelector((state: RootState) => state.stat.OPH);

  useEffect(() => {
    if (!OPHdata || OPHdata.length === 0) {
      setCardData(undefined);
      return;
    }

    const sortedByCustomers = OPHdata.slice().sort(
      (a, b) => a.value1 - b.value1
    );
    const sortedByItems = OPHdata.slice().sort((a, b) => a.value2 - b.value2);

    // Find first non-zero entries where possible, otherwise fallback to min/max
    const leastCustomer =
      sortedByCustomers.find((x) => x.value1 > 0) || sortedByCustomers[0];
    const mostCustomer =
      sortedByCustomers[sortedByCustomers.length - 1] || leastCustomer;

    const leastItems =
      sortedByItems.find((x) => x.value2 > 0) || sortedByItems[0];
    const mostItems = sortedByItems[sortedByItems.length - 1] || leastItems;

    setCardData([
      {
        description: 'Hour with Least Customers',
        name: leastCustomer.name,
        value: leastCustomer.value1,
      },
      {
        description: 'Hour with Most Customers',
        name: mostCustomer.name,
        value: mostCustomer.value1,
      },
      {
        description: 'Hour with Least Food Sold',
        name: leastItems.name,
        value: leastItems.value2,
      },
      {
        description: 'Hour with Most Food Sold',
        name: mostItems.name,
        value: mostItems.value2,
      },
    ]);
  }, [OPHdata]);

  function formatTime(time: string) {
    const hr = parseInt(time, 10);
    if (Number.isNaN(hr)) return time;
    if (hr === 0) return '12 AM';
    if (hr < 12) return `${hr} AM`;
    if (hr === 12) return '12 PM';
    return `${hr - 12} PM`;
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
