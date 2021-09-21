import logo from './logo.svg';
// import ConstructorMethod from './components/Mounting/ConstructorMethod';
import './App.css';

// export default class App  {
//   render() {
//     console.log(this.props,"App")
//     return(
//       <>
//        <ConstructorMethod name={this.props.name}/> 
//        <GetDerivedStatefromPropsMethod />
//       </>
//     )
//   }
  
  
// }
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
