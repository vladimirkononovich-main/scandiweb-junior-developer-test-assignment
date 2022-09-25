import React from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import "./header.css";
import classNames from "classnames";
import DropDownCart from "./dropDownCart/dropDownCart.js";
import DropDownCurrency from "./dropDownCurrency/dropDownCurrency.js";
import { loadCategoryNamesAndCurrencies } from "../redux/actions";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.hideSwitchers = this.hideSwitchers.bind(this);
    this.showBag = this.showBag.bind(this);
    this.showCurrency = this.showCurrency.bind(this);

    this.state = {
      isCurrencySwitcherVisible: false,
      isBagVisible: false,
    };
  }

  componentDidMount() {
    this.props.loadCategoryNamesAndCurrencies();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState == this.state) return;

    if (!this.state.isCurrencySwitcherVisible || !this.state.isBagVisible) {
      document.body.removeEventListener("click", this.hideSwitchers);
      document.body.removeEventListener("keydown", this.hideSwitchers);
    }
    if (this.state.isCurrencySwitcherVisible || this.state.isBagVisible) {
      document.body.addEventListener("click", this.hideSwitchers);
      document.body.addEventListener("keydown", this.hideSwitchers);
    }
  }

  hideSwitchers(event) {
    if (event.code !== "Escape" && event.type !== "click") return;
    this.setState({
      isCurrencySwitcherVisible: false,
      isBagVisible: false,
    });
  }

  showBag(event) {
    event.stopPropagation();
    this.setState({
      isBagVisible: !this.state.isBagVisible,
      isCurrencySwitcherVisible: false,
    });
  }

  showCurrency(event) {
    event.stopPropagation();
    this.setState({
      isCurrencySwitcherVisible: !this.state.isCurrencySwitcherVisible,
      isBagVisible: false,
    });
  }

  render() {
    if (
      !this.props.categories ||
      !this.props.currencies ||
      !this.props.currentCurrency
    ) {
      return <div>Loading...</div>;
    }
    const categoryNames = this.props.categories.map(
      (category) => category.name
    );
    if (!categoryNames.includes(this.props.categoryId)) {
      return <Navigate to={"/categories/" + categoryNames[0]} />;
    }
    return (
      <>
        <header className="header">
          <div className="header__content">
            <div className="header__filters">
              {this.props.categories.map((category, index) => {
                return (
                  <Link
                    key={index}
                    to={"/categories/" + category.name}
                    className={classNames("header__filter-btn", {
                      "header__filter-btn_active":
                        this.props.categoryId === category.name,
                    })}
                  >
                    {category.name}
                  </Link>
                );
              })}
            </div>
            <div className="header__logo"></div>
            <div className="header__menu">
              <DropDownCurrency
                hideSwitchers={this.hideSwitchers}
                isCurrencySwitcherVisible={this.state.isCurrencySwitcherVisible}
                showCurrency={this.showCurrency}
                currentCurrencySymbol={this.props.currentCurrency.symbol}
              />
              <DropDownCart
                isBagVisible={this.state.isBagVisible}
                hideSwitchers={this.hideSwitchers}
                showBag={this.showBag}
                cartItemsQuantity={this.props.cartItemsQuantity}
              />
            </div>
          </div>
        </header>
      </>
    );
  }
}

const mapDispathToProps = {
  loadCategoryNamesAndCurrencies: loadCategoryNamesAndCurrencies,
};

const mapStateToProps = (state) => {
  const categoryId = state.router.location.pathname.split("/")[2];
  const categories = state.clothingStoreData.categories;
  const currencies = state.clothingStoreData.currencies;
  const currentCurrency = state.clothingStoreData.currentCurrency;
  const cartItemsQuantity = state.clothingStoreData.cartItemsQuantity;

  return {
    currentCurrency,
    cartItemsQuantity,
    categoryId,
    categories,
    currencies,
  };
};
export default connect(mapStateToProps, mapDispathToProps)(Header);
