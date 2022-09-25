import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { toggleCurrency } from "../../redux/actions";
import "./dropDownCurrency.css";

class DropDownCurrency extends React.Component {
  render() {
    if (this.props.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <div className="drop-down-currency-switcher">
          <div
            className="drop-down-currency-switcher__title"
            onClick={this.props.showCurrency}
          >
            {this.props.currentCurrencySymbol}
          </div>
          <button
            className={classNames("drop-down-currency-switcher__btn", {
              "drop-down-currency-switcher__btn_active":
                this.props.isCurrencySwitcherVisible,
            })}
            onClick={this.props.showCurrency}
          />
        </div>
        {this.props.isCurrencySwitcherVisible && (
          <div className="drop-down-currency">
            {this.props.currency.map((elem, index) => {
              const isSelected =
                elem.symbol === this.props.currentCurrency.symbol;

              return (
                <div
                  className={classNames("drop-down-currency__btn", {
                    "drop-down-currency__btn_active": isSelected,
                  })}
                  key={elem.symbol}
                  onClick={(event) => this.props.toggleCurrency(index)}
                >
                  <p className="drop-down-currency__title">
                    {elem.symbol} {elem.label}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  }
}

const mapDispathToProps = {
  toggleCurrency: toggleCurrency,
};

const mapStateToProps = (state) => {
  const isLoading = state.clothingStoreData.currencies === null;
  if (state.clothingStoreData.currencies === null) return { isLoading };

  const currency = state.clothingStoreData.currencies;
  const currentCurrency = state.clothingStoreData.currentCurrency;

  return {
    currency,
    isLoading,
    currentCurrency,
  };
};

export default connect(mapStateToProps, mapDispathToProps)(DropDownCurrency);
