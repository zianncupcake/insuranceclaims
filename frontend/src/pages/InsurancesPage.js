import axios from "axios";
import InsurancesComponent from "../components/InsurancesComponent";
import { useState, useEffect } from "react";
import {useAuth} from '../context/UserContext'


const InsurancesPage = () => {
    const [insurances, setInsurances] = useState(null)
    const { user } = useAuth();

    const getInsurances = async (id) => {
        const {data} = await axios.get(`http://localhost:8800/api/policies/${id}`)
        return data
    }

    useEffect(() => {
        getInsurances(user.EmployeeID)
        .then(res => {
            setInsurances(res)
            console.log("res insurances", res)
        
        })
        .catch((er) => console.log(er));
     },[])
        return <InsurancesComponent insurances={insurances}/>
};

export default InsurancesPage;

