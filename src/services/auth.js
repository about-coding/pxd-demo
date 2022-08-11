/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
import { Auth, API } from 'aws-amplify';

export async function signUp(email, password, givenName, familyName) {
  try {
    await Auth.signUp({
      username: email,
      password,
      attributes: {
        given_name: givenName,
        family_name: familyName,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function confirmSignUp(email, confirmationCode) {
  try {
    await Auth.confirmSignUp(email, confirmationCode);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function signIn(email, password) {
  //   let isAdmin = false;

  try {
    const currentUser = await Auth.signIn({
      username: email,
      password,
    });

    return currentUser;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function signOut() {
  await Auth.signOut();
}

export async function getAllUsers() {
  const apiName = 'AdminQueries';
  const path = '/listUsers';
  const myInit = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
    },
  };

  try {
    return await API.get(apiName, path, myInit);
  } catch (error) {
    return error;
  }
}
