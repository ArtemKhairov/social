import { instance ,ResponseType, ResultCodeEnum, ResultCodeForCaptcha} from "./api";

type MeResponseType = {
  id: number;
  email: string;
  login: string;
};

type LoginResponseType = {
  userId: number;
};

export const authAPI = {
  me() {
    return instance.get<ResponseType<MeResponseType>>(`auth/me`).then(res => res.data);
  },
  login(email:string, password:string, rememberMe:boolean = false,captcha:null|string=null) {
    return instance.post<ResponseType<LoginResponseType,ResultCodeForCaptcha | ResultCodeEnum>>(`auth/login`, { email, password, rememberMe, captcha })
      .then(res=>res.data);
  },
  logout() {
    return instance.delete(`auth//login`);
  },
};