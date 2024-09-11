
import { useState, useEffect} from 'react';

function Todo(){
  const[newTask, setTask] = useState(''); //writing a task in input
  const [tasks, setTaskArr] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    //if nothing has been inputted return an empty array
    if(savedTasks == null) return [];
    //otherwise return parsed version of what is stored in local storage
    return JSON.parse(savedTasks);

  }); //adds newTask into the tasks array

  const handleInput = (e) => {
    setTask(e.target.value);
  }

//This runs when component mounts and the value of tasks changes 
//(i,e) when a new task is entered into task array or when deleted
  useEffect(()=>{
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }), [tasks]; 

  const handleTaskArr = (e) =>{
    e.preventDefault(); //prevents the form from submitting
    if(newTask.trim() !== ""){
    setTaskArr([...tasks, newTask]);//add newTask to the array
    setTask(''); //clear the input field after adding newTask
    }
  }

  //create a function to remove a task
  const deleteTask = (index) => {
    const newArr = tasks.filter((_, currentTask) => currentTask !== index);
    setTaskArr(newArr);
    
  }

  //create a function to move up a task (remember to use [...] to copy into a temp array)
  const moveTaskUp = (index) => {
    const newArr = [...tasks];
    if(index > 0){ //WE CANT MOVE TASK AT INDEX 0 UP
      [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
      setTaskArr(newArr);
    }
    
  }

  const moveTaskDown = (index) => {
    const newArr = [...tasks];
    if(index < tasks.length - 1){
      [newArr[index], newArr[index + 1]] = [newArr[index+1] , newArr[index]];
      setTaskArr(newArr);
    }
    
  }

  return(
    <>
    <body>
    <div className = 'appPage'>

        <div className='appContainer'>
          <h1>TO DO APP</h1>
        </div>

        <div className = 'appForm'>
          <form onSubmit = {handleTaskArr}>

            <input id = 'taskInput' onChange = {handleInput} value = {newTask} type = 'text' placeholder = "Enter a task..." />

            <button id = 'addButton' type = 'submit' > ADD </button>

          </form>
          </div>

        <div className= 'taskList'>
          <ul>
            {tasks.map((tasks, index) => 
            <li key = {index}> <span className = 'listTask'> {tasks} </span>
            <button className = 'deleteButton' onClick={() => deleteTask(index)}></button>
            <button className = 'upButton' onClick={() => moveTaskUp(index)}></button> 
            <button className = 'downButton' onClick={() => moveTaskDown(index)}></button> 
            </li>
            )}
          </ul>
          </div>
      </div>
   </body>
    </>
  );
}

export default Todo;