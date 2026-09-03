import { Navigate } from "react-router-dom"


function Prorouter({children}){
    const token = localStorage.getItem('token')
    if(!token){
        return <Navigate to='/login' />
    }
    return children
}

export default Prorouter