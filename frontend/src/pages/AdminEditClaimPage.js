import AdminEditClaimComponent from "../components/AdminEditClaimComponent";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const AdminEditClaimPage = () => {
    const {claimid} = useParams();

    const getClaim = async (id) => {
        const {data} = await axios.get(`http://localhost:8800/api/claims/getone/${id}`)
        return data
    }
    const getInsurance = async (id) => {
        const {data} = await axios.get(`http://localhost:8800/api/policies/getone/${id}`)
        return data
    }

    const updateClaim = async(claimid, insuranceid, inputs) => {
        const {data} = await axios.patch(`http://localhost:8800/api/claims?claimid=${claimid}&insuranceid=${insuranceid}`, {...inputs})
        return data
    }


  
  return <AdminEditClaimComponent claimid={claimid} getClaim={getClaim} getInsurance={getInsurance} updateClaim = {updateClaim}/>;
};

export default AdminEditClaimPage;

