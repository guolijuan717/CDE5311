import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

type Category = 'Teaching' | 'Design' | 'Admin';
type Task = { id: number; title: string; category: Category; done: boolean };
const initialTasks: Task[] = [
  {id:1,title:'Prepare class slides',category:'Teaching',done:false},
  {id:2,title:'Review Figma design',category:'Design',done:true},
  {id:3,title:'Send workshop reminder',category:'Admin',done:true},
  {id:4,title:'Plan the next lesson',category:'Teaching',done:false},
];
function App(){
  const [tasks,setTasks] = useState<Task[]>(() => initialTasks.map(task => ({...task})));
  const completed=tasks.filter(task=>task.done).length;
  const changed=tasks.some((task,i)=>task.done!==initialTasks[i].done);
  const toggle=(id:number)=>setTasks(current=>current.map(task=>task.id===id?{...task,done:!task.done}:task));
  const reset=()=>setTasks(initialTasks.map(task=>({...task})));
  return <main className="page"><section className="app" aria-label="Daily Focus task dashboard">
    <div className="state-pill">{changed?'STATE B • after tapping a task':'STATE A • starting screen'}</div>
    <header><h1>Good morning, Bhavina</h1><p>Thursday, 8 October</p></header>
    <section className="progress-card" aria-label="Today's progress"><div className="progress-heading"><span>Today’s progress</span><strong>{completed} of {tasks.length}</strong></div><div className="progress-track" role="progressbar" aria-label="Tasks completed" aria-valuemin={0} aria-valuemax={tasks.length} aria-valuenow={completed}><div className="progress-fill" style={{width:`${completed/tasks.length*100}%`}}/></div></section>
    <section className="priorities"><h2>Your priorities</h2><div className="task-list">{tasks.map(task=><button className="task-card" key={task.id} type="button" onClick={()=>toggle(task.id)} aria-label={`${task.done?'Mark incomplete':'Mark complete'}: ${task.title}`} aria-pressed={task.done}><span className={`check ${task.done?'checked':''}`} aria-hidden="true">{task.done?'✓':''}</span><span className="task-content"><span className={`task-title ${task.done?'done':''}`}>{task.title}</span><span className={`category ${task.category.toLowerCase()}`}>{task.category}</span></span></button>)}</div></section>
    <button className="reset" type="button" onClick={reset}>Reset demo</button>
  </section></main>
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
