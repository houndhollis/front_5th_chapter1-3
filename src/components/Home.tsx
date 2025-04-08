import { useState } from "react";
import { generateItems } from "../utils";
import { Header } from "../components/Header";
import { ItemList } from "../components/ItemList";
import { ComplexForm } from "../components/ComplexForm";
import { NotificationSystem } from "../components/NotificationSystem";
import { useToggleContext } from "../provider/ToggleProvider";

export const Home = () => {
  const [items, setItems] = useState(generateItems(1000));
  const { theme } = useToggleContext();

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:pr-4">
            <ItemList items={items} onAddItemsClick={addItems} />
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <ComplexForm />
          </div>
        </div>
      </div>
      <NotificationSystem />
    </div>
  );
};
