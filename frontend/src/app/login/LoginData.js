import { BASE_URL } from "../exportedDefinitions";

export default async function LoginData(body)
{
    const response = await fetch(BASE_URL + "/users/login", {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(body)
    });

    return response.json();
}