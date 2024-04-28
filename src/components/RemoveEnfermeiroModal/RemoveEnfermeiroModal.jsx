import axios from 'axios';
import Modal from 'react-modal'

import { toast } from 'react-toastify'
import { REMOVE_ENFERMEIRO } from '../../util/Urls';

function RemoveEnfermeiroModal(props) {
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

  async function removeEnfermeiro() {
    await axios.post(REMOVE_ENFERMEIRO, props.enfermeiroToRemove)
    .then(response => {
      switch (response.data.status) {
        case 'SUCCESS':
          props.onCloseModal(true);
          toast.success(response.data.message, {
            position: 'top-right'
          });
          break;
        case 'FAIL':
          toast.warning("Falha ao remover enfermeiro", {
            position: 'top-right'
          });
          break;
        default:
          toast.error("Erro ao remover enfermeiro", {
            position: 'top-right'
          });
      }
    })
  }

  return (
    <div>
      <Modal
        isOpen={props.isOpenRemoveEnfermeiroModal}
        style={customStyles}
        ariaHideApp={true}
      >
        <h3 style={{ textAlign:'center' }}>Remover Paciente</h3>
        <div style={{ textAlign: 'center'}}>
          <p>Tem certeza que deseja remover o(a) enfermeiro(a) <strong>{`${props.enfermeiroToRemove.name}`}</strong>?</p>
        </div>

        <div className='footer'>
          <div className='footer-to-left'>
            <button className='footer-button' onClick={() => props.onCloseModal(false)}>Cancel</button>
          </div>
          <div className='footer-to-right'>
            <button className='footer-button' onClick={() => removeEnfermeiro()}>Confirmar</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default RemoveEnfermeiroModal;