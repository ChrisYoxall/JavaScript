import componentsImg from "../assets/components.png";
import jsxImg from "../assets/jsx-ui.png";
import propsImg from "../assets/props.png";
import stateImg from "../assets/state-mgmt.png";

export interface CoreConceptProps {
    title: string;
    description: string;
    image: string;
}

export const coreConcepts: CoreConceptProps[] = [
    {
        image: componentsImg,
        title: 'Components',
        description:
            'The core UI building block - compose the user interface by combining multiple components.',
    },
    {
        image: jsxImg,
        title: 'JSX',
        description:
            'Return dynamic HTML(ish) code to define the actual markup that will be rendered.',
    },
    {
        image: propsImg,
        title: 'Props',
        description:
            'Make components configurable (and therefore reusable) by passing input data to them.',
    },
    {
        image: stateImg,
        title: 'State',
        description:
            'React-managed data which, when changed, causes the component to re-render & the UI to update.',
    },
];