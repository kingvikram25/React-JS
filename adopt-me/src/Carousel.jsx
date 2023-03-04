import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  // add eventlistner and it should be arrow function
  handleImageClick = (e) => {
    this.setState({
      active: +e.target.dataset.index,
      // if you miss "+" sign then image changes but which image is selected you not understood
      // The data attribute comes back as a string. We want it to be a number, hence the +.
    });
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              onClick={this.handleImageClick}
              data-index={index} // most important if you miss you than on click other images, image not loaded
              key={photo}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;

// everythings is in DOM is string.
// +'5' = 5

// in statis method you can call directly class itself
