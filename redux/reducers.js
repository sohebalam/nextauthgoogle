import { combineReducers } from "redux"

import {
  forgotPasswordReducer,
  profileReducer,
  registerReducer,
  resetPasswordReducer,
  updateProfileReducer,
} from "./userReducers"

const reducer = combineReducers({
  register: registerReducer,
  profile: profileReducer,
  update: updateProfileReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
})

export default reducer
