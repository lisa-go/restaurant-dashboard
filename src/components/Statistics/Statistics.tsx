import ItemOrderFrequency from './ItemOrderFrequency';

export default function Statistics() {
  return (
    <div id='statistics-container'>
      <div className='header'>Statistics</div>
      <div className='content-container'>
        <ItemOrderFrequency />
      </div>
    </div>
  );
}
