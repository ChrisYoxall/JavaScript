import React from "react";

// Hopefully very re-usable component. Used to define consistent look over a site.
//
// Main thing to note here is that buttons is a chunk of JSX code and is an example how you can pass content
// for different slots of a component.
//
// This also shows how you can dynamically specify a component. Need to have an upper case name for the component
// to be rendered in order to be a valid JSX component. When passing in a value need to use strings for the default
// built in HTML components (i.e. menu, div, ul, etc.) and the name of the custom component surrounded in curly braces
// (i.e. {Section}). No idea of the TypeScript for this.
export default function Tabs({ children, buttons, ButtonContainer='menu' } : { children: React.ReactNode, buttons: React.ReactNode, ButtonContainer?: string }) {
    
  return (
    <>
      {/* @ts-expect-error: Don't know how to type this. */}
      <ButtonContainer>{buttons}</ButtonContainer>
      {children}
    </>
  )
}