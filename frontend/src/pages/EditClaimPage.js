import EditClaimComponent from "../components/EditClaimComponent";
import axios from "axios";
import {useAuth} from '../context/UserContext'
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const EditClaimPage = () => {
    const [insurances, setInsurances] = useState([]);
    const { user } = useAuth();
    const {claimid} = useParams();
    console.log("user create claim page", user)
    const [claim, setClaim] = useState({});

    const getInsurances = async (id) => {
        const {data} = await axios.get(`http://localhost:8800/api/policies/${id}`)
        return data
    }

    const getClaim = async (id) => {
        const {data} = await axios.get(`http://localhost:8800/api/claims/getone/${id}`)
        return data
    }

    const editClaim = async (id, formInputs) => {
        const {data} = await axios.put(`http://localhost:8800/api/claims/${id}`, {...formInputs})
        return data
    }



    // const createClaim = async (formInputs) => {
    //     const { data } = await axios.post(`http://localhost:8800/api/claims/`, { ...formInputs });
    //     return data;
    // }  

    useEffect(() => {
        getInsurances(user.EmployeeID)
        .then(res => {
            setInsurances(res)
            console.log("res insurances", res)
        
        })
        .catch((er) => console.log(er));
     },[])

     useEffect(() => {
        getClaim(claimid)
        .then(res => {
            setClaim(res[0])
            console.log("res[0]", res[0])
        
        })
        .catch((er) => console.log(er));
     },[])

  
  return <EditClaimComponent insurances={insurances} user={user} claim={claim} editClaim={editClaim}/>;
};

export default EditClaimPage;

