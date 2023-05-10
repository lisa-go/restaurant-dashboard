import './statistics.scss';
import ItemOrderFrequency from './ItemOrderFrequency';
import { useRef } from 'react';
import OrdersPerDayWeek from './OrdersPerDayWeek';
import OrdersPerHour from './OrdersPerHour';

export default function Statistics() {
  const IOFref = useRef<null | HTMLDivElement>(null);
  const OPDWref = useRef<null | HTMLDivElement>(null);
  const OPHref = useRef<null | HTMLDivElement>(null);

  const graphs = [
    { ref: IOFref, name: 'Item Order Frequency' },
    { ref: OPDWref, name: 'Orders Per Day in a Week' },
    { ref: OPHref, name: 'Orders & Items Ordered Per Hour' },
  ];

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const r = graphs[+e.target.value].ref;
    r.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id='statistics-container'>
      <div className='header'>Statistics</div>
      <select
        name='graph-select'
        id='graph-select'
        onChange={(e) => onSelect(e)}>
        {graphs.map((graph, index) => {
          return (
            <option
              value={index}
              key={index}>
              {graph.name}
            </option>
          );
        })}
      </select>
      <div className='content-container'>
        <div className='graph-container'>
          <h1 ref={IOFref}>{graphs[0].name}</h1>
          <ItemOrderFrequency />
        </div>

        <div className='graph-container'>
          <h1 ref={OPDWref}>{graphs[1].name}</h1>
          <OrdersPerDayWeek />
        </div>

        <div className='graph-container'>
          <h1 ref={OPHref}>{graphs[2].name}</h1>
          <OrdersPerHour />
        </div>
      </div>
    </div>
  );
}
