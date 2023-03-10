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
    // const { active } = this.state;
    const { images } = this.props;
    console.log(images);
    return (
      <div
        id="carouselExampleIndicators"
        className="relative"
        data-te-carousel-init
        data-te-carousel-slide
      >
        <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
          {images.map((photo, index) => {
            <div className="sdss">SDSS</div>;
            if (index === 0) {
              return (
                <div
                  key={index}
                  className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                  data-te-carousel-item
                  data-te-carousel-active
                >
                  <img src={photo} alt="" className="block w-full" />
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                  data-te-carousel-item
                >
                  <img
                    src={photo}
                    className="block w-full"
                    alt="Exotic Fruits"
                  />
                </div>
              );
            }
          })}
        </div>
        <button
          className="absolute top-0 bottom-0 left-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
          type="button"
          data-te-target="#carouselExampleIndicators"
          data-te-slide="prev"
        >
          <span className="inline-block h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </span>
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Previous
          </span>
        </button>
        <button
          className="absolute top-0 bottom-0 right-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
          type="button"
          data-te-target="#carouselExampleIndicators"
          data-te-slide="next"
        >
          <span className="inline-block h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </span>
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Next
          </span>
        </button>
      </div>
    );
  }
}

export default Carousel;

// everythings is in DOM is string.
// +'5' = 5

// in statis method you can call directly classNameNameName itself
// render() {
//   const { active } = this.state;
//   const { images } = this.props;
//   return (
//     <div classNameNameNameName="carousel">
//       <img src={images[active]} alt="animal" />
//       <div classNameNameNameName="carousel-smaller">
//         {images.map((photo, index) => (
//           // eslint-disable-next-line
//           <img
//             onClick={this.handleImageClick}
//             data-index={index} // most important if you miss you than on click other images, image not loaded
//             key={photo}
//             src={photo}
//             classNameNameNameName={index === active ? "active" : ""}
//             alt="animal thumbnail"
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
