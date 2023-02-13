import { Component } from 'react';

class Carousel extends Component {
    state = {
        active: 0
    };

    static defaultProps = {
        images: ["http://pets-images.dev-apis.com/pets/none.jpg"]
    };

    handleIndexClick = (e) => {
        // index is always a string. So th "+" symbol reverse the string into a number
        this.setState({
            active: +e.target.dataset.index
        });
    };

    render() {
        const { active } = this.state;
        const { images } = this.props;

        return (
            <div className='carousel'>
                <img src={images[active]} alt="animal" />
                <div className='carousel-smaller'>
                    {images.map((photo, index) => (
                        // eslint-disable-next-line
                        <img
                            onClick={this.handleIndexClick}
                            key={photo}
                            src={photo}
                            className={index === active ? "active" : ""}
                            alt="animal thumbnail"
                            data-index={index} />
                    ))}
                </div>
            </div>
        )
    }
}

export default Carousel;