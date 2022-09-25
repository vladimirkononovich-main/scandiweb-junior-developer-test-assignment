import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  addProductToCart,
  loadClothingStoreCategory,
} from "../../redux/actions";
import ProductGallery from "../../product/productGallery/productGallery";
import ProductPrice from "../../product/productPrice/productPrice";
import classNames from "classnames";
import "./categoryPage.css";

class CategoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.addProductToCartHandler = this.addProductToCartHandler.bind(this);
  }

  componentDidMount() {
    if (this.props.categories) {
      const categories = this.props.categories.map((c) => c.name);

      if (categories.includes(this.props.categoryId)) {
        this.props.loadClothingStoreCategory(this.props.categoryId);
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.categoryId !== prevProps.categoryId ||
      this.props.categories !== prevProps.categories
    ) {
      const categories = this.props.categories.map((c) => c.name);

      if (categories.includes(this.props.categoryId)) {
        this.props.loadClothingStoreCategory(this.props.categoryId);
      }
    }
  }

  addProductToCartHandler(event, product) {
    event.preventDefault();
    const selectedAttributes = product.attributes.map((attr) => {
      return {
        attrId: attr.id,
        itemId: attr.items[0].id,
      };
    });
    const newCartItem = {
      selectedAttributes: selectedAttributes,
      product: product,
    };

    this.props.addProductToCart(newCartItem);
  }

  render() {
    if (!this.props.products) {
      return <div>Loading...</div>;
    }
    return (
      <section className="category">
        <h2 className="category__title">{this.props.categoryId}</h2>
        <div className="category__products">
          {this.props.products.map((product) => {
            return (
              <Link
                key={product.id}
                to={this.props.pathName + "/" + product.id}
                className={classNames("product-card", {
                  "product-card_type_out-of-stock": !product.inStock,
                })}
              >
                <button
                  className="product-card__add-to-cart-btn"
                  onClick={(event) =>
                    this.addProductToCartHandler(event, product)
                  }
                />
                <ProductGallery
                  productGallery={product.gallery}
                  className="product-card__gallery"
                />
                <h3 className="product-name product-card__name">
                  {product.brand + " " + product.name}
                </h3>
                <ProductPrice
                  productPrices={product.prices}
                  productPriceClass="product-card__price"
                />
              </Link>
            );
          })}
        </div>
      </section>
    );
  }
}

const mapDispathToProps = {
  addProductToCart: addProductToCart,
  loadClothingStoreCategory: loadClothingStoreCategory,
};

const mapStateToProps = (state) => {
  const pathName = state.router.location.pathname;
  const categoryId = pathName.split("/")[2];
  const categories = state.clothingStoreData.categories;

  if (!state.clothingStoreData.category)
    return { categoryId, pathName, categories };

  const products = state.clothingStoreData.category.products;

  return { pathName, products, categoryId, categories };
};

export default connect(mapStateToProps, mapDispathToProps)(CategoryPage);
