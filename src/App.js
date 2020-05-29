import withFirebaseAuth from 'react-with-firebase-auth'
//import * as firebase from 'firebase/app';
//import * as firebase from 'firebase';
import 'firebase/auth';
import firebase from './firebaseConfig';
import React, { Component } from 'react';
import './App.css';
import DropdownButton from 'react-bootstrap/DropdownButton'

const Display = (props) => {
  return (
    <div className='container'>
      <section className="add-item" style={{ padding: "30px 18px", height: "250px" }}>
        <form>
          <h2 style={{ fontWeight: "bold", marginBottom: "15px" }}>Add Students{" & "}Teachers</h2>
          <input type="text" name="username" placeholder="Name of Group" onChange={props.handleChange} value={props.username} />
          <input type="text" name="student" placeholder="Students/Teachers Name" onChange={props.handleChange} value={props.student} />
          <button style={{ fontSize: "15px" }} onClick={props.handleSubmit}>Add Student</button>
        </form>
      </section>
      <section className='display-item'>
        <div className="wrapper" style={{ display: "flex", flexWrap: "wrap", justifyContent: "left" }}>
          {props.items.map((item) => {
            return (
              <ul>
                {
                  ((props.filter === item.name) || props.all) && [
                    <li key={item.id}>
                      {/* add 's class */}
                      <h3>{item.title}</h3>
                      {item.kids.map(x => {
                        return (
                          <p >{x.student}
                            <button onClick={() => props.removeItem(`/${item.title}/${x.id}`)}>Remove</button></p>
                        )
                      })}
                    </li>
                  ]
                }
              </ul>
            )
          })}
        </div>
      </section>
    </div>
  );
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      student: '',
      username: '',
      items: [],
      filter: "class",
      all: false,
      user: '',
      password: '',
      admins: [],
      login: false,
    }
  }

  helpName = (name) => {
    if (name === "All Students") {
      return "students"
    }
    else if (name == "All Teachers") {
      return "teachers"
    }
    else {
      return "class"
    }

  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('Fac');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        const itemsRef = firebase.database().ref('Fac').child(item);
        itemsRef.on('value', (snapshot) => {
          let kids = snapshot.val();
          let oneKid = [];
          for (let kid in kids) {
            oneKid.push({
              id: kid,
              student: kids[kid].student,
              user: kids[kid].user
            });
          }
          let newName = this.helpName(item);
          newState.push({ title: item, name: newName, kids: oneKid });
        });
      }
      let newnewState = items;
      console.log(newState);
      this.setState({
        items: newState
      });
    });

    const loginsRef = firebase.database().ref('Login');
    loginsRef.on('value', (snapshot) => {
      let logins = snapshot.val();
      let newlogins = [];
      for (let item in logins) {
        newlogins.push({ id: item, user: logins[item].usersname, password: logins[item].password });
      }
      console.log(newlogins);
      this.setState({
        admins: newlogins,
      });
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const itemsRef = firebase.database().ref('Fac').child(this.state.username);
    const item = {
      student: this.state.student,
      user: this.state.username
    }

    itemsRef.push(item);
    //will also add student to total student list 
    const allRef = firebase.database().ref('Fac').child('All Students');
    const all = {
      student: this.state.student,
      user: this.state.username
    }

    allRef.push(all);
    this.setState({
      student: '',
      username: ''
    });
  }

  handleLogin = (e) => {
    e.preventDefault();
    console.log("here")
    console.log(this.state.user, this.state.password);
    console.log(this.state.admins);
    //this works to create a new admin
    // const itemsRef = firebase.database().ref('Login');
    // const item = {
    //   usersname: this.state.user,
    //   password: this.state.password,
    // }
    // itemsRef.push(item);
    // this.setState({
    //   user: '',
    //   password: ''
    // });
    let temp = this.state.admins;
    for (let admin in temp) {
      if ((this.state.user === temp[admin].user) && (this.state.password === temp[admin].password)) {
        this.setState({
          login: true,
        });
      }
    }
    // return (
    //   <div>
    //     Inccorect User Name or Password
    //   </div>
    // );

  }

  removeItem = (itemId) => {
    const itemRef = firebase.database().ref(`/Fac/${itemId}`);
    itemRef.remove();
  }
  changeFilter = (setFilter) => {
    if (setFilter === "all") {
      this.setState({
        all: true,
      });
    }
    else {
      this.setState({
        filter: setFilter,
        all: false
      });
    }
    return (false);
  }
  render() {
    return (
      <div className='app' >
        <header>
          <div className='wrapper'>
            <h1> 	&#128214; Thomas Jefferson Elementary School</h1>
            <button style={{ fontWeight: "bold", fontSize: "12px", width: "140px", marginRight: "20px", marginLeft: "50px" }} type="button" onClick={() => this.changeFilter("students")}>Display Students</button>
            <button style={{ fontWeight: "bold", fontSize: "12px", width: "140px", marginRight: "20px" }} type="button" onClick={() => this.changeFilter("teachers")}>Display Teachers</button>
            <button style={{ fontWeight: "bold", fontSize: "12px", width: "140px", marginRight: "20px" }} type="button" onClick={() => this.changeFilter("class")}>Display Classes</button>
            <button style={{ fontWeight: "bold", fontSize: "12px", width: "140px", marginRight: "20px" }} type="button" onClick={() => this.changeFilter("all")} >Display All</button>
          </div>
        </header>
        <div>
          {
            this.state.login && [
              <Display
                username={this.state.username}
                student={this.state.student}
                items={this.state.items}
                filter={this.state.filter} all={this.state.all}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                removeItem={this.removeItem}
              />
            ]
          }
        </div>
        <div>
          {
            !this.state.login && [
              <section className="add-item" style={{ marginLeft: "39vw", marginTop: "100px", padding: "30px 18px", height: "250px" }}>
                <form>
                  <h2 style={{ fontWeight: "bold", marginBottom: "15px" }}>Welcome!</h2>
                  <input type="text" name="user" placeholder="Username" onChange={this.handleChange} value={this.state.user} />
                  <input type="text" name="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} />
                  <button style={{ fontSize: "15px" }} onClick={this.handleLogin}>Login</button>
                </form>
              </section>
            ]
          }
        </div>
      </div>
    );
  }
}

