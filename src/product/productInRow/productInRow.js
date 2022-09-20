import React from "react";
import ProductGallery from "../../product/productGallery/productGallery";
import ProductPrice from "../../product/productPrice/productPrice";
import ProductAttributes from "../../product/productAttributes/productAttributes";
import ProductQuantity from "../productQuantity/productQuantity";
import classNames from "classnames";
import "./productInRow.css";

class ProductInRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImgIndex: 0,
    };
  }

  changeCurrentImg = (arg) => {
    const galleryLength = this.props.product.gallery.length;

    this.setState({
      currentImgIndex:
        arg && this.state.currentImgIndex < galleryLength - 1
          ? this.state.currentImgIndex + 1
          : arg === false && this.state.currentImgIndex > 0
          ? this.state.currentImgIndex - 1
          : arg === false && this.state.currentImgIndex === 0
          ? galleryLength - 1
          : 0,
    });
  };

  render() {
    const type = this.props.type;

    return (
      <div
        className={classNames("product-in-row", {
          "product-in-row_type_condensed": type === "condensed",
        })}
      >
        <div
          className={classNames("product-in-row__product-properties", {
            "product-in-row__product-properties_type_condensed":
              type === "condensed",
          })}
        >
          <h2
            className={classNames("product-name product-in-row__brand-name", {
              "product-in-row__brand-name_type_condensed": type === "condensed",
            })}
          >
            {this.props.product.brand}
          </h2>
          <h2
            className={classNames("product-name product-in-row__name", {
              "product-in-row__name_type_condensed": type === "condensed",
            })}
          >
            {this.props.product.name}
          </h2>
          <ProductPrice
            productPrices={this.props.product.prices}
            productPriceClass={classNames("product-in-row__price", {
              "product-in-row__price_type_condensed": type === "condensed",
            })}
          />
          <ProductAttributes
            productAttributes={this.props.product.attributes}
            selectedAttributes={this.props.selectedAttributes}
            productAttrClass={classNames("product-in-row__attributes", {
              "product-in-row__attributes_type_condensed": type === "condensed",
            })}
            type={type}
          />
        </div>
        <ProductQuantity
          item={this.props.item}
          type={type}
          productQuantityClass={classNames("product-in-row__quantity", {
            "product-in-row__quantity_type_condensed": type === "condensed",
          })}
        />
        <ProductGallery
          productGallery={this.props.product.gallery}
          currentImgIndex={this.state.currentImgIndex}
          size={type}
          showSlider={this.props.showSlider}
        />
      </div>
    );
  }
}

export default ProductInRow;
