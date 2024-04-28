import Modal from 'react-modal'
import { useState } from 'react';
import axios from 'axios';
import { CREATE_ENFERMEIRO } from '../../util/Urls';
import { toast } from 'react-toastify';

function AddEnfermeiroModal(props) {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      width: '30%',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    }
  };

  const [newEnfermeiro, setNewEnfermeiro] = useState({})

  function getPayloadEnfermeiro() {
    return {
      ...newEnfermeiro,
      role: 'ENFERMEIRO'
    }
  }

  async function createEnfermeiro() {
    await axios.post(CREATE_ENFERMEIRO, getPayloadEnfermeiro())
    .then(response => {
      switch (response.data.status) {
        case "SUCCESS":
          props.onCloseModal(true);
          toast.success(response.data.message, {
            position: 'top-right'
          });
          break;
        case "FAIL":
          toast.warning(response.data.message, {
            position: 'top-right'
          });
          break;
        default:
          toast.error(response.data.message, {
            position: 'top-right'
          })
          break;
      }
    }).catch(error => {
      throw error;
    })
  }

  return(
    <div>
      <Modal
        isOpen={props.isOpenAddEnfermeiroModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <h3 style={{ textAlign: 'center' }}>Adicionar Enfermeiro(a)</h3>
        <form className='add-enfermeiro-form'>
          <fieldset>
            <label>Nome</label>
            <input className='form-add-paciente-input' type="text" onChange={e => setNewEnfermeiro({ ...newEnfermeiro, name: e.target.value })}/>
          </fieldset>
          <fieldset>
            <label>CPF</label>
            <input className='form-add-paciente-input' type="text" onChange={e => setNewEnfermeiro({ ...newEnfermeiro, cpf: e.target.value })}/>
          </fieldset>
          <fieldset>
            <label>Senha</label>
            <input className='form-add-paciente-input' type="password" onChange={e => setNewEnfermeiro({ ...newEnfermeiro, password: e.target.value })} />
          </fieldset>
        </form>

        <div className='footer'>
          <div className='footer-to-left'>
            <button className='footer-button' onClick={() => props.onCloseModal(false)}>Cancel</button>
          </div>
          <div className='footer-to-right'>
            <button className='footer-button' onClick={() => createEnfermeiro()}>Gravar</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AddEnfermeiroModal;