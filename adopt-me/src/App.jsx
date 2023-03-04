// import React from "react"; we dont want this anymore bcoz of vite
import { createRoot } from "react-dom/client";
import { useState } from "react";
import AdoptedPetContext from "./AdoptedPetContext";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Details from "./Details";
// import Pet from "./Pet";
import SearchParams from "./SearchParams";

// import Pet here not {Pet} bcoz of export default action if you seen Pet.jsx file at last export default Pet called thats why when i import Pet file in here we Call it without curly bracket.

// if i define Pet like export const pet = () => {} , like this then when i import Pet in other location i should import like import {Pet} from "./Pet"; hope you understand

// ***********************

// const Pet = (props) => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, props.name),
//     React.createElement("h2", {}, props.animal),
//     React.createElement("h2", {}, props.breed),
//   ]);
// };
// for that you actully create <div> <h1> LUNA </h1> </div>
// now we use props bcoz each child in a list should be have a unique key.that is props.
// now we create Pet.jsx and move it their
// and when you seen pet.jsx file it sort and sweet bcoz of "vite"

// const App = () => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, "Adopt Me !"),
//     React.createElement(Pet, {
//       name: "Luna",
//       animal: "Dog",
//       breed: "Havana",
//     }),
//     React.createElement(Pet, {
//       name: "Pussy",
//       animal: "Cat",
//       breed: "Indian",
//     }),
//     React.createElement(Pet, {
//       name: "Mithu",
//       animal: "Bird",
//       breed: "Parrot",
//     }),
//   ]);
// };

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPetHooks = useState(null);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AdoptedPetContext.Provider value={adoptedPetHooks}>
          <header>
            <Link to="/"> Adopt Me! </Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="" element={<SearchParams />} />
          </Routes>
        </AdoptedPetContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

// here we can say that "App" is a Parent component and "Pet" is children component
// react basically work from up to down not down to up.
// parents mess with their children but children did not mess with their parent.

const container = document.getElementById("root");
const root = createRoot(container);
// root.render(React.createElement(App, {}, null));
root.render(<App />);

// if i want i can remove after App , {} & null

// when i write React.createElement("h1",{id : "paraHead"} , "Heading") what i am actully trying to render is <h1 id ="paraHead"> Heading </h1>
// <App /> self close

// hooks is class component substitue. but you should learn class component as well bcoz still it is used

// React Query cache is stored in memory.
