import {call, put, takeLatest, all} from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

function* apiSideEffect(action) {
  try {
    // 1. call Api
    console.log('- 1. Saga: PRESSBTNLOGIN');
    const apiData = yield call(() =>
      axios.post('http://192.168.1.13:3000/login', {
        email: 'admin',
        password: 'admin',
      }),
    );
    console.log('0. saga: ' + apiData.data.access_token);
    // 2. store token
    yield AsyncStorage.multiSet([
      ['token', apiData.data.access_token],
      ['isLoggined', apiData.data.isLoggined.toString()],
    ]);
    // 3. put login true
    yield put({type: 'LOGIN'}); //, payload: apiData.data
  } catch (e) {
    console.log('1 .saga: ' + e);
    yield put({type: '', payload: e.message});
  }
}
function* logoutSideEffect(action) {
  try {
    yield AsyncStorage.multiRemove(['token', 'isLoggined']);
    yield put({type: 'LOGOUT'}); //, payload: apiData.data
  } catch (error) {
    console.log('logoutSideEffect err: ' + error);
  }
}

// the 'watcher' - on every 'API_BUTTON_CLICK' action, run our side effect
// export function* apiSaga() {
//   yield takeEvery('PRESSBTNLOGIN', apiSideEffect);
// }

function* apiSaga() {
  yield takeLatest('PRESSBTNLOGIN', apiSideEffect);
  yield takeLatest('PRESSBTNLOGOUT', logoutSideEffect);
}
export default function* rootSaga() {
  yield all([apiSaga(), apiSideEffect()]);
}
