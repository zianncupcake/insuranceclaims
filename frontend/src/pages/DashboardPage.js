import axios from "axios";
import DashboardComponent from "../components/DashboardComponent";
import { useState, useEffect } from "react";
import {useAuth} from '../context/UserContext'


const DashboardPage = () => {
    const [claims, setClaims] = useState(null)
    const { user } = useAuth();

    const getClaims = async (id) => {
        const {data} = await axios.get(`http://localhost:8800/api/claims/${id}`)
        return data
    }

    const deleteClaim = async(id) => {
        const {data} = await axios.delete(`http://localhost:8800/api/claims/${id}`)
        return data
    }
    

    useEffect(() => {
        getClaims(user.EmployeeID)
        .then(res => {
            setClaims(res)
            console.log("res", res)
        
        })
        .catch((er) => console.log(er));
     },[])
        return <DashboardComponent claims={claims} deleteClaim={deleteClaim} setClaims={setClaims}/>
};

export default DashboardPage;

