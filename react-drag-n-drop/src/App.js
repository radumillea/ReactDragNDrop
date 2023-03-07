import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useState } from "react";
import SortableItem from "./SortableItem";

function App() {
  const [languagesList, setLanguagesList] = useState([
    "JavaScript",
    "Python",
    "TypeScript",
  ]);

  const handleDragEnd = (event) => {
    console.log("drag end call");
    const { active, over } = event;
    //active card the user presses
    //the card the user is pressing over

    if (active.id !== over.id) {
      setLanguagesList((prevState) => {
        const activeIndex = prevState.indexOf(active.id);
        const overIndex = prevState.indexOf(over.id);

        return arrayMove(prevState, activeIndex, overIndex);
        //move the language with active index in the overIndex position, taking the array prevState
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      {" "}
      <Container className="p-3" style={{ width: "50%" }} align="center">
        <h3>The best programming languages</h3>
        <SortableContext
          items={languagesList}
          strategy={verticalListSortingStrategy}
        >
          {
            //inside the sortable context , we need components that use useSortable hook
          }

          {languagesList &&
            languagesList.map((language, index) => {
              return <SortableItem key={index} id={language}></SortableItem>;
            })}
        </SortableContext>
      </Container>
    </DndContext>
  );
}

export default App;
