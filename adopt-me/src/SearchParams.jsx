// lets make a new route called SearchParams.jsx and have it accept serch Parameter.

import { useState, useContext } from "react";
import AdoptedPetContext from "./AdoptedPetContext";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "../fetchSearch";
import useBreedList from "./useBreedList";
import Results from "./Results";

const ANIMALS = ["bird", "dog", "cat", "reptile", "rabbit"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  //   const location = "Seatle WA";
  // delete location,pets and breed useState calls
  // const [location, setLoaction] = useState("");
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  // eslint-disable-next-line no-unused-vars
  const [adoptedPet, _] = useContext(AdoptedPetContext);

  // const [breed, setBreed] = useState("");

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  // const [pets, setPets] = useState([]);

  // delete useEfect and requestPets

  // useEffect(() => {
  //   requestPets();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // async function requestPets() {
  //   const res = await fetch(
  //     `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  //   );
  //   const json = await res.json();
  //   setPets(json.pets);
  // }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // requestPets();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        {/* // remove onChange and functions for breed and location select and input
            // remove value={location} / value={animal} / value={breed} from three input / selects
            // add name="animal" / name="location" / name="breed" to the three input / selects */}

        {/* label for location */}

        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}

        <label htmlFor="location">
          Location
          <input
            // onChange={(e) => setLoaction(e.target.value)}
            id="location"
            name="location"
            // value={location} // this is how you output javascript in jsx , for using {} curly brkt
            placeholder="Loaction"
          />
        </label>

        {/* label for animal */}

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              // setBreed("");
              // we use setBreed("") here bcoz of when we select animal name and after that select breed , breed thing not change when i change animal name like dog to cat breed always select (eg :- labrador) so for that reason we use setBreed("") here
            }}
          >
            <option />
            {/* <option/> used here bcoz of after <select> should be there <option>  otherwise  "bird " automatically selected every time bcoz of we want empty option so we did it */}

            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        {/* label for breed */}

        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            name="breed"
            // value={breed}
            // onChange={(e) => setBreed(e.target.value)}
            disabled={breeds.length === 0}
            // disabled use here bcoz curruntly we have no breed in array, so it will disable automatically one we put some brred name in array than disable option is no more.
          >
            <option />

            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>

      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;

// "Seattle, WA". Try and type in it. You'll see that you can't modify it. Why? Let's think about how React works: when you type in the input, React detects that a DOM event happens. When that happens, React thinks something may have changed so it runs a re-render.

// for that change we want to updated , we use hooks (useState) and also onChange = {} now thing working according for me. setLocation function here for check anything change should be updated as well

// As such, do not put hooks inside if statements or loops. If you do, you'll have insane bugs that involve useState returning the wrong state. If you see useState returning the wrong piece of state, this is likely what you did.

//useState returns to us an array with two things in it: the current value of that state and a function to update that state . for here "location" is currunt value, and "setLocation" is a function.

// up above you see i use "ANIMAL.map" only i use this above bcoz of {} curly bracket , bcoz this is how in jsx , javascript work for run js property you should run it inside {}.

// here now we dont want to use useEffect instead use here useQuery()

// useQuery work fast and use cache
