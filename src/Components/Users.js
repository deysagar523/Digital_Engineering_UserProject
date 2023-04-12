import { Component } from "react";
import "../App.css";
import Modal from "react-bootstrap/Modal";
import classes from "./Users.module.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      name: "",
      phone: "",
      email: "",
      id: "",

      currentId: "",
      currentIndex: "",
      currentName: "",
      currentEmail: "",
      currentPhone: "",
      editing: false,
      deleteEditing: false,
      totalUsers: "",
      activeUsers: "",
      sameEmail: false,
    };
  }
  onChangeNameHandler = (event) => {
    event.preventDefault();
    this.setState({ name: event.target.value });
  };
  onChangePhoneHandler = (event) => {
    event.preventDefault();
    this.setState({ phone: event.target.value });
  };
  onChangeEmailHandler = (event) => {
    event.preventDefault();
    this.setState({ email: event.target.value });
  };
  onChangeCurrentPhoneHandler = (event) => {
    event.preventDefault();
    this.setState({ currentPhone: event.target.value });
  };
  onChangeCurrentNameHandler = (event) => {
    event.preventDefault();
    this.setState({ currentName: event.target.value });
  };
  onChangeCurrentEmailHandler = (event) => {
    event.preventDefault();
    this.setState({ currentEmail: event.target.value });
  };
  onAddUserHandler = (event) => {
    event.preventDefault();
    if (
      this.state.name !== "" &&
      this.state.phone !== "" &&
      this.stateemail !== ""
    ) {
      const obj = {
        id: Number(this.state.id) + 1,
        isDeleted: false,
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
      };
      const obj1 = this.state.users.filter(
        (user) => user.email === this.state.email
      );
      //console.log(obj1);
      if (obj1.length >= 1) {
        this.setState({ sameEmail: true });
        return;
      }
      this.state.users.push(obj);
      this.setState({ name: "" });
      this.setState({ phone: "" });
      this.setState({ email: "" });
      this.setState({ id: Number(this.state.id) + 1 });
      this.setState({ totalUsers: Number(this.state.totalUsers) + 1 });
      this.setState({ activeUsers: Number(this.state.activeUsers) + 1 });
      this.setState({ users: this.state.users });
    }
  };

  onEditHandler = (user, ind) => {
    this.setState({ editing: true });
    this.setState({ currentName: user.name });
    this.setState({ currentEmail: user.email });
    this.setState({ currentPhone: user.phone });
    this.setState({ currentId: user.id });
    this.setState({ currentIndex: ind });
    //console.log(this.state.editing);
  };
  onDeleteHandler = (ind) => {
    this.setState({ deleteEditing: true });
    this.setState({ currentIndex: ind });
  };
  hideModal = (event) => {
    this.setState({ editing: false });
  };
  hideDeleteModal = (event) => {
    this.setState({ deleteEditing: false });
    this.setState({ currentIndex: "" });
  };
  hideErrorModal = (event) => {
    this.setState({ sameEmail: false });
    //this.setState({ currentIndex: "" });
  };
  onEditSubmitHandler = (event) => {
    this.setState({ editing: false });
    const newObj = {
      id: this.state.currentId,
      name: this.state.currentName,
      phone: this.state.currentPhone,
      email: this.state.currentEmail,
    };
    console.log(this.state.users[this.state.currentIndex]);
    this.state.users.splice(this.state.currentIndex, 1, newObj);
    this.setState({ users: this.state.users });
  };
  onSoftDeleteHandler = (event) => {
    let text = "Are You Sure ? You want to Soft Delete ?";
    if (window.confirm(text) == true) {
      text = "You Succesfully Deleted";

      this.state.users[this.state.currentIndex].isDeleted = true;
      this.setState({ users: this.state.users });
      this.setState({ activeUsers: Number(this.state.activeUsers) - 1 });
    } else {
      text = "You canceled!";
    }
    this.setState({ deleteEditing: false });
    alert(text);
    this.setState({ currentIndex: "" });
  };
  onHardDeleteHandler = (event) => {
    let text = "Are You Sure ? You want to Hard Delete ?";
    if (window.confirm(text) == true) {
      text = "You Succesfully Deleted";

      this.setState({ totalUsers: Number(this.state.totalUsers) - 1 });
      if (!this.state.users[this.state.currentIndex].isDeleted) {
        this.setState({ activeUsers: Number(this.state.activeUsers) - 1 });
      }
      this.state.users.splice(this.state.currentIndex, 1);

      this.setState({ users: this.state.users });
    } else {
      text = "You canceled!";
    }
    this.setState({ deleteEditing: false });
    alert(text);
    this.setState({ currentIndex: "" });
  };
  onHardDeleteAfterSoftDeleteHandler = (ind) => {
    //this.setState({ currentIndex: ind });
    let text = "Are You Sure ? You want to Hard Delete ?";
    if (window.confirm(text) == true) {
      text = "You Succesfully Deleted";
      this.setState({ deleteEditing: false });

      this.setState({ totalUsers: Number(this.state.totalUsers) - 1 });

      this.state.users.splice(this.state.currentIndex, 1);

      this.setState({ users: this.state.users });
    } else {
      text = "You canceled!";
    }
    alert(text);
    this.setState({ currentIndex: "" });
  };
  //   OnEditTaskHandler = (todo) => {
  //     this.setState({ editing: true });
  //     this.setState({ currentId: todo.id });
  //     this.setState({ currentValue: todo.name });
  //   };
  //   onEditChangeTaskHandler = (event) => {
  //     this.setState({ currentValue: event.target.value });
  //   };

  //   onEditSubmit = (event) => {
  //     this.setState({ editing: false });
  //     this.state.todos.map((todo) => {
  //       if (todo.id === this.state.currentId) {
  //         todo.name = this.state.currentValue;
  //       }
  //     });
  //   };
  //   onDeleteHandler = (ind) => {
  //     const newTodos = [...this.state.todos];
  //     newTodos.splice(ind, 1);
  //     this.setState({ todos: newTodos });
  //   };
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        const count = users.length;
        const selectedData = users.map((user) => {
          const { id, name, email, phone } = user;
          const isDeleted = false;
          return { id, name, email, phone, isDeleted };
        });
        this.setState({ users: selectedData });
        this.setState({ id: count });
        this.setState({ totalUsers: count });
        this.setState({ activeUsers: count });
      });
  }
  render() {
    return (
      <div>
        <form className={classes.input}>
          <label>Name</label>
          <input
            value={this.state.name}
            placeholder="Name"
            onChange={this.onChangeNameHandler}
            required
          ></input>
          <label>Phone</label>
          <input
            value={this.state.phone}
            placeholder="Phone"
            onChange={this.onChangePhoneHandler}
            required
          ></input>
          <label>Email</label>
          <input
            value={this.state.email}
            placeholder="Email"
            onChange={this.onChangeEmailHandler}
            required
          ></input>

          <button onClick={this.onAddUserHandler}>Add</button>
        </form>
        <div className={classes.floatcontainer}>
          <div
            class="card border-primary mb-3"
            className={classes.floatchild}
            style={{
              maxWidth: "50rem",
              textAlign: "center",
              alignItems: "center",
              margin: "5% auto",
            }}
          >
            <div
              class="card-header border-primary mb-3"
              style={{ width: "100%", backgroundColor: "#99ccff" }}
            >
              Active Users
            </div>
            <div class="card-body text-success">
              <h1>{this.state.activeUsers}</h1>
            </div>
          </div>
          <div
            class="card border-primary mb-3"
            className={classes.floatchild}
            style={{
              maxWidth: "50rem",
              textAlign: "center",
              alignItems: "center",
              margin: "5% auto",
            }}
          >
            <div
              class="card-header border-primary mb-3"
              style={{ width: "100%", backgroundColor: "#99ccff" }}
            >
              Total Users
            </div>
            <div class="card-body text-success">
              <h1>{this.state.totalUsers}</h1>
            </div>
          </div>
        </div>

        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Name </th>
              <th scope="col">Phone</th>
              <th scope="col">Email </th>
               
              <th scope="col">Action </th>
            </tr>
          </thead>

          {this.state.users.map((newUser, ind) => {
            return (
              <tbody>
                {!newUser.isDeleted && (
                  <tr>
                    <th scope="row">{newUser.id}</th>
                    
                    <td>{newUser.name} </td>
                    <td>{newUser.phone} </td>
                    <td>{newUser.email} </td>

                    <td>
                      <button
                        onClick={() => this.onEditHandler(newUser, ind)}
                        style={{ marginRight: "1rem" }}
                        class="btn btn-info"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => this.onDeleteHandler(ind)}
                        class="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )}
                {newUser.isDeleted && (
                  <tr>
                    <td>{newUser.id}</td>
                    <td>{newUser.name} </td>
                    <td>{newUser.phone} </td>
                    <td>{newUser.email} </td>

                    <td>
                      <button
                        onClick={() =>
                          this.onHardDeleteAfterSoftDeleteHandler(ind)
                        }
                        class="btn btn-danger"
                      >
                        Hard Delete
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            );
          })}
        </table>

        <Modal show={this.state.editing}>
          <Modal.Header>Update Details</Modal.Header>
          <Modal.Body>
            <div>
              <label>Name:</label>
              <div>
                <input
                  type="text"
                  value={this.state.currentName}
                  onChange={this.onChangeCurrentNameHandler}
                />
              </div>
            </div>
            <div>
              <label>Email:</label>
              <div>
                <input
                  type="text"
                  value={this.state.currentEmail}
                  onChange={this.onChangeCurrentEmailHandler}
                />
              </div>
            </div>
            <div>
              <label>Phone No.:</label>
              <div>
                <input
                  type="text"
                  value={this.state.currentPhone}
                  onChange={this.onChangeCurrentPhoneHandler}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={this.onEditSubmitHandler}>Save</button>
            <button onClick={this.hideModal}>Cancel</button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.sameEmail}>
          <Modal.Header>Error Occured</Modal.Header>
          <Modal.Body>
            <h1 style={{ color: "red" }}>Email Id Already Exists!!!</h1>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={this.hideErrorModal}>Cancel</button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.deleteEditing}>
          <Modal.Header>Delete</Modal.Header>
          <Modal.Body>
            <button
              onClick={this.onHardDeleteHandler}
              style={{ marginRight: "2rem" }}
              class="btn btn-danger"
            >
              Hard Delete
            </button>
            <button onClick={this.onSoftDeleteHandler} class="btn btn-warning">
              Soft Delete
            </button>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={this.hideDeleteModal}>Cancel</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default Users;
