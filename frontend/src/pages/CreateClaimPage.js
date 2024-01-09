import CreateClaimComponent from "../components/CreateClaimComponent";
import axios from "axios";
import {useAuth} from '../context/UserContext'
import { useState, useEffect } from "react";


const CreateClaimPage = () => {
    const [insurances, setInsurances] = useState([]);
    const { user } = useAuth();
    console.log("user create claim page", user)

    const getInsurances = async (id) => {
        const {data} = await axios.get(`http://localhost:8800/api/policies/${id}`)
        return data
    }

    const createClaim = async (formInputs) => {
        const { data } = await axios.post(`http://localhost:8800/api/claims/`, { ...formInputs });
        return data;
    }  

    useEffect(() => {
        getInsurances(user.EmployeeID)
        .then(res => {
            setInsurances(res)
            console.log("res insurances", res)
        
        })
        .catch((er) => console.log(er));
     },[])


  
  return <CreateClaimComponent insurances={insurances} user={user} createClaim={createClaim}/>;
};

export default CreateClaimPage;

