import React from 'react';
const Test = () => {
    return (
        <div className="App">
          <header className="App-header">

              
    <p>A simple React app.....</p>
      
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            <form action="../../test" method="post" 
                  className="form">
              <button type="submit">Connected?</button>
            </form>
          </header>
        </div>
      );
}
export default Test;