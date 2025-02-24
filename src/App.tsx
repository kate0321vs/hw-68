import { Route, Routes } from 'react-router-dom';
import Tasks from './containers/Tasks/Tasks.tsx';

const App = () => {
  return (
    <>
      <main>
        <Routes>
          <Route path='/' element={<Tasks/>} />
          <Route path='/tasks' element={<Tasks/>} />
          <Route path="*" element={(<h1>Not page found</h1>)}/>
        </Routes>
      </main>
    </>
  );
};

export default App;