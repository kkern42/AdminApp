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
          newState.push({ title: item, kids: oneKid });
        });
      }
      let newnewState = items;
      console.log(newState);
      this.setState({
        items: newState
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
    this.setState({
      student: '',
      username: ''
    });
  }

  removeItem = (itemId) => {
    const itemRef = firebase.database().ref(`/Fac/${itemId}`);
    itemRef.remove();
  }

  render() {



    return (
      <div className='app'>
        <header>
          <div className='wrapper'>
            <h1>Thomas Jefferson Elementary School</h1>
          </div>
        </header>
        <div className='container'>
          <section className="add-item">
            <form onSubmit={this.handleSubmit}>
              <input type="text" name="username" placeholder="Last name of Teacher" onChange={this.handleChange} value={this.state.username} />
              <input type="text" name="student" placeholder="Students Name" onChange={this.handleChange} value={this.state.student} />
              <button style={{ fontSize: "15px" }}>Add Person</button>
            </form>
          </section>
          <section className='display-item'>
            <div className="wrapper">
              <ul>
                {this.state.items.map((item) => {
                  return (
                    <li key={item.id}>
                      <h3>{item.title}</h3>
                      {item.kids.map(x => {
                        return (
                          <div>
                            <p>{x.student}
                              <button onClick={() => this.removeItem(`/${item.title}/${x.id}`)}>Remove</button></p>
                          </div>
                        )
                      })}
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>
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