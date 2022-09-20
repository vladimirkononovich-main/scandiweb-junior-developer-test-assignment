import React from "react";
import { connect } from "react-redux";
import ProductAttributes from "../../product/productAttributes/productAttributes";
import ProductPrice from "../../product/productPrice/productPrice";
import { addProductToCart } from "../../redux/actions";
import classNames from "classnames";
import { Interweave } from "interweave";
import "./productPage.css";
import { Action } from "history";

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.changeSelectedIdHandler = this.changeSelectedIdHandler.bind(this);
    this.changeCurrentImgHandler = this.changeCurrentImgHandler.bind(this);
    this.addProductToCartHandler = this.addProductToCartHandler.bind(this);
    this.state = {
      selectedAttributes: [],
      currentImgIndex: 0,
    };
  }

  componentDidMount() {
    this.setState({
      selectedAttributes: this.props.selectedAttributes,
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.selectedAttributes !== this.props.selectedAttributes &&
      !this.state.selectedAttributes
    ) {
      this.setState({
        selectedAttributes: this.props.selectedAttributes,
      });
    }
  }

  changeCurrentImgHandler(index) {
    this.setState({
      currentImgIndex: index,
    });
  }

  changeSelectedIdHandler(attrId, itemId) {
    this.setState({
      selectedAttributes: this.state.selectedAttributes.map((elem) => {
        if (elem.attrId !== attrId) return elem;
        return {
          ...elem,
          itemId: itemId,
        };
      }),
    });
  }

  addProductToCartHandler() {
    const newCartItem = {
      selectedAttributes: this.state.selectedAttributes,
      product: this.props.product,
    };
    this.props.addProductToCart(newCartItem);
  }

  render() {
    if (this.props.categoryIsLoading || this.props.productIsLoading) {
      return <div>Loading...</div>;
    }

    return (
      <section className="product">
        <div className="product-slider">
          {this.props.product.gallery.map((img, index) => {
            return (
              <div className="product-slider__gallery" key={index}>
                <img
                  key={index}
                  className="gallery__current-img"
                  src={this.props.product.gallery[index]}
                  onClick={() => this.changeCurrentImgHandler(index)}
                />
              </div>
            );
          })}
        </div>
        <div
          className={classNames("product__gallery", {
            "product__gallery_out-of-stock": !this.props.product.inStock,
          })}
        >
          <img
            className="gallery__current-img"
            src={this.props.product.gallery[this.state.currentImgIndex]}
          />
        </div>
        <div className="product-info">
          <h3 className="product-name product-info__brand-name">
            {this.props.product.brand}
          </h3>
          <h3 className="product-name product-info__name">
            {this.props.product.name}
          </h3>
          <ProductAttributes
            selectedAttributes={this.state.selectedAttributes}
            productAttributes={this.props.productAttributes}
            changeSelectedIdHandler={this.changeSelectedIdHandler}
            className="product-info__attributes"
            type="medium"
          />
          <h3 className="product-info__price-title">price:</h3>
          <ProductPrice productPrices={this.props.product.prices} />
          <button
            className={classNames("product-info__add-to-cart-btn", {
              "product_type_out-of-stock": !this.props.product.inStock,
            })}
            onClick={
              this.props.product.inStock ? this.addProductToCartHandler : null
            }
          >
            add to cart
          </button>
          <Interweave
            className="product-info__description"
            content={this.props.product.description}
          />
        </div>
      </section>
    );
  }
}
const mapDispathToProps = {
  addProductToCart: addProductToCart,
};
const mapStateToProps = (state) => {
  const categoryIsLoading = state.clothingStoreData.category === null;

  const productId = state.router.location.pathname.split("/")[3];
  if (categoryIsLoading || productId === undefined)
    return { categoryIsLoading };
  const product = state.clothingStoreData.category.products.find((product) => {
    return product.id === productId;
  });
  const productIsLoading = product === undefined;
  if (product === undefined) return { categoryIsLoading, productIsLoading };

  const productGallery = product.gallery;
  const productAttributes = product.attributes;
  const selectedAttributes = productAttributes.map((attr) => {
    return {
      attrId: attr.id,
      itemId: attr.items[0].id,
    };
  });

  const cartItems = state.clothingStoreData.cartItems;

  return {
    productGallery,
    categoryIsLoading,
    productIsLoading,
    product,
    productAttributes,
    selectedAttributes,
    productId,
    cartItems,
  };
};
export default connect(mapStateToProps, mapDispathToProps)(ProductPage);
