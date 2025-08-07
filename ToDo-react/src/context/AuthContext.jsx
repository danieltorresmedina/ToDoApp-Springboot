import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProveedor({children}){
        const [token, setToken] = useState(localStorage.getItem("token"));
        const isAuthenticated = !!token;

        useEffect(() =>{
          if(token){
            try{
              const decoded = jwtDecode(token);
              const exp = decoded.exp * 1000;
              const ahora = Date.now();

              if(exp < ahora){
                logout();
              }else{
                const tiempoRestante = exp - ahora;
                const timer = setTimeout(() =>{
                  logout();
                  window.location.href = "/login";
                }, tiempoRestante);
                return () => clearTimeout(timer);
              }
            } catch(e){
              console.log("Token invalido: ", e );
              logout();
            }
          }
        }, [token]);
        

        const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        };

        const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        };


        return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
        {children}
        </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}