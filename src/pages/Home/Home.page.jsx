import { useEffect } from "react";
import { useMenu } from "../../contexts/menu/menu.context";


export const HomePage = () => {

  const { setTittle } = useMenu();
  
  useEffect(() => { 
    setTittle('Dashboard');
      }, []);
    
    return(
      <>
        <p>HomePage is Render</p>
      </>
    )
  

}

