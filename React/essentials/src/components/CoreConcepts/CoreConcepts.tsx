import {CORE_CONCEPTS, CoreConceptProps} from "../../data/essentials-data";
import './CoreConcepts.css'
import Section from "../Section";


export default function CoreConcepts() {
    
    return (
      <Section title="Core Concets" id="core-concepts">
          <ul>
              {CORE_CONCEPTS.map(
                (concept) => <CoreConcept key={concept.title} {...concept} />
              )}
          </ul>
      </Section>
    )
}

// React will pass a single object to the component. Can name it whatever you want, but it's common to call it props.
// Often destructuring is used to extract the properties from the object to make the code more readable.
function CoreConcept({ title, description, image }: CoreConceptProps) {
    return (
      <li>
          <img src={image} alt={title} />
          <h3>{title}</h3>
          <p>{description}</p>
      </li>
    )
}