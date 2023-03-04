import { Link } from "react-router-dom";

const Pet = (props) => {
  const { name, animal, breed, images, location, id } = props;

  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
    // here image[0] is image index no.
  }

  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} — ${breed} — ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;

// {props.name} syntex {} , this is how you output javascript expression in jsx.
// <div /> self closing its is valid in jsx

// props is read only, state is mutable
// {`/details/${id}`}  this id will mentione in Reasults.jsx  "id={pet.id}"

// Link tag instead of <a/>

// useParams :- The useParams() hook is a React Router hook that allows you to access the parameters of the current URL. This can be useful if you want to dynamically render content based on the URL parameters. For example, if you have a blog application, you may want to render different articles based on the article ID in the URL.
