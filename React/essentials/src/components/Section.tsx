import React from "react";

// Note the inline definition of the types for the arguments.
// Also note the use of the spread operator to pass any additional props to the section element will only work
// if the props are valid for the element where the props are used.
export default function Section({title, children, ...props}: {title: string, children: React.ReactNode, [props: string]: unknown }) {
  return (
    <section {...props}>
      <h2>{title}</h2>
      {children}
    </section>
  )
}