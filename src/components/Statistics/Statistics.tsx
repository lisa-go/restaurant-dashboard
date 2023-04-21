import './statistics.scss';
import ItemOrderFrequency from './ItemOrderFrequency';

export default function Statistics() {
  return (
    <div id='statistics-container'>
      <div className='header'>Statistics</div>
      <div className='content-container'>
        <div className='graph-container'>
          <h1>Individual Item Popularity</h1>
          <ItemOrderFrequency />
        </div>
        <hr />
      </div>
    </div>
  );
}
