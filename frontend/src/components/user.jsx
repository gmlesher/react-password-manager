import React, { Component } from "react";

class User extends Component {
  render() {
    const { data } = this.props;
    return (
      <ul className="list-group">
        {data.map((user) => {
          return (
            <li className="list-group-item" key={user.username}>
              {user.email}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default User;
