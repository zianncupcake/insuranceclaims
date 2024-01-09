import axios from "axios";
import AdminComponent from "../components/AdminComponent";
import { useState, useEffect } from "react";


const AdminPage = () => {
    const [claims, setClaims] = useState(null)

    const getClaims = async () => {
        const {data} = await axios.get(`http://localhost:8800/api/claims`)
        return data
    }

    useEffect(() => {
        getClaims()
        .then(res => { 
            setClaims(res)
            console.log("res claims", res)
        
        })
        .catch((er) => console.log(er));
     },[])
        return <AdminComponent claims={claims}/>
};

export default AdminPage;

