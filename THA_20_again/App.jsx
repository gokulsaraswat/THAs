// TODO LIST
import React , {useState,useEffect} from "react";
import "./App.css";

const Todo = ({todo,todos,setTodos,index}) => {
	const [value, setValue] = useState("");
	return <div>
		 <h2>{todo}</h2>
		<button onClick={ () => {
			const newTodos = todos.filter((el,i) =>i != index);
			setTodos(newTodos);
		}
	}>Delete</button>
	</div>
}
function App(props){
	const [value, setValue] = useState("");
	const [todos, setTodos] = useState(["Completed My THA Day 18","Day 19","Day 20"]);
	
	// useEffect( ()=> {
	// 	setTodos([])
	// },[]);
	// local storage for saving via json

	return <div className="App" >
	<input type="text" onChange={(e)=>{
		setValue(e.target.value);
	}}
	value={value} // Input will also update by this
	/> 
	<button onClick={()=>{
		setTodos([...todos,value]);
		setValue("");
	}> Add </button>
	{todos.map((todo,index)=>(
		<Todo key={index} todo={todo} todos={todos} setTodos={setTodos} index={index}/>
	))}
	</div>;
}
export default App;