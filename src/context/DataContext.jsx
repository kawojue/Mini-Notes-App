import { createContext, useState, useEffect } from "react";
import { format } from 'date-fns'
import { fillID } from '../fillID'
import useWindowSize from '../hooks/useWindowSize'
import { useNavigate } from 'react-router-dom'

const DataContext = createContext({})

export const DataProvider = ({ children }) => {
    return (
        <DataContext.Provider value={{

        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext