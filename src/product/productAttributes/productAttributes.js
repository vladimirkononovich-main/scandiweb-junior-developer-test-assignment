import React from "react";
import "./productAttributes.css";
import classNames from "classnames";

class ProductAttributes extends React.Component {
  render() {
    if (this.props.selectedAttributes === undefined) {
      return <div>Loading...</div>;
    }

    const type = this.props.type;

    return (
      <div className={this.props.productAttrClass}>
        {this.props.productAttributes.map((attr) => {
          return (
            <React.Fragment key={attr.id}>
              <div
                className={classNames("product-attr-title", {
                  "product-attr-title_type_condensed":
                    this.props.type === "condensed",
                })}
              >
                {attr.name + ":"}
              </div>

              <div
                className={classNames("product-attr__btn-wrapper", {
                  "product-attr__btn-wrapper_type_condensed":
                    type === "condensed",
                })}
              >
                {attr.items.map((item, index) => {
                  const isSelected = this.props.selectedAttributes.some(
                    (elem) => {
                      return elem.attrId === attr.id && elem.itemId === item.id;
                    }
                  );
                  return (
                    <div
                      key={index}
                      onClick={() =>
                        this.props.changeSelectedIdHandler
                          ? this.props.changeSelectedIdHandler(attr.id, item.id)
                          : null
                      }
                      className={classNames({
                        "product-attr__btn_type_swatch": attr.type === "swatch",
                        "product-attr__btn_type_text": attr.type === "text",
                        "product-attr__btn_type_swatch_selected ":
                          isSelected && attr.type === "swatch",
                        "product-attr__btn_type_text_selected ":
                          isSelected && attr.type === "text",
                        "product-attr__btn_type_swatch_condensed":
                          type === "condensed" && attr.type === "swatch",
                        "product-attr__btn_type_text_condensed":
                          type === "condensed" && attr.type === "text",
                      })}
                      style={{ backgroundColor: item.value }}
                    >
                      {attr.type === "text" ? item.value : null}
                    </div>
                  );
                })}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  }
}

export default ProductAttributes;
