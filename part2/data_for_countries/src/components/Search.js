import React from 'react'


const Search = ({search, handler}) => {


    return (
        <div>
            <p> find countries <input value={search} onChange={handler}></input> </p>
        </div>
    )

}




export default Search