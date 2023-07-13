import React, {useState}  from 'react'
import UseDarkSide from '../hook/UseDarkSide.js'
import { DarkModeSwitch } from 'react-toggle-dark-mode'

const Switcher = () => {
    const [colorTheme , setTheme] = UseDarkSide();
    const [darkSide,setDarkSide] =useState(colorTheme==='light'? true : false);

    const toggleDarkMode=(checked)=>{
        setTheme(colorTheme);
        setDarkSide(checked);
    }
  return (
        <DarkModeSwitch
        checked ={darkSide}
        onChange={toggleDarkMode}
        size={26}
        />
  )
}

export default Switcher