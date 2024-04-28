import './addPacienteModal.css'

import Modal from 'react-modal'
import { useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { CREATE_PACIENTE } from '../../util/Urls';
import { toast } from 'react-toastify'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    width: '30%',
    height: '100%',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
};

function AddPacienteModal(props) {

  const [newPaciente, setNewPaciente] = useState({})
  const [valueDate, onChangeDate] = useState(new Date());
  const [states, setStates] = useState([])

  useEffect(() => {
    axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(response => {
      setStates(response.data)
    }).catch(error => {
      throw error;
    })
  }, [])
  
  function getPacientePayload() {
    return {
      ...newPaciente,
      birthdate: `${valueDate.getFullYear()}-${valueDate.getMonth() < 10 ? '0' : ''}${valueDate.getMonth()+1}-${valueDate.getDate()}`
    }
  }

  async function createPaciente() {
    await axios.post(CREATE_PACIENTE, getPacientePayload())
    .then(response => {
      switch (response.data.status) {
        case 'SUCCESS':
          props.onCloseModal(true);
          toast.success(response.data.message, {
            position: 'top-right'
          });
          break;
        case 'FAIL':
          toast.warning(response.data.message, {
            position: 'top-right'
          })
          break;
        default:
          toast.error(response.data.message, {
            position: 'top-right'
          })
      }
    })
  }

  return(
    <div>
      <Modal
        isOpen={props.isOpenAddPacienteModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <h3 style={{ textAlign: 'center' }}>Adicionar Paciente</h3>
        <form className='add-paciente-form'>
          <fieldset>
            <label>Nome</label>
            <input className='form-add-paciente-input' type="text" onChange={e => setNewPaciente({ ...newPaciente, name: e.target.value })}/>
          </fieldset>
          <fieldset>
            <label>CPF</label>
            <input className='form-add-paciente-input' type="text" onChange={e => setNewPaciente({ ...newPaciente, cpf: e.target.value })}/>
          </fieldset>
          <fieldset>
            <label>Altura(metros)</label>
            <input className='form-add-paciente-input' type="number" onChange={e => setNewPaciente({ ...newPaciente, height: e.target.value })} />
          </fieldset>
          <fieldset>
            <label>Peso(Kg)</label>
            <input className='form-add-paciente-input' type="number" onChange={e => setNewPaciente({ ...newPaciente, weight: e.target.value })} />
          </fieldset>
          <fieldset>
            <label>Data de Nascimento</label>
            <DatePicker calendarIcon={false} format='dd/MM/yyyy' onChange={onChangeDate} value={valueDate}/>
          </fieldset>
          <fieldset>
            <label>UF(Unidade Federativa)</label>
            <select onChange={e => setNewPaciente({ ...newPaciente, uf: e.target.value})}>
              {
                states.map(item => {
                  return(
                    <option key={item.id} value={item.sigla}>{`${item.nome}`}</option>
                  )
                })
              }
            </select>
          </fieldset>
        </form>

        <div className='footer'>
          <div className='footer-to-left'>
            <button className='footer-button' onClick={() => props.onCloseModal(false)}>Cancel</button>
          </div>
          <div className='footer-to-right'>
            <button className='footer-button' onClick={() => createPaciente()}>Gravar</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AddPacienteModal;