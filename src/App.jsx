import  Header  from "./components/Header";
import SideNav from "./components/SideNav";
import PokeCard from "./components/PokeCard";

import { useState } from "react";

function App() {
  
  const [selectedPokemon,setSelectedPokemon] = useState(0)
  const [showSideMenu , setShowSideMenu] = useState(true)//this does the opposite of what it should do
  //  (ie when showSlideMenu it true , actually its false )

  console.log(selectedPokemon)

  function handleToggleMenu(){
    setShowSideMenu(!showSideMenu)
  }

  function handleCloseMenu(){
    setShowSideMenu(true)
  }
  return (
   <>
    <Header handleToggleMenu={handleToggleMenu} />
    <SideNav showSideMenu={showSideMenu} 
    selectedPokemon={selectedPokemon} 
    setSelectedPokemon={setSelectedPokemon}
    handleCloseMenu={handleCloseMenu}
    handleToggleMenu={handleToggleMenu}/>
    <PokeCard selectedPokemon={selectedPokemon}/>
   </>
  )
}

export default App
