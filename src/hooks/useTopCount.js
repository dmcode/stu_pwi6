import useAppContext from "./useAppContext"


const useTopCount = (code, defaultValue = 10) => {
    const {context, setTopCount} = useAppContext()
    const count = context && context.hasOwnProperty(code) ? context[code] : defaultValue
    return {count, setTopCount: (value) => setTopCount(code, value)}
}

export default useTopCount
