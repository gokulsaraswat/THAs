import React , {useState,useEffect} from "react";
import "./App.css";

function App(props){
	// let num=0;
	const [count,setCount] = useState(0);
	const [count1,setCount1] = useState(0);

	useEffect(()=>{
		console.log("DOM updated");
	}, [count1] ); 
	// dom update when variable is update if [ ] null array is passed then after rendering one component that will update 

	return <div className="App">
		<button onClick = { () =>{
			const newCount = count +1 ;
			setCount(newCount);
		}}> {count} </button>

		<button onClick = { () =>{
			setCount(count1 + 1);
		}}> {count} </button>

		{/* <button onClick={()=>{num+=1}}>{num}</button>  */}
		{/* num will update in js  but not in dom/webpage so we use hooks */}
	</div>;
}
export default App;