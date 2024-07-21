export default function EssentialsHeader() {

  const reactDescriptions: string[] = ['Fundamental', 'Crucial', 'Essential', 'Key', 'Vital'];

  function getRandomInt(max: number): number  {
    return Math.floor(Math.random() * (max + 1))
  }

  return (
    <header>
      <h1>React Essentials</h1>
      <p>
        {reactDescriptions[getRandomInt(reactDescriptions.length)]} React concepts you will need for almost any app you build.
      </p>
    </header>
  );

}