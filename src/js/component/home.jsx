import React, {useEffect, useState} from "react";

//create your first component
const Home = () => {
	const [inputText,setInputText] = useState({label:"", done:false});
	const [list,setList] = useState([]);
	const[showDelete,setShowDelete]= useState(-1);

	const getTodos = () =>{
		fetch("https://playground.4geeks.com/apis/fake/todos/user/marcello")
		.then((response)=>response.json())
		.then((data)=> {setList(data)} )
		.catch((error)=>console.error(error))
	}
	
	const addTodos = (recivedNewList) =>{
		fetch("https://playground.4geeks.com/apis/fake/todos/user/marcello", {
			method: "PUT",
			body: JSON.stringify(recivedNewList),
			headers: {
			  "Content-Type": "application/json"
			}
		  })
		.then((response)=>response.json());
	}

	  const deleteItem = (recivedIndex) => {	
		const newList = list.filter((filterTask, filterIndex)=> recivedIndex != filterIndex)
		setList (newList);
		addTodos(newList);
		}

		const clearTask = () =>{
			fetch("https://playground.4geeks.com/apis/fake/todos/user/marcello", {
				method: "DELETE",
				headers: {
				  "Content-Type": "application/json"
				}
			  })
			.then((response)=>response.json());
		}

		const newListTodos = () =>{
			fetch("https://playground.4geeks.com/apis/fake/todos/user/marcello", {
				method: "POST",
				body:"[]",
				headers: {
				  "Content-Type": "application/json"
				}
			  })
			.then((response)=>response.json());
		}

useEffect(()=>{
		newListTodos();
		getTodos();
},[]);
		return (
		<div className="text-center">
			<h1>4Geeks: To Do List</h1>
			<div className="inputTasks">
				<input	type="text"
						onKeyDown={(event)=>{
						if (event.key === "Enter" && inputText.label != ""){
							let newList = [...list,inputText]
							setList(newList);
							addTodos(newList);
							setInputText({label:"", done:false});
						}
					}
				}
				value={inputText.label}
						onChange={(e)=> setInputText({label: e.target.value, done:false})}
						placeholder={list.length === 0 ? "No tasks, add a task here:" : "Add more tasks here:"}>
				</input>
			</div>
			{list.length > 0 ? list.map((mapTask,mapIndex)=>{
				return( 
				<div 
				className="rowTask effect"
				onMouseEnter={()=> setShowDelete(mapIndex)}
				onMouseLeave={()=>setShowDelete(-1)}
				>
					<div>
						<ul>
						<li>{mapTask.label}</li>
						</ul>
					</div>
					<div 
					onClick={()=>deleteItem(mapIndex)} 
					className= {`${mapIndex == showDelete ? "d-block" : "d-none"} iconDelete`}
					onMouseEnter={(e) => {
						e.currentTarget.style.color = "red";
					  }}
					onMouseLeave={(e) => {
						e.currentTarget.style.color = "";
					  }}
					> 						
						<i class="fas fa-trash-alt"title="Delete"style={{ cursor: "pointer" }}></i>
					</div>
				</div>
				);
			}):""}
				<div className="countTask">{list.length} {list.length >1 ? "Tasks":"Task"}</div>
				<button 
				onClick={()=> {					
					clearTask()
					window.location.reload(true);
				}}
				>
					Clear All
				</button>
		</div>
	);
};

export default Home;