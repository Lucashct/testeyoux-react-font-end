import { useContext } from 'react';
import './App.css';
import Login from './components/LoginPage/Login';
import AppInterface from './components/appInterface/AppInterface';
import MyContext from './store/myContext';
import { ToastContainer } from 'react-toastify';

function App() {
  
  const { userLogged } = useContext(MyContext);

  return (
    <div className="App">
      {
        userLogged.id ?  <AppInterface /> : <Login/>
      }

      <ToastContainer />
    </div>
  );
}

export default App;
