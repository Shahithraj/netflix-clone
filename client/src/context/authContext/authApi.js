import axios from "axios"
import { loginSuccess ,loginStart,loginFailure} from "./AuthAction"

export const login = async (user,dispatch) => {
    dispatch(loginStart())
    try{
  const res = await axios.post(`auth/login`,user)
  dispatch(loginSuccess(res.data))
    }catch(err) {
    dispatch(loginFailure())
    }
}