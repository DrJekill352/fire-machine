import { observable, action, runInAction } from 'mobx';
import { app } from 'firebase.config';
import firebase from 'firebase';

export class AuthStore {
  @observable public user: firebase.User | null = null;

  public constructor() {
    this.init();
  }

  @action public init = () => {
    firebase.auth().onAuthStateChanged(user => {
      runInAction(() => (this.user = user));
    });
  };

  @action public login = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    await app.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const result = await app.auth().signInWithPopup(googleProvider);
    runInAction(() => (this.user = result.user));
  };

  @action public logout = async () => {
    await app.auth().signOut();
    runInAction(() => (this.user = null));
  };
}
