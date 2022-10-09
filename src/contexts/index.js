import React from "react";
import AuthProvider from "./auth";
import ThemeContextProvider  from "./theme";

export default function Contexts({children}){
    return(
        <AuthProvider>
            <ThemeContextProvider>
                {children}
            </ThemeContextProvider>
        </AuthProvider>
    )
}