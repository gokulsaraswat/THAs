import React from "react";
import "./App.css";

function App(props){
    const funcHandleClick = () => {
        console.log("Button Click")
    }
	return <div className="App">
		<button onClick={()=>{
            console.log("Button Click")
			}}>
			Click Me</button>

        <button onClick={funcHandleClick}> Click Me</button>

		<input type="text" onChange={(e)=> {
			console.log(e.target.value);
		}}>
		</input>
	</div>;
}
export default App;