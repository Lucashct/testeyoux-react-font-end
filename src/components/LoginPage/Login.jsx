import axios from 'axios';
import './login.css'
import { LOGIN } from '../../util/Urls';
import { useContext, useState } from 'react';
import MyContext from '../../store/myContext';
import { toast } from 'react-toastify';

function Login() {
  const [ cpf, setCpf ] = useState('');
  const [ password, setPassword ] = useState('');
  const { onChangeUser } = useContext(MyContext)

  async function logIn() {
    if(cpf === '' || password === '') {
      toast.warning("Preencha os campos corretamente", {
        position: 'top-right'
      });

      return
    }

    const payload = {  
      cpf,
      password
    }

    await axios.post(LOGIN, payload)
    .then(response => {
      switch(response.data.status){
        case 'SUCCESS':
          onChangeUser(response.data.item);
          break;
        case 'FAIL':
          toast.error(response.data.message);
          break;
        default:
      }
    }).catch(error => {
      throw error;
    })
  }

  return (
    <div className='login-container flex-box-center'>
      <div className='login-main'>
        <h3>Controle de Pacientes</h3>
        <h5>Faça seu login</h5>
        <div className='form-login-container'>
          <input placeholder='CPF' type="text" onChange={e => { setCpf(e.target.value) }} />
          <input type="password" placeholder='Senha' onChange={ e => { setPassword(e.target.value) } } />
        </div>

        <div className='login-button-container'>
          <button className='button-login' onClick={logIn}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login;