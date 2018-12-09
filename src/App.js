import React from 'react';
import Stories from "./components/Stories";

class App extends React.Component {
  render() {
    return (
      <div className="App">
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container">
              <a className="navbar-brand" href="/">Hacker news</a>
            </div>
          </nav>

          <main role="main" className="container">
            <Stories />
          </main>
      </div>
    );
  }
}

export default App;
