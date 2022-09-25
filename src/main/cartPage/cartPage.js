import React from "react";
import { connect } from "react-redux";
import ProductInRow from "../../product/productInRow/productInRow";
import "./cartPage.css";

class CartPage extends React.Component {
  render() {
    if (this.props.cartItems === undefined) {
      return <div>Loading...</div>;
    }
    if (!this.props.cartItems.length) {
      return (
        <div className="cart">
          <h2 className="cart__title">cart</h2>
          <h3 className="cart__empty-title">No product in cart</h3>
        </div>
      );
    }
    return (
      <div className="cart">
        <h2 className="cart__title">cart</h2>
        <div className="cart__products">
          {this.props.cartItems.map((item, index) => {
            return (
              <ProductInRow
                key={index}
                product={item.product}
                selectedAttributes={item.selectedAttributes}
                item={item}
                showSlider={true}
                type={"uncondensed"}
              />
            );
          })}
        </div>
        <div className="cart__tax-title">
          Tax 21%: &nbsp;&nbsp;
          <span className="cart__tax">
            {this.props.currentCurrency.symbol}
            {((this.props.total * (21 / 100) * 100) / 100).toFixed(2)}
          </span>
        </div>
        <div className="cart__total-quantity-title">
          Quantity:&nbsp;
          <span className="cart__total-quantity">
            {this.props.cartItemsQuantity || 0}
          </span>
        </div>
        <div className="cart__total-price-title">
          Total:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="cart__total-price">
            {this.props.currentCurrency.symbol}
            {((this.props.total * 100) / 100).toFixed(2)}
          </span>
        </div>
        <button className="cart__order-button">order</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const cartItems = state.clothingStoreData.cartItems;
  const cartItemsQuantity = state.clothingStoreData.cartItemsQuantity;
  const currentCurrency = state.clothingStoreData.currentCurrency;

  const total = cartItems.reduce((item, nextItem) => {
    const itemPrice = nextItem.product.prices.find((elem) => {
      return elem.currency.label === currentCurrency.label;
    });
    return item + itemPrice.amount * nextItem.quantity;
  }, 0);

  return { cartItems, cartItemsQuantity, total, currentCurrency };
};

export default connect(mapStateToProps, null)(CartPage);
