import { useState } from 'react';
import QuickNote from '../QuickNote';
import TodoList from '../TodoList';

function Home() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>TITLU------------------------</h1>
      <p>Darius Asaragiu</p>

      <QuickNote />
      <TodoList />

      <div>
        <p>Ai apasat de {count} ori</p>
        <button onClick={() => setCount(count + 1)}>+1</button>
        <button onClick={() => setCount(count - 1)}>-1</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}

export default Home;