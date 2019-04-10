import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    data: []
  }

  async componentDidMount() {
    const url = 'http://localhost:5000/api/courses'
    try {
      const rawData = await fetch(url)
      const data = await rawData.json()
      this.setState({ data })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>List of all courses</h1>
          {this.state.data.map(course => <h2>{course.title}</h2>)}
        </header>
      </div>
    );
  }
}

export default App;
