import React, { useEffect, useState} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Search from './components/Search'
import Country from './components/Country'


function App() {

  // Define states 
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  // [START API CALL] Country API 
  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook,[])
  // [END API CALL] Country API

  // Event Handlers 
  const handleSearchChange = (e) => {
    setSearch(e.target.value) 
  }

  return (
    <div>
      <Search search={search} handler={handleSearchChange}/>
      <Country countries={countries} search={search}/>
    </div>
  );
}

export default App;
