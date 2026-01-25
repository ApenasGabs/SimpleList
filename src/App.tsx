import type { JSX } from "react";
import { Footer } from "./components/Footer/Footer";
import { Navbar } from "./components/Navbar/Navbar";
import { TaskList } from "./components/TaskList/TaskList";
import ThemeSelector from "./components/ThemeSelector/ThemeSelector";

const App = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <Navbar title="SimpleList">
        <ThemeSelector />
      </Navbar>

      <main className="flex-1 px-4 py-6">
        <TaskList />
      </main>

      <Footer />
    </div>
  );
};

export default App;
