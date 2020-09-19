import React from 'react' 
import Show from './Show.js'
import Info from './Info.js'

const Country = ({countries, search, setSearch}) => {

    // evaluate the number of countries that match the search 
    let searchLength = search.length 
    let countryNames = countries.filter(x => x.name.slice(0,searchLength).toLowerCase()===search.toLowerCase())

    // event handler

    // if the number of countries that match the search is greater than 10 
    if (countryNames.length > 10 && search!=="") {
        return (
            <div>
                <p>Too many results returned, please enter more characters!</p>
            </div>
        )

    } else if (countryNames.length <= 10 && countryNames.length >1) {
        return (
            <div>
                {countryNames.map(x=><p key={x.name}> {x.name} <Show name={x.name} setSearch={setSearch}/> </p>)}
            </div>
        )
    } else if (countryNames.length === 1) {
        return (

            <Info country={countryNames[0]}/>
        )
    } else {
        return ( 
            <div>
                <p> No Matches Found! </p>
            </div>
        )
    }     

}



export default Country 