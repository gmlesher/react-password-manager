import React, { Component } from "react";
import Icon from "./icon";
import HorizontalLine from "./horizontal_line";

class MenuFooter extends Component {
  render() {
    const { icon_data } = this.props;
    return (
      <div className="menu-footer display-flex flex-row text-center p-3">
        <HorizontalLine />
        <div className="lockIcon w-25 mx-auto">
          <a onClick={() => this.props.handle_logout()}>
            <Icon
              specific_icon={"../../static/frontend/lock.png"}
              icon_data={icon_data}
            />
            <div>Lock</div>
          </a>
        </div>
      </div>
    );
  }
}

export default MenuFooter;
