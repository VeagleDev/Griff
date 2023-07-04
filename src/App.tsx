import "./App.css";
import {Button, Flex} from "@mantine/core";
import {useModals} from "@mantine/modals";

function App() {
  const modals = useModals();

  return (
    <Flex justify="center" align="center" sx={{margin: '10px 0'}}>
      <Button
        variant="outline"
        color="blue"
        size="lg"
        radius="xl"
        sx={{margin: '10px 0'}}
        onClick={() => {
          modals.openModal({
            title: 'Modal title',
            children: 'Yeah, this is modal body',
            size: 'md',
          })
        }}
      >Click me!</Button>
    </Flex>

  );
}

export default App;
