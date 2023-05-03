import './statistics.scss';
import ItemOrderFrequency from './ItemOrderFrequency';
import { useRef } from 'react';

export default function Statistics() {
  const IOFref = useRef<null | HTMLDivElement>(null);
  const testref = useRef<null | HTMLDivElement>(null);

  const graphs = [
    { ref: IOFref, name: 'Item Order Frequency' },
    { ref: testref, name: 'test' },
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
          <h1 ref={IOFref}>Individual Item Popularity</h1>
          <ItemOrderFrequency />
        </div>
        <hr />
        <div className='graph-container'>
          <h1 ref={testref}>Test</h1>
          <ItemOrderFrequency />
        </div>
      </div>
    </div>
  );
}
