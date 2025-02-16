"use client";
import { createContext, useState, useEffect, Children} from "react";
import {useRouter} from "next/navigation";

export const AuthContext = createContext();

export const AuthProvider = ({ childern }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if(storedUser){
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (Email, password) => {
        try{
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password}),
            });
            const data = await response.json();
            if(response.ok){
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(data.user);
                router.push("/dashboard");
            }else{
                alert(data.message);
            }
        }catch(error){
            console.error("Login Failed",error);
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {Children}
        </AuthContext.Provider>
    );
}