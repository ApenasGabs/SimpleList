import type { JSX } from "react";
import { Footer } from "./components/Footer/Footer";
import { ListManager } from "./components/ListManager/ListManager";
import { Navbar } from "./components/Navbar/Navbar";
import { TaskList } from "./components/TaskList/TaskList";
import ThemeSelector from "./components/ThemeSelector/ThemeSelector";
import { useApp } from "./context";

const App = (): JSX.Element => {
  const { activeListId } = useApp();

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <Navbar title="SimpleList">
        <ThemeSelector />
      </Navbar>

      <div className="flex-1 flex flex-col md:flex-row gap-4 p-4">
        <ListManager />

        <main className="flex-1">
          <TaskList listId={activeListId} />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default App;
