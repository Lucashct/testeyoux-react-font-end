import axios from 'axios';
import Modal from 'react-modal'

import { toast } from 'react-toastify'
import { REMOVE_PACIENTES } from '../../util/Urls';

function RemovePacienteModal(props) {
  
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

  async function removePaciente() {
    await axios.post(REMOVE_PACIENTES, props.pacienteToRemove)
    .then(response => {
      switch (response.data.status) {
        case 'SUCCESS':
          props.onCloseModal(true);
          toast.success(response.data.message, {
            position: 'top-right'
          });
          break;
        case 'FAIL':
          toast.warning("Falha ao remover paciente", {
            position: 'top-right'
          });
          break;
        default:
          toast.error("Erro ao remover paciente", {
            position: 'top-right'
          });
      }
    }).catch(error => {
      throw error;
    })
  }

  return (
    <div>
      <Modal
        isOpen={props.isOpenRemovePacienteModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <h3 style={{ textAlign:'center' }}>Remover Paciente</h3>
        <div style={{ textAlign: 'center'}}>
          <p>Tem certeza que deseja remover o(a) paciente <strong>{`${props.pacienteToRemove.name}`}</strong>?</p>
        </div>

        <div className='footer'>
          <div className='footer-to-left'>
            <button className='footer-button' onClick={() => props.onCloseModal(false)}>Cancel</button>
          </div>
          <div className='footer-to-right'>
            <button className='footer-button' onClick={() => removePaciente()}>Confirmar</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default RemovePacienteModal;