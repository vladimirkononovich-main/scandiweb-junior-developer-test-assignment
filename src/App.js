import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import Header from "./header/header.js";
import Main from "./main/main.js";
import { loadClothingStoreData } from "./redux/actions";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.categoryId) {
      this.props.loadClothingStoreData(this.props.categoryId);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.categoryId !== prevProps.categoryId) {
      this.props.loadClothingStoreData(this.props.categoryId);
    }
  }

  render() {
    if (
      this.props.categoryId !== "all" &&
      this.props.categoryId !== "clothes" &&
      this.props.categoryId !== "tech"
    ) {
      return <Navigate to="/categories/all" />;
    }
    if (this.props.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <Header />
        <Main />
      </>
    );
  }
}
const mapDispathToProps = {
  loadClothingStoreData: loadClothingStoreData,
};

const mapStateToProps = (state) => {
  const categoryId = state.router.location.pathname.split("/")[2];
  const isLoading = state.clothingStoreData.category === null;
  const clothingStoreData = state.clothingStoreData;

  return {
    categoryId,
    isLoading,
    clothingStoreData,
  };
};
export default connect(mapStateToProps, mapDispathToProps)(App);
