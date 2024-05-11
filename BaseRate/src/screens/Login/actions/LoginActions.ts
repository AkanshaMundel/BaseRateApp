import { ServerSateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import login, { LoginData } from "../fetch/services/login";
import { Alert } from "react-native";

export default class LoginActions extends ServerSateUtils<Login.State>{
    setTab(tab: Login.Tabs) {
        this.mutateState(p => {
            p.selectedTab = tab;
        })
    }
    async login(setLoggedIn: (d: LoginData) => void) {
        let verdict = true;
        this.mutateState(p => {
            const verdict = [p.email.validate(), p.password.validate()].reduce((a, c) => a && c)
        })
        if(verdict){
            const res=await this.handleAsync(
                'login',
                ()=>login({
                    email:this.state.email.getValue(),
                    password:this.state.password.getValue(),
                }),{
                    onError:err=>{
                        if(err.response){
                            Alert.alert((err.response.data as {meta:string}).meta);
                            return;
                        }
                        Alert.alert(
                            "Some Error Occurred"
                        )
                    }
                }
            );
            if(res){
                setLoggedIn(res.data)
            }
        }
    }
}