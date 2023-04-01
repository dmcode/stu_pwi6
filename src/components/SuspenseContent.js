import { memo } from "react"

const SuspenseContent = memo(({isLoading, children}) => {
    if(isLoading)
        return null
    return children
})

export default SuspenseContent
