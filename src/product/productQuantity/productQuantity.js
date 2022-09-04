import React from "react";
import { connect } from "react-redux";
import {
  addProductToCart,
  changeProductQuantity,
  removeProduct,
} from "../../redux/actions";
import classNames from "classnames";
import "./productQuantity.css";

class ProductQuantity extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const type = this.props.type;
    const productId = this.props.item.product.id;
    const selectedAttributes = this.props.item.selectedAttributes;

    return (
      <div
        className={classNames(
          "product-quantity",
          this.props.productQuantityClass,
          {
            "product-quantity_type_condensed": type === "condensed",
          }
        )}
      >
        <button
          onClick={() =>
            this.props.changeProductQuantity(1, productId, selectedAttributes)
          }
          className={classNames("product-quantity__btn-plus", {
            "product-quantity__btn-plus_type_condensed": type === "condensed",
          })}
        ></button>
        <div
          className={classNames("product-quantity__counter", {
            "product-quantity__counter_type_condensed": type === "condensed",
          })}
        >
          {this.props.item.quantity}
        </div>
        <button
          style={
            this.props.item.quantity === 1 ? { backgroundImage: "none" } : null
          }
          className={classNames("product-quantity__btn-minus", {
            "product-quantity__btn-minus_type_condensed": type === "condensed",
          })}
          onClick={
            this.props.item.quantity > 1
              ? () =>
                  this.props.changeProductQuantity(
                    -1,
                    productId,
                    selectedAttributes
                  )
              : () => this.props.removeProduct(productId, selectedAttributes)
          }
        >
          {this.props.item.quantity > 1 ? "" : "del"}
        </button>
      </div>
    );
  }
}

const mapDispathToProps = {
  addProductToCart: addProductToCart,
  changeProductQuantity: changeProductQuantity,
  removeProduct: removeProduct,
};

const mapStateToProps = (state) => {
  const cartItems = state.clothingStoreData.cartItems;

  return { cartItems };
};

export default connect(mapStateToProps, mapDispathToProps)(ProductQuantity);
