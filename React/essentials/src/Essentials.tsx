import EssentialsHeader from "./components/EssentialsHeader";
import CoreConcepts from "./components/CoreConcepts/CoreConcepts";
import Examples from "./components/Examples/Examples";

export default function Essentials(){ 
  
  console.log('Essentials component rendered.');
  
  return(
    <>
      <EssentialsHeader />
      <CoreConcepts />
      <Examples />
    </>
  )
}


