import React from "react";
import "./productGallery.css";
import classNames from "classnames";

class ProductGallery extends React.Component {
  constructor(props) {
    super(props);
    this.changeCurrentImgHanlder = this.changeCurrentImgHanlder.bind(this);
    this.state = {
      currentImgIndex: 0,
    };
  }

  changeCurrentImgHanlder(index) {
    if (index === "next") {
      this.setState({
        currentImgIndex:
          this.state.currentImgIndex !== this.props.productGallery.length - 1
            ? this.state.currentImgIndex + 1
            : 0,
      });
    } else if (index === "previous") {
      this.setState({
        currentImgIndex:
          this.state.currentImgIndex !== 0
            ? this.state.currentImgIndex - 1
            : this.props.productGallery.length - 1,
      });
    } else {
      this.setState({
        currentImgIndex: index,
      });
    }
  }

  render() {
    const size = this.props.size;

    return (
      <div
        className={classNames("gallery", this.props.className, {
          gallery_size_condensed: size === "condensed",
          gallery_size_uncondensed: size === "uncondensed",
        })}
      >
        <img
          className="gallery__current-img"
          src={this.props.productGallery[this.state.currentImgIndex]}
        />
        {this.props.showSlider && this.props.productGallery.length > 1 ? (
          <>
            <button
              className="gallery__button-slider gallery__button-previous"
              onClick={() => this.changeCurrentImgHanlder("next")}
            ></button>
            <button
              className="gallery__button-slider gallery__button-next"
              onClick={() => this.changeCurrentImgHanlder("previous")}
            ></button>
          </>
        ) : null}
      </div>
    );
  }
}
export default ProductGallery;
