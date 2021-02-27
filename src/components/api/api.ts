import axios from "axios";
import { ProfileType } from "../../types/types";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "d0bcdc2f-f359-49d4-a26a-360d611138ff",
  },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data;
      });
  },
  follow(userId:number) {
    return instance.post(`follow/${userId}`);
  },
  unfollow(userId:number) {
    return instance.delete(`follow/${userId}`);
  },
  getProfile(userId:number) {
    console.warn("Obsolete method. Please use profileAPI.getProfile()");
    return profileAPI.getProfile(userId);
  },
};

export const profileAPI = {
  getProfile(userId:number) {
    return instance.get(`profile/` + userId);
  },
  getStatus(userId:number) {
    return instance.get(`profile/status/` + userId);
  },
  updateStatus(status:string) {
    return instance.put(`profile/status`, { status: status });
  },
  savePhoto(photoFile:any) {
    const formData = new FormData();
    formData.append("image", photoFile);

    return instance.put(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  saveProfile(profile:ProfileType) {
    return instance.put(`profile`, profile);
  },
};

export enum ResultCodeEnum{
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCaptcha{
  CaptchaIsRequired = 10,
}

type MeResponseType = {
  data: {
    id: number,
    email: string,
    login:string,
  },
  resultCode: ResultCodeEnum,
  messages:Array<string>
}

type LoginResponseType = {
  data: {
    userId:number,
  },
  resultCode: ResultCodeForCaptcha | ResultCodeEnum,
  messages:Array<string>
}

// проверка авторизации на сайте
export const authAPI = {
  me() {
    return instance.get<MeResponseType>(`auth/me`).then(res => res.data);
  },
  login(email:string, password:string, rememberMe:boolean = false,captcha:null|string=null) {
    return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha })
      .then(res=>res.data);
  },
  logout() {
    return instance.delete(`auth//login`);
  },
};

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`);
  },
};
