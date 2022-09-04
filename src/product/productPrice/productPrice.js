import React from "react";
import { connect } from "react-redux";
import "./productPrice.css";

class ProductPrice extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.isLoading) {
      return <div>Loading...</div>;
    } else {
      const currency = this.props.productPrices.find((elem) => {
        return elem.currency.label === this.props.currentCurrency.label;
      });
      return (
        <h3 className={"product-price " + this.props.productPriceClass}>
          {currency.currency.symbol}
          {currency.amount}
        </h3>
      );
    }
  }
}

const mapStateToProps = (state) => {
  const isLoading = state.clothingStoreData.currencies === null;
  if (state.clothingStoreData.currencies === null) return {};
  const currentCurrency = state.clothingStoreData.currentCurrency;

  return {
    currentCurrency,
    isLoading,
  };
};

export default connect(mapStateToProps, null)(ProductPrice);
