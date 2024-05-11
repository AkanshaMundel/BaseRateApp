import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";
import FieldDataClass from "@src/modules/FieldData/FieldDataClass";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";
import { useState } from "react";
import LoginActions from "./actions/LoginActions";
import {Text, View} from 'react-native';
import Welcome from "./components/Welcome/Welcome";
import Tabs from "./components/Tabs/Tabs";
import Input from "@src/components/UserInput/Input/Input";
import Clickable from "@src/components/Interaction/Clickable/Clickable";
import HidePassword from "@src/assets/Icons/HidePassword";
import { useAuthContext } from "@src/auth/AuthGuard";
import SignInButton from "@src/screens/Login/components/SignInButton/SignInButton";
export interface RILogin { }
export namespace PILogin { }

export default function Login(props: RILogin) {
    const [state, setState] = useState<Login.State>({
        selectedTab: 'login',
        email: new FieldDataClass("", FieldDataService.clubValidators(
            Validators.validateNull,
            Validators.email
        )),
        password: new FieldDataClass('', Validators.validateNull),
        showPassword: true,
        loading: {
            login: AsyncStateFactory(),
        }
    });
    const actions = new LoginActions(state, setState);
    const auth=useAuthContext()
    return (
        <View
            style={{ padding: 20, paddingTop: 60 }}
            className="bg-white w-full h-full">
            <View style={{ marginBottom: 27 }}>
                <Welcome />
            </View>

            <View style={{ marginBottom: 40 }}>
                <Tabs
                    config={[
                        {
                            text: 'Login',
                            isActive: state.selectedTab === 'login',
                            onPress: () => {
                                actions.setTab('login');
                            },
                        },
                    ]}
                />
            </View>

            <View style={{ marginBottom: 20 }}>
                <Text
                    className="text-sm text-slate-700 mb-1"
                    style={{ fontFamily: 'Inter-Regular' }}>
                    Email Address
                </Text>
                <Input
                    placeHolder="Your email address"
                    placeHolderTextColor="#6B7280"
                    type="emailAddress"
                    onChange={d => {
                        actions.mutateState(p => {
                            p.email.setValue(d);
                        });
                    }}
                />
                {state.email.getError() && (
                    <Text
                        style={{
                            fontSize: 12,
                            color: 'red',
                            fontFamily: 'Inter-Regular',
                        }}>
                        {state.email.getError()}
                    </Text>
                )}
            </View>

            <View style={{ marginBottom: 24 }}>
                <Text
                    className="text-sm text-slate-700 mb-1"
                    style={{ fontFamily: 'Inter-Regular' }}>
                    Password
                </Text>
                <Input
                    placeHolder="Password"
                    placeHolderTextColor="#6B7280"
                    endIcon={
                        <Clickable
                            onPress={() => {
                                actions.mutateState(p => {
                                    p.showPassword = !p.showPassword;
                                });
                            }}>
                            <HidePassword />
                        </Clickable>
                    }
                    type={state.showPassword ? 'password' : 'none'}
                    secureTextEntry={state.showPassword}
                    onChange={d => {
                        actions.mutateState(p => {
                            p.password.setValue(d);
                        });
                    }}
                />
                {state.password.getError() && (
                    <Text
                        style={{
                            fontSize: 12,
                            color: 'red',
                            fontFamily: 'Inter-Regular',
                        }}>
                        {state.password.getError()}
                    </Text>
                )}
            </View>

            <View className="flex flex-row mb-3">
                <Text
                    className="text-sm text-slate-500 mr-2"
                    style={{ fontFamily: 'Inter-Bold' }}>
                    Note
                </Text>
                <Text
                    className="text-sm text-slate-500"
                    style={{ fontFamily: 'Inter-Light' }}>
                    Only Lohawalla's Staff are allowed here.
                </Text>
            </View>

            <View>
                <Clickable
                    compressAmount={1}
                    onPress={() => {
                        actions.login(auth.actions.login);
                    }}>
                        <SignInButton loading={state.loading.login.status === 'initialized'}/>
                </Clickable>
            </View>
        </View>
    )
}