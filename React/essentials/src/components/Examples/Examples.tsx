import TabButton from "../TabButton/TabButton";
import Section from "../Section";
import Tabs from "../Tabs";
import {useState} from "react";
import {ESSENTIALS_DATA} from "../../data/essentials-data";
import "./Examples.css";

export default function Examples() {

  const [selectedTopic, setSelectedTopic] = useState("");

  //console.log('Examples component rendered.');

  function handleSelect(selectedButton: string) {
    setSelectedTopic(selectedButton)

    // This is interesting. It will log the previously selected topic to the console as the setSelectedTopic function
    // is asynchronous the console.log statement will run before the state is updated.
    console.log(`Selected Button: ${selectedTopic}`);
  }
  let tabContent = <p id="tab-content">Please select a topic</p>;

  if (selectedTopic !== "") {
    tabContent = (
      <div id="tab-content">
        <h3>{ESSENTIALS_DATA[selectedTopic].title}</h3>
        <p>{ESSENTIALS_DATA[selectedTopic].description}</p>
        <pre><code>{ESSENTIALS_DATA[selectedTopic].code}</code></pre>
      </div>
    );
  }
  
  return (
    <Section title="Examples" id="examples">
      
      <Tabs
        buttons={
        <>
          <TabButton
            isSelected={selectedTopic === 'components'}
            onClick={() => {handleSelect('components');}}
          >
            Components
          </TabButton>
          <TabButton
            isSelected={selectedTopic === 'jsx'}
            onClick={() => { handleSelect('jsx'); }}
          >
            JSX
          </TabButton>
          <TabButton
            isSelected={selectedTopic === 'props'}
            onClick={() => { handleSelect('props');}}
          >
            Props
          </TabButton>
          <TabButton
            isSelected={selectedTopic === 'state'}
            onClick={() => {handleSelect('state'); }}
          >
            State
          </TabButton>
        </>
      }>
        {tabContent}
      </Tabs>     
      
    </Section>
  )
}