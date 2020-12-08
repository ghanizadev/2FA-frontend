import axios from "axios";
import {store, actions} from "../redux/store";
import qs from "qs";

type AuthToken = {
  authorization_token: string;
  expires_in: number;
};

export default {
  async login(payload: AuthToken) {

    const body = {
      token: payload.authorization_token,
    }

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    const userDataResponse = await axios.post(process.env.SERVER_URL + "/client/get-user", qs.stringify(body), config);

    if(userDataResponse){
      const {name, email, avatar} = userDataResponse.data;

      store.dispatch(actions.setUser({name, email, avatar }));
      store.dispatch(actions.setLogged(true));
      store.dispatch(actions.setExpiresIn(payload.expires_in));
    }
  },
  async logout() {},
};
