import { Component, MouseEvent } from "react";

interface IProps {
  images: string[];
}

class Carousel extends Component<IProps> {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (e: MouseEvent<HTMLElement>) => {
    // index is always a string. So th "+" symbol reverse the string into a number
    if (!(e.target instanceof HTMLElement)) {
      return;
    }
    if (e.target.dataset.index) {
      this.setState({
        active: +e.target.dataset.index,
      });
    }
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="grid grid-rows-2 gap-2">
        <img src={images[active]} alt="animal" className="mb-4 rounded-lg" />
        <div className="grid w-full grid-flow-row auto-rows-max grid-cols-4 gap-2">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              onClick={this.handleIndexClick}
              key={photo}
              src={photo}
              className={`cursor-pointer rounded-lg ${
                index === active ? "active" : ""
              }`}
              alt="animal thumbnail"
              data-index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
