import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ListItemCustom from './ListItemCustom';
import axios from 'axios'

export class ListComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {users: []};
  }
  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(res => {this.setState({users: res.data})})
      .catch(res => {alert(res.status)});
  }

  deleteUser(id) {
    axios.delete("https://jsonplaceholder.typicode.com/users/" + id)
      .then(res => {
        if (res.status === 200) {
          let users = this.state.users.filter(user => user.id !== id);
          this.setState({users});
        }
      })
      .catch(error => {alert(error)});
  }

  generate(element) {
    return this.state.users.map((value) =>
      React.cloneElement(element, {
        id: value.id,
        ime: value.ime
      }),
    );
  }
      
  render() {
    return (
      <div>
        <List>
          {this.state.users.map((user, index) =>  
          <ListItemCustom key={index} user={user} deleteUser={this.deleteUser.bind(this, user.id)}/> )}
        </List>
      </div>
    )
  }
}

export default ListComponent
