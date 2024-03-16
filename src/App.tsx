import './App.css'
import { RouterProvider } from 'react-router-dom';
import router from './router';

function App() {
  return <><div id="logo">Mega Sena Dell</div><RouterProvider router={router} /></>
}

export default App
