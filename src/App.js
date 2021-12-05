import logo from './logo.svg';
import './App.css';
import ChartData from './Components/ChartData';
import { createContext, useState } from 'react';

//centralised state
export const centralState = createContext();

function App() {

  //central state
  const [store, setStore] = useState([]);

  return (
    <centralState.Provider value={{ store, setStore }}>
      <h2>This app is made for "Clootrack Software Engineer (Frontend) Hiring Challenge"</h2>
      <p>To manipulate Chart Data, Change the values in the input field this re-draws the graph simultaneously!</p>
      <hr/>
      <ChartData />
    </centralState.Provider>
  );
}

export default App;