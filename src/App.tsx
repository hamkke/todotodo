import { GlobalStyle } from "GlobalStyle";
import ToDoList from "components/ToDoList";
import FineDust from "components/FineDust";
const App = () => {
  return (
    <>
      <GlobalStyle />
      <FineDust />
      <ToDoList />
    </>
  );
};

export default App;
