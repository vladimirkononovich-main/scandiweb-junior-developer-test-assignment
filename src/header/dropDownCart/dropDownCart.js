import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProductInRow from "../../product/productInRow/productInRow";
import "./dropDownCart.css";

class DropDownCart extends React.Component {
  render() {
    if (!this.props.cartItems.length) {
      return (
        <>
          <div className="drop-down-cart-switcher">
            <button
              className="drop-down-cart-switcher__btn"
              onClick={this.props.showBag}
            />
            {this.props.cartItemsQuantity ? (
              <div className="drop-down-cart-switcher__counter">
                {this.props.cartItemsQuantity}
              </div>
            ) : null}
          </div>
          {this.props.isBagVisible && (
            <>
              <div className="backdrop"></div>
              <div
                className="drop-down-cart"
                onClick={(event) => event.stopPropagation()}
              >
                <h3 className="drop-down-cart__title">My Bag</h3>
                <h2 className="drop-down-cart__empty-title">
                  No product in cart
                </h2>
                <div className="drop-down-cart__buttons-wrapper">
                  <Link
                    to={`${
                      "/categories/" + this.props.categoryId + "/cartPage"
                    }`}
                    className="drop-down-cart__view-bag-button"
                    onClick={this.props.hideSwitchers}
                  >
                    view bag
                  </Link>
                </div>
              </div>
            </>
          )}
        </>
      );
    }
    return (
      <>
        <div className="drop-down-cart-switcher">
          <button
            className="drop-down-cart-switcher__btn"
            onClick={this.props.showBag}
          />
          {this.props.cartItemsQuantity ? (
            <div className="drop-down-cart-switcher__counter">
              {this.props.cartItemsQuantity}
            </div>
          ) : null}
        </div>
        {this.props.isBagVisible && (
          <>
            <div className="backdrop"></div>
            <div
              className="drop-down-cart"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="drop-down-cart__title-wrapper">
                <h3 className="drop-down-cart__title">My Bag,</h3>
                &nbsp;
                <h4 className="drop-down-cart__items-counter">
                  {this.props.cartItemsQuantity === 1
                    ? this.props.cartItemsQuantity + " item"
                    : this.props.cartItemsQuantity === null
                    ? "0 items"
                    : this.props.cartItemsQuantity + " items"}
                </h4>
              </div>
              <div className="drop-down-cart__products">
                {this.props.cartItems.map((item, index) => {
                  return (
                    <ProductInRow
                      product={item.product}
                      selectedAttributes={item.selectedAttributes}
                      item={item}
                      type={"condensed"}
                      key={index}
                    />
                  );
                })}
              </div>
              <div className="drop-down-cart__total-title">
                Total
                <h3 className="drop-down-cart__total-counter">
                  {this.props.currentCurrency.symbol}
                  {((this.props.total * 100) / 100).toFixed(2)}
                </h3>
              </div>
              <div className="drop-down-cart__buttons-wrapper">
                <Link
                  to={`${"/categories/" + this.props.categoryId + "/cartPage"}`}
                  className="drop-down-cart__view-bag-button"
                  onClick={this.props.hideSwitchers}
                >
                  view bag
                </Link>
                <button className="drop-down-cart__checkout-button">
                  check out
                </button>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const categoryId = state.router.location.pathname.split("/")[2];
  const cartItemsQuantity = state.clothingStoreData.cartItemsQuantity;
  const cartItems = state.clothingStoreData.cartItems;
  const currentCurrency = state.clothingStoreData.currentCurrency;
  const total = cartItems.reduce((item, nextItem) => {
    const itemPrice = nextItem.product.prices.find((elem) => {
      return elem.currency.label === currentCurrency.label;
    });
    return item + itemPrice.amount * nextItem.quantity;
  }, 0);

  return { categoryId, cartItemsQuantity, cartItems, total, currentCurrency };
};

export default connect(mapStateToProps, null)(DropDownCart);
