import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import Header from "./components/Header"

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" />
        </Routes>
      </div>
    </Router>
  )
}

export default App
