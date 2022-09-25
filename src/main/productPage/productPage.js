import React from "react";
import { connect } from "react-redux";
import ProductAttributes from "../../product/productAttributes/productAttributes";
import ProductPrice from "../../product/productPrice/productPrice";
import {
  addProductToCart,
  loadClothingStoreProduct,
} from "../../redux/actions";
import classNames from "classnames";
import { Interweave } from "interweave";
import "./productPage.css";

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
    this.props.loadClothingStoreProduct(this.props.productId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.productId !== prevProps.productId) {
      this.setState({
        selectedAttributes: [],
      });
      this.props.loadClothingStoreProduct(this.props.productId);
    }

    if (prevProps.productIsLoading && !this.props.productIsLoading) {
      const selectedAttributes = this.props.productAttributes.map((attr) => {
        return {
          attrId: attr.id,
          itemId: attr.items[0].id,
        };
      });

      this.setState({
        selectedAttributes: selectedAttributes,
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
    if (this.props.productIsLoading) {
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
                  alt="not found"
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
            alt="not found"
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
  loadClothingStoreProduct: loadClothingStoreProduct,
};

const mapStateToProps = (state) => {
  const productId = state.router.location.pathname.split("/")[3];
  const product = state.clothingStoreData.product;
  const productIsLoading = product === null;

  if (productIsLoading) return { productIsLoading, productId };

  const productGallery = product.gallery;
  const productAttributes = product.attributes;

  return {
    productGallery,
    productIsLoading,
    product,
    productAttributes,
    productId,
  };
};

export default connect(mapStateToProps, mapDispathToProps)(ProductPage);
