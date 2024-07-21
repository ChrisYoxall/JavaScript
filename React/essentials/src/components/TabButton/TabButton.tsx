import {ReactNode} from "react";
import "./TabButton.css";

interface TabButtonProps {
  children: ReactNode;
  isSelected: boolean;
  [props: string]: unknown;
}

export default function TabButton({ children, isSelected, ...props }: TabButtonProps) {
  
  //console.log("TabButton component rendered");
  
  return <li><button  className={ isSelected ? 'active' : undefined } {...props}>{children}</button></li>;
}