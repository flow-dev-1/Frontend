import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./reducers/userReducer";
import jwtReducer from "./reducers/jwtReducer";
import adminReducer from "./reducers/adminReducer";
import navigationSlice from "./reducers/navigationSlice";
import feedbackSlice from "./reducers/feedbackSlice";
import userAnswersReducer from "./reducers/userAnswersReducer";

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ['navigation'],
};

const rootReducer = combineReducers({
  user: userReducer,
  auth: jwtReducer,
  admin: adminReducer,
  navigation: navigationSlice,
  feedback: feedbackSlice,
  userAnswer: userAnswersReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
