import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

export interface RISignInButton {
    loading?: boolean;
}

export namespace PISignInButton { }

export default function SignInButton(props: RISignInButton) {
    return (
        <View
            className="flex justify-center items-center bg-indigo-500"
            style={{ paddingVertical: 17, width: '100%', borderRadius: 10 }}>
            {props.loading ? (
                <ActivityIndicator color={'white'} size={'small'} />
            ) : (
                <Text
                    className="text-base text-white"
                    style={{ fontFamily: 'Inter-Bold' }}>
                    Log In
                </Text>
            )}
        </View>
    );
}
