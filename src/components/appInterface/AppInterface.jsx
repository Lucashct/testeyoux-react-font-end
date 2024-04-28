import { useContext, useEffect, useState } from 'react';
import './appInterface.css'
import 'react-toastify/dist/ReactToastify.css'
import MyContext from '../../store/myContext';
import { convertDateToString, getLabelRole } from '../../util/Functions';
import axios from 'axios';
import { LIST_ENFERMEIROS, LIST_PACIENTES } from '../../util/Urls';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCalendarDays, faChalkboardUser, faTextHeight, faLocationDot, faPenToSquare, faTrashAlt, faWeightScale } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Map from '../../Map/Map';
import AddPacienteModal from '../AddPacienteModal/AddPacienteModal';
import "leaflet/dist/leaflet.css";
import RemovePacienteModal from '../RemovePacienteModal/RemovePacienteModal';
import AddEnfermeiroModal from '../AddEnfermeiroModal/AddEnfermeiroModal';
import RemoveEnfermeiroModal from '../RemoveEnfermeiroModal/RemoveEnfermeiroModal';

library.add(
  faUserCircle,
  faCalendarDays,
  faChalkboardUser,
  faTextHeight,
  faLocationDot,
  faPenToSquare,
  faTrashAlt,
  faWeightScale
)

