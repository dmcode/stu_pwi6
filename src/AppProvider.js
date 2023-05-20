import React, { useState } from "react"


export const AppContext = React.createContext({})


const load_context = () => {
    try {
        const context = sessionStorage.getItem('context')
        if (!context)
            return {}
        return JSON.parse(context)
    }
    catch(error) {
        console.error(error)
    }
}


const save_context = (context) => {
    try {
        sessionStorage.setItem('context', JSON.stringify(context))
    }
    catch(error) {
        console.error(error)
    }
}


const loaded_context = load_context()


function AppProvider({children}) {
    const [context, setContext] = useState(loaded_context)

    const setTopCount = (code, value) => {
        const _context = {...context, [code]: value} 
        setContext(_context)
        save_context(_context)
    }

    return (
        <AppContext.Provider value={{context, setTopCount}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider
