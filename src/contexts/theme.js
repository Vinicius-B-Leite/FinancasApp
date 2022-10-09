import React, {createContext, useState} from "react";
import { myTheme } from "../theme";
import { green } from "../theme/green";


export const ThemeContext = createContext({})

export default function ThemeContextProvider({children}){
    const [theme, setTheme] = useState(myTheme.green)

    function changeTheme(){
        setTheme(theme === myTheme.green ? myTheme.purple : myTheme.green)
    }
    return(
        <ThemeContext.Provider value={{theme, changeTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}