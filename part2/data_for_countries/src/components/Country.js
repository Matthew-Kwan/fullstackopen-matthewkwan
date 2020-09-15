import React from 'react' 

const Country = ({countries, search}) => {

    // evaluate the number of countries that match the search 
    let searchLength = search.length 
    let countryNames = countries.filter(x => x.name.slice(0,searchLength).toLowerCase()===search.toLowerCase())

    // if the number of countries that match the search is greater than 10 
    if (countryNames.length > 10 && search!="") {
        return (
            <div>
                <p>Too many results returned, please enter more characters!</p>
            </div>
        )

    } else if (countryNames.length <= 10 && countryNames.length >1) {
        return (
            <div>
                {countryNames.map(x=><p> {x.name} </p>)}
            </div>
        )
    } else if (countryNames.length === 1) {
        return (
            <div>
                <p> Name: {countryNames[0].name} </p>
                <p> Capital: {countryNames[0].capital} </p>
                <p> Population: {countryNames[0].population} </p>
                <p> Languages: {countryNames[0].languages.map(x => x.name + ' ')} </p>
                <img src={countryNames[0].flag} alt='flag'/>
            </div>
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