import './App.css';
import { AgGridTable } from './components/AgGridTable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome logged in user.</h1>
      </header>
      <AgGridTable></AgGridTable>
    </div>
  );
}

export default App;
