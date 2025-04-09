import { BASE_URL } from "../exportedDefinitions";

const verifyUser = async() => {
    const token = localStorage.getItem("shopa-token");

    const body = {
        token: token
    }

    const response = await fetch(BASE_URL+"/users/send-email", {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(body)
    });
    
    console.log(response);
}

export default verifyUser;