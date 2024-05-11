import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '@src/screens/Login/Login';
import LoadingScreen from '@src/components/loading/LoadingScreen/LoadingScreen';
import RoleIndex from './RoleIndex';

export interface RIAuthGuard {
    children: React.ReactNode;
}

export namespace PIAuthGuard { }

interface AuthContextValue {
    authData: Auth.LoginData;
    actions: {
        logout: () => void;
        login: (data: Auth.LoginData) => void;
    };
}

const AuthContext = React.createContext<AuthContextValue>(
    {} as AuthContextValue,
);
export const useAuthContext = () => useContext(AuthContext);

export default function AuthGuard(props: RIAuthGuard) {
    const { children } = props;

    const [loading, setLoading] = useState(true);
    const [state, setState] = useState<Auth.LoginData | null>(null);
    console.log("HEy i MA State",state);
    useEffect(() => {
        (async () => {
            const loginData = await AsyncStorage.getItem('auth');
            if (loginData) {
                const loginDataParsed = JSON.parse(loginData) as Auth.LoginData;
                if (loginDataParsed.loginData.maxAge <= Date.now()) {
                    await AsyncStorage.removeItem('auth');
                    return;
                }
                setState(loginDataParsed);
            }
            setLoading(false);
        })();
    }, []);

    if (loading) {
        return <LoadingScreen />;
    }

    if (state)
        return (
            <AuthContext.Provider
                value={{
                    authData: state,
                    actions: {
                        logout: () => {
                            (async () => {
                                await AsyncStorage.removeItem('auth');
                                setState(null);
                            })();
                        },
                        login: d => {
                            (async () => {
                                await AsyncStorage.setItem('auth', JSON.stringify(d));
                                setState(d);
                            })();
                        },
                    },
                }}>
                {children}
            </AuthContext.Provider>
        );

    return (
        <AuthContext.Provider
            value={{
                authData: {
                    token: '',
                    loginData: {
                        success: false,
                        userId: '',
                        createdAt: 0,
                        maxAge: 0,
                        role: RoleIndex.SALES,
                        name: '',
                        email: '',
                        phoneNumber: '',
                        image: '',
                    },
                },
                actions: {
                    logout: () => {
                        setState(null);
                    },
                    login: d => {
                        (async () => {
                            await AsyncStorage.setItem('auth', JSON.stringify(d));
                            setState(d);
                        })();
                    },
                },
            }}>
            <Login />
        </AuthContext.Provider>
    );
}