const firebaseAppAuth = firebase.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),

};



export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);




// class App extends Component {

//   // componentDidMount() {
//   //   var userInfo = {
//   //     name: \,
//   //   }; //user info
//   //   firebaseApp.database().ref('student').push(userInfo);

//   //   this.pnm.value = ''; // <- clear the input
//   //   this.fno.value = '';
//   // }

//   componentDidMount() {
//     console.log("hey");
//     const rootRef = firebase.database().ref().child('react');
//     const speedRef = rootRef.child('users')
//     speedRef.on('value', snap => {
//       return (this.props.user);
//     });
//   }

//   render() {
//     const {
//       user,
//       signOut,
//       signInWithGoogle,
//     } = this.props;
//     //   var userInfo = {
//     //     billing_name : this.pnm.value,
//     //     billing_flat : this.fno.value,
//     //   }; //user info
//     // DbConfig.database().ref('billing').push(userInfo);

//     // this.pnm.value = ''; // <- clear the input
//     // this.fno.value = ''; 



//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           {
//             user
//               ? <p>Hello, {user.displayName}</p>
//               : <p>Please sign in.</p>
//           }
//           {
//             user
//               ? <button onClick={signOut}>Sign out</button>
//               : <button onClick={signInWithGoogle}>Sign in with Google</button>
//           }
//         </header>
//       </div>
//     );
//   }
// }



// const firebaseAppAuth = firebase.auth();

// const providers = {
//   googleProvider: new firebase.auth.GoogleAuthProvider(),

// };



// export default withFirebaseAuth({
//   providers,
//   firebaseAppAuth,
// })(App);