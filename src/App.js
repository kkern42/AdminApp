import withFirebaseAuth from 'react-with-firebase-auth'
//import * as firebase from 'firebase/app';
//import * as firebase from 'firebase';
import 'firebase/auth';
import firebase from './firebaseConfig';
import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      student: '',
      username: '',
      items: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  componentDidMount() {
    const itemsRef = firebase.database().ref('MrKern');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          student: items[item].student,
          user: items[item].user
        });
      }
      console.log(newState);
      this.setState({
        items: newState
      });
    });

  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('MrKern');
    const item = {
      student: this.state.student,
      user: this.state.username
    }
    itemsRef.push(item);
    this.setState({
      student: '',
      username: ''
    });
  }

  render() {
    return (
      <div className='app'>
        <header>
          <div className='wrapper'>
            <h1>School Admim</h1>
          </div>
        </header>
        <div className='container'>
          <section className="add-item">
            <form onSubmit={this.handleSubmit}>
              <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
              <input type="text" name="student" placeholder="Add Student" onChange={this.handleChange} value={this.state.student} />
              <button>Add Person</button>
            </form>
          </section>
          <section className='display-item'>
            <div className="wrapper">
              <ul>
                <li >
                  <h3>Mr. Kern</h3>
                  {this.state.items.map((item) => {
                    return (<p>{item.student}</p>);
                  })}
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default App;


{/* <ul>
                {this.state.items.map((item) => {
                  return (
                    <li key={item.id}>
                      <h3>{item.title}</h3>
                      <p>{item.user}</p>
                    </li>
                  )
                })}
              </ul> */}

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