"use client";

import { BASE_URL } from "@/app/exportedDefinitions";
import { useState } from "react";

function LoginForm()
{
    const [ email, setEmail] = useState("");
    const [ password, setPassword ] = useState("");
    const [error, setError] = useState('');

    const handleSubmit = async(e) => {
      e.preventDefault();

      const body = { email, password };
      const response = await fetch(BASE_URL+"/users/admin/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      console.log(data);

      setError(data.message);

      if(data.token)
      {
          localStorage.setItem("admin-token", data.token);
          router.push(`/admin`)
          return router.refresh();
      }

    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-101">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl text-black font-bold mb-6 text-center">Admin Login</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Login
              </button>
            </form>
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          </div>
      </div>
    );
}

export default LoginForm;