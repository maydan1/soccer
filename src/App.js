import Table from './components/SoccerTeamsTable'
import './App.css';

var rootStyle = {
  backgroundColor: 'blue',
  color : 'black',
  height : '100vh'
}

function App() {
  return (
    <div
    style={{rootStyle}}>
        <Table/>
    </div>
  );
}

export default App;
