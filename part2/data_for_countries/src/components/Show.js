import React from 'react' 

const Show = ({name, setSearch}) => {

    // event handlers 

    const handleShowClick = () => {
         setSearch(name)
    }

    return (
        <button onClick={handleShowClick}>Show me </button> 
        
    )

}

export default Show;