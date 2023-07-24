import axios from "axios"

// 로그인
export const logInApi = async (data: any) => {
    
    // const response = await axios.post("http://localhost:8888/api/auth/logIn", data).catch((error) => null);
    const response = await axios.post("http://192.168.10.93:8888/api/auth/logIn", data).catch((error) => null);
    if (!response) return null;

    const result = response.data;
    return result;
}

// 회원가입
export const signUpApi = async (data: any) => {
    
    // const response = await axios.post("http://localhost:8888/api/auth/signUp", data).catch((error) => null);
    const response = await axios.post("http://192.168.10.93:8888/api/auth/signUP", data).catch((error) => null);
    if (!response) return null;

    const result = response.data;
    return result;
}