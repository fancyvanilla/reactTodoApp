import * as React from 'react';
import './style.css';
import {useState} from 'react';
import {useEffect} from 'react';
import {useRef} from 'react';
import {getDay} from './funcs.js'
export default function App() {
  //initializing some stuff
  let i=0
  const d=new Date();
  const [input, changeInput] = useState("");
  const [todos, changeTodos] = useState(JSON.parse(sessionStorage.getItem("todos")) || []);
  const [count,changecount]=useState(0);
  //handling the checks
  const handlecheck=(id)=>{
    const newtodos=todos.map(todo=>{
      if (todo.id==id) return {...todo,completed:!todo.completed}
      else 
      return todo
    })
    changeTodos(newtodos)
  }
  //creating the todos html
  const elems=todos.map(e=><div className="todo-check"><input type="checkbox"
   onChange={()=>handlecheck(e.id)}/>
  <div className="todo">{e.todo}</div></div>)
  //handling the input
  const handleChange = (event) => {
    changeInput(event.target.value)
  }
  //adding todos
  const handleSubmit = (e) => {
    changecount(count+1);
    e.preventDefault();
    changeTodos(todos.concat([{id:count,todo:input,completed:false}]));
    sessionStorage.setItem("todos", JSON.stringify(todos.concat([{id:count,todo:input,completed:false}])));
  }
  return (
    <div>
      <h3>Peeewoop , it's {getDay(d.getDay())} 💪🧠 </h3>
      <form>
        <div id="inp">
        <input type="text" onChange={handleChange} placeholder="what you want to do to do today?"/>
        <a onClick={handleSubmit}>ADD</a>
        </div>
      </form>
      <br/>
      <div id="todos"><h3>Your Todos of the day: </h3>
      <br/>
        {elems}
      </div>
    </div>
  );
}
