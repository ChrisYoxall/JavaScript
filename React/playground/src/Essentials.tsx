/*
I'm defining the React essentials as:
- Components
- JSX (don't get a choice here)
- Props
- State
- Hooks (maybe)
- Event Handlers (maybe)
- Conditional Rendering (maybe)
- Lists and Keys (maybe)
- Forms (maybe)
- Lifting State Up (maybe)
- Composition vs Inheritance (maybe)
- Thinking in React (maybe)
- React Router (maybe)
- React Context (maybe)
- React Redux (maybe)
- React Testing Library (maybe)
- React Router Testing (maybe)
- React Context Testing (maybe)
- React Redux Testing (maybe)
- React Performance (maybe)



Thinking in React:

"Thinking in React" refers to the philosophy and recommended approach when building user interfaces (UIs) using the React library. It involves breaking down complex UIs into smaller, reusable components and embracing React's one-way data flow (unidirectional data binding) and the concept of state management.
Here are some key principles of "Thinking in React":

Component-Based Architecture: In React, you build UIs by creating reusable components. Each component encapsulates its own logic, structure, and visual representation. By breaking down the UI into smaller components, you can achieve better modularity, reusability, and maintainability.
Unidirectional Data Flow: React follows a one-way data flow, where data is passed down from parent components to child components via props (properties). Child components cannot directly modify the data they receive; instead, they can trigger callbacks or actions to update the parent's state, which then propagates down the component tree.
State Management: React components can have internal state, which represents the component's current condition or data. When the state changes, React efficiently updates and re-renders only the components that need to be updated, making it efficient for building dynamic UIs.
JSX Syntax: React uses JSX, a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files. This makes it easier to describe the structure and hierarchy of UI components.
Virtual DOM: React creates an in-memory representation of the UI called the Virtual DOM. When the state or props of a component change, React calculates the minimal set of changes needed in the Virtual DOM and then efficiently applies those changes to the actual DOM, minimizing expensive DOM operations.
Functional Programming Concepts: React embraces functional programming concepts like pure functions, immutable data structures, and composition. This makes the code more predictable, easier to reason about, and less prone to bugs.
Lifecycle Methods: React components have lifecycle methods that allow you to hook into different phases of a component's lifecycle, such as when it is created, updated, or unmounted. This gives you control over component behavior at different stages.

By "Thinking in React," developers can create more modular, maintainable, and efficient user interfaces by leveraging React's component-based architecture, one-way data flow, and efficient rendering mechanism.


*/


import coreConceptsImg from './assets/react-core-concepts.png'
import { CoreConceptProps, coreConcepts } from './data/coreConcepts.ts'

import './App.css'
import './Essentials.css'


function CoreConcept({ title, description, image }: CoreConceptProps) {
    return (
        <li>
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <p>{description}</p>
        </li>
    )
}

function Essentials() {
    return (
        <>
            <div>
                <img src={coreConceptsImg} alt="Stylized atom" />
                <h1>React Essentials</h1>
                <p>
                    Fundamental React concepts you will need for almost any app you are
                    going to build!
                </p>
            </div>
            <div id="core-concepts">
                <h2>Core Concepts</h2>
                <ul>
                    <CoreConcept {...coreConcepts[0]} />
                    <CoreConcept {...coreConcepts[1]} />
                    <CoreConcept {...coreConcepts[2]} />
                    {/*Or could do it this way which is longer*/}
                    <CoreConcept title={coreConcepts[3].title} description={coreConcepts[3].description} image={coreConcepts[3].image} />

                </ul>
            </div>
        </>
    );
}

export default Essentials