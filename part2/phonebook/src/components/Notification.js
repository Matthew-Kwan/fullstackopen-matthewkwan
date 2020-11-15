import React from 'react'

const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }

    if (type === 'success') {
        return (
            <div className="message">
                {message}
            </div>
            )
    } else {
        return (
            <div className="error">
              {message}
            </div>
          )
    }
  
    
  }

export default Notification