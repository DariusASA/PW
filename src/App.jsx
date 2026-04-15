import { useState } from 'react';
import './App.css';
import QuickNote from './QuickNote'; 
import TodoList from './TodoList';
import ContactForm from './ContactForm';
import ProjectList from './ProjectList';

function App() {
  const [count, setCount] = useState(0);

  

  return (
    <div>
      <h1>TITLU------------------------</h1>
      <p>Darius Asaragiu</p>

      <QuickNote /> 
      <TodoList />
      <ContactForm />

      <div>
        <p>Ai apasat de {count} ori</p>
        <button onClick={() => setCount(count + 1)}>+1</button>
        <button onClick={() => setCount(count - 1)}>-1</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>

    
      <ProjectList />
    </div>
  );
}

export default App;