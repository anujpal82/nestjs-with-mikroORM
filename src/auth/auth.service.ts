import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService{
    signin(){
        return{
            msg:"I'm signin"
        }
    }

    signup(){
        return{
            msg:"I'm sign up"
        }
    }
}