function AppInterface() {
  const { userLogged } = useContext(MyContext)
  const [ listOfPacientes, setListOfPacientes ] = useState([])
  const [ listOfEnfermeiros, setListOfEnfermeiros ] = useState([])
  const [ pacienteToRemove, setPacienteToRemove ] = useState({})
  const [ enfermeiroToRemove, setEnfermeiroToRemove ] = useState({})

  //ESTADO DAS POP-UPS
  const [isOpenAddPacienteModal, setOpenAddPacienteModal] = useState(false);
  const [isOpenRemovePacienteModal, setOpenRemovePacienteModal] = useState(false);

  const [isOpenAddEnfermeiroModal, setOpenAddEnfermeiroModal] = useState(false);
  const [isOpenRemoveEnfermeiroModal, setOpenRemoveEnfermeiroModal] = useState(false);

  useEffect(() => {
    axios.get(LIST_PACIENTES)
    .then(response => {
      setListOfPacientes(response.data.list);
    }).catch(error => {
      throw error;
    });
  }, []);

  useEffect(() => {
    axios.get(LIST_ENFERMEIROS)
    .then(response => {
      setListOfEnfermeiros(response.data.list);
    }).catch(error => {
      throw error;
    });
  }, [])
  
  async function updatePacientesList() {
    await axios.get(LIST_PACIENTES)
    .then(response => {
      setListOfPacientes(response.data.list);
    }).catch(error => {
      throw error;
    });
  }

  async function updateEnfermeirosList() {
    await axios.get(LIST_ENFERMEIROS)
    .then(response => {
      setListOfEnfermeiros(response.data.list)
    }).catch(error => {
      throw error;
    })
  }

  //ABRE A POP-UP DE ADICIONAR PACIENTES
  function openAddPacienteModal() {
    setOpenAddPacienteModal(true);
  }
  //FECHA A POP-UP DE ADICIONAR PACIENTES
  function closeAddPacienteModal(isUpdateList) {
    setOpenAddPacienteModal(false);
    if(isUpdateList) {
      updatePacientesList();
    }
  }

  //ABRE A POP-UP DE REMOVER PACIENTES
  function openRemovePacienteModal(paciente) {
    setPacienteToRemove(paciente)
    setOpenRemovePacienteModal(true);
  }

  //FECHA A POP-UP DE REMOVER PACIENTES
  function closeRemovePacienteModal(isUpdateList) {
    setOpenRemovePacienteModal(false);
    if(isUpdateList) {
      updatePacientesList();
    }
  }

  //ABRE A POP-UP DE ADICIONAR ENFERMEIROS
  function openAddEnfermeiroModal() {
    setOpenAddEnfermeiroModal(true);
  }

  //FECHA A POP-UP DE ADICIONAR ENFERMEIROS
  function closeAddEnfermeiroModal(isUpdateList) {
    setOpenAddEnfermeiroModal(false);
    if(isUpdateList) {
      updateEnfermeirosList();
    }
  }

  //ABRE A POP-UP DE REMOVER ENFERMEIROS
  function openRemoveEnfermeiroModal(enfermeiro) {
    setEnfermeiroToRemove(enfermeiro);
    setOpenRemoveEnfermeiroModal(true);
  }

  //FECHA A POP-UP DE REMOVER ENFERMEIROS
  function closeRemoveEnfermeiroModal(isUpdateList) {
    setOpenRemoveEnfermeiroModal(false);
    if(isUpdateList) {
      updateEnfermeirosList();
    }
  }

  return (
    <div className='interface-container flex-box'>
      <div className='controller-menu'>
        
        <div className='name-title'>
          <span style={{ fontWeight: '700', marginRight: '3px' }}>Olá</span> <span> {`${userLogged.name}`} </span>
        </div>

        <div className='profile-title'>
          <span style={{ fontWeight: '700', marginRight: '3px' }}>Perfil:</span> <span>{`${getLabelRole(userLogged.role)}`}</span>
        </div>

        <div className='actions-buttons-container'>

          <button onClick={openAddPacienteModal} className='menu-button'>Adicionar Paciente</button>
          <button onClick={openAddEnfermeiroModal} disabled={userLogged.role === 'ENFERMEIRO'} className='menu-button'>Adicionar Enfermeiro</button>
        
        </div>
          <h4>Lista de Pacientes</h4>
          <ul className='pacientes-list' style={{ height: '50%', width: '80%' }}>
            { listOfPacientes.map(item => {
              return(
                <li className='pacientes-node' key={item.id} style={{ display: 'flex', flexDirection:'row' }}>
                  <div style={{ width: '90%', flexDirection: 'column' }}>
                    <div style={{ width: '100%' }}>
                      <span className='node-item'>
                        <FontAwesomeIcon icon="calendar-days" style={{ color: 'grey', marginRight: '2px' }}/>
                        { `${convertDateToString(item.birthdate)}` }
                      </span>
                      <span className='node-item'>
                        <FontAwesomeIcon icon="chalkboard-user" style={{ color: 'grey', marginRight: '2px' }}/>
                        { `${item.cpf}` }
                      </span>
                      <span className='node-item'>
                        <FontAwesomeIcon icon="text-height" style={{ color: 'grey', marginRight: '2px' }}/>
                        { `${item.height}m` }
                      </span>
                      <span className='node-item'>
                        <FontAwesomeIcon icon="weight-scale" style={{ color: 'grey', marginRight: '2px' }}/>
                        { `${item.weight} Kg` }
                      </span>
                    </div>
                    <div style={{ width: '100%', marginTop: '5px' }}>
                      <span className='node-item'>
                        <FontAwesomeIcon icon="user-circle" style={{ color: 'grey', marginRight: '2px' }}/>
                        { `${item.name}` }
                      </span>
                      <span className='node-item'>
                        <FontAwesomeIcon icon="location-dot" style={{ color: 'grey', marginRight: '2px' }}/>
                        { `${item.uf}` }
                      </span>
                    </div>
                  </div>

                  {
                    userLogged.role === 'MEDICO' && <div style={{ width: '10%', display: 'flex', flexDirection: 'row' }}>
                    <button onClick={ () => openRemovePacienteModal(item)} className='functions-buttons'><FontAwesomeIcon icon='trash-alt' style={{ color: '#cf6565' }}/></button>
                  </div>
                  }
                </li>
              )
            }) }
          </ul>
          {
            userLogged.role === 'MEDICO' && <h4>Lista de Enfermeiros</h4>
          }
          {
            userLogged.role === 'MEDICO' &&  
              <ul className='pacientes-list' style={{ height: '50%', width: '80%' }}>
                { listOfEnfermeiros.map(item => {
                  return(
                    <li className='pacientes-node' key={item.id} style={{ display: 'flex', flexDirection:'row' }}>
                      <div style={{ width: '90%', flexDirection: 'column' }}>
                        <div style={{ width: '100%' }}>
                          <span className='node-item'>
                            <FontAwesomeIcon icon="user-circle" style={{ color: 'grey', marginRight: '2px' }}/>
                            { `${item.name}` }
                          </span>
                          <span className='node-item'>
                            <FontAwesomeIcon icon="chalkboard-user" style={{ color: 'grey', marginRight: '2px' }}/>
                            { `${item.cpf}` }
                          </span>
                        </div>
                      </div>
                      <div style={{ width: '10%', display: 'flex', flexDirection: 'row' }}>
                        <button onClick={() => openRemoveEnfermeiroModal(item)} className='functions-buttons'><FontAwesomeIcon icon='trash-alt' style={{ color: '#cf6565' }}/></button>
                      </div>
                    </li>
                  )
                }) }
              </ul>
          }    
      </div>
        
      <div>
        <Map listPacientes={listOfPacientes}></Map>
      </div>
        
      <AddPacienteModal
        isOpenAddPacienteModal={isOpenAddPacienteModal}
        onCloseModal={closeAddPacienteModal}
      />

      <RemovePacienteModal
        pacienteToRemove={pacienteToRemove}
        isOpenRemovePacienteModal={isOpenRemovePacienteModal}
        onCloseModal={closeRemovePacienteModal}
      />

      <AddEnfermeiroModal
        isOpenAddEnfermeiroModal={isOpenAddEnfermeiroModal}
        onCloseModal={closeAddEnfermeiroModal}
      />

      <RemoveEnfermeiroModal
        enfermeiroToRemove={enfermeiroToRemove}
        isOpenRemoveEnfermeiroModal={isOpenRemoveEnfermeiroModal}
        onCloseModal={closeRemoveEnfermeiroModal}
      />
    </div>
  )
}

export default AppInterface;