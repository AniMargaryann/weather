import { Provider } from 'react-redux';
import './App.css';
import WeatherApp from './Components/weahterApp/weather';
import { Store } from './Redux/redux';

function App() {
  return (
    <Provider store={Store}>
    <div className="App">
      <WeatherApp/>
    </div>
    </Provider>
  );
}

export default App;
