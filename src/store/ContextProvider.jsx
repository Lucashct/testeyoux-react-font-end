import { useState } from "react";
import MyContext from "./myContext";

export function MyProvider({children}) {
  const [userLogged, setUserLogged] = useState({})
   
  const onChangeUser = (value) => {
    setUserLogged(value)
  }

  const getUserModules = () => {
    switch(userLogged.role) {
      case 'ENFERMEIRO':
        return { createPaciente: true, createEnfermeiro: false }
      case 'MEDICO':
        return { createPaciente: true, createEnfermeiro: true }
      default:
        return { createPaciente: false, createEnfermeiro: false }
    }
  }

   return (
       <MyContext.Provider value={{
              userLogged,
              onChangeUser,
              getUserModules
           }}>
           {children}
       </MyContext.Provider>
   )
}