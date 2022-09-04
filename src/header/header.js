import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./header.css";
import classNames from "classnames";
import DropDownCart from "./dropDownCart/dropDownCart.js";
import DropDownCurrency from "./dropDownCurrency/dropDownCurrency.js";

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
    return (
      <>
        <header className="header">
          <div className="header__content">
            <div className="header__filters">
              <Link
                to="/categories/all"
                className={classNames("header__filter-btn", {
                  "header__filter-btn_active": this.props.categoryId === "all",
                })}
              >
                all
              </Link>
              <Link
                to="/categories/clothes"
                className={classNames("header__filter-btn", {
                  "header__filter-btn_active":
                    this.props.categoryId === "clothes",
                })}
              >
                clothes
              </Link>
              <Link
                to="/categories/tech"
                className={classNames("header__filter-btn", {
                  "header__filter-btn_active": this.props.categoryId === "tech",
                })}
              >
                tech
              </Link>
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

const mapStateToProps = (state) => {
  const categoryId = state.router.location.pathname.split("/")[2];
  const currentCurrency = state.clothingStoreData.currentCurrency;
  const cartItemsQuantity = state.clothingStoreData.cartItemsQuantity;

  return { currentCurrency, cartItemsQuantity, categoryId };
};
export default connect(mapStateToProps, null)(Header);
