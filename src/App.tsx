import { useState } from "react";
import type { ReactElement } from "react";
import { Footer } from "./components/Footer/Footer";
import { ListManager } from "./components/ListManager/ListManager";
import { Navbar } from "./components/Navbar/Navbar";
import { TaskList } from "./components/TaskList/TaskList";
import { TodayView } from "./components/TodayView/TodayView";
import ThemeSelector from "./components/ThemeSelector/ThemeSelector";
import { useApp } from "./context";

type View = "lists" | "today";

const App = (): ReactElement => {
  const { activeListId } = useApp();
  const [activeView, setActiveView] = useState<View>("lists");

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <Navbar title="SimpleList">
        <ThemeSelector />
      </Navbar>

      <div className="flex-1 flex flex-col md:flex-row gap-4 p-4">
        {activeView === "lists" && <ListManager />}

        <main className="flex-1">
          <div className="tabs tabs-boxed bg-base-100 mb-4 shadow-sm">
            <button
              type="button"
              className={`tab ${activeView === "lists" ? "tab-active" : ""}`}
              onClick={() => setActiveView("lists")}
              data-testid="tab-lists"
            >
              📋 Listas
            </button>
            <button
              type="button"
              className={`tab ${activeView === "today" ? "tab-active" : ""}`}
              onClick={() => setActiveView("today")}
              data-testid="tab-today"
            >
              📅 Hoje
            </button>
          </div>

          {activeView === "lists" && <TaskList listId={activeListId} />}
          {activeView === "today" && <TodayView />}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default App;
