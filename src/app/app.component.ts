import { Component , OnInit, Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {error} from 'util';
import {BehaviorSubject} from 'rxjs';
import {variable} from '../../node_modules/@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class AppComponent {
  public buttonData: String = 'Signup!';
  public resetLinkClicked: Boolean = false;
  public temp:any;
  public notifier=new BehaviorSubject<any>(this.temp);
  public config: any =
    {
      //enter your config 
    };

  constructor() {
    firebase.initializeApp(this.config);
    // firebase.auth().onAuthStateChanged(function (user) {
    //   if (user) {
    //     alert('Thankyou for login');
    //   } else {
    //     alert('Nouser signed');
    //   }
    // });
  }

  toggle() {
    this.buttonData = (this.buttonData === 'Signup!') ? 'Login' : 'Signup!';
    this.resetLinkClicked = false;
  }

  register() {
    const email = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    if (email.trim().length > 0 && password.length > 0) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function () {
          this.buttonData="Signup!";
          }.bind(this)
          )
        .catch(function (error)
        {
        alert('The following problem has occured while register :' + error.code + ' message ' + error.message);
        });
        }
    else
      {
      alert('Enter valid credentials');
      }
  }
  login() {
    const email = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    if (email.trim().length > 0 && password.length > 0) {
      firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
        alert('Login succeessfull ');
      }.bind(this)).catch(function (error) {
        alert('The following problem has occured while register :' + error.code + ' message ' + error.message);

      });


    } else {
      alert('Enter valid credentials');
    }
  }
  resetPassword() {
    const email = document.getElementById('resetEmail').value;
    firebase.auth().sendPasswordResetEmail(email).then(function () {
      alert('Link sent to email');
      this.resetLinkClicked = false;
    }.bind(this))
    .catch(function (error) {
      alert(error.code + ' ' + error.message);
    });
  }

}
