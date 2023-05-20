import React, { useCallback, useState } from "react"


export const AppContext = React.createContext({})


function AppProvider({children}) {
    const [context, setContext] = useState({})

    const setTopCount = (code, value) => setContext({...context, [code]: value})

    return (
        <AppContext.Provider value={{context, setTopCount}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider
