import React from "react";
import "./App.css";
import PayValidator from "./PayValidator";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>Portale Pagamenti</h3>
      </header>
      <main>
        <PayValidator />
      </main>
    </div>
  );
}

export default App;
