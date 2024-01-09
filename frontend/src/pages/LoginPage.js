import axios from "axios";
import LoginComponent from "../components/LoginComponent";

const loginUser = async (firstName, lastName, password) => {
    const { data } = await axios.post("http://localhost:8800/api/users/login", {firstName, lastName, password});
     return data;
}
const LoginPage = () => {
  
  return <LoginComponent loginUser={loginUser} />
};

export default LoginPage;

