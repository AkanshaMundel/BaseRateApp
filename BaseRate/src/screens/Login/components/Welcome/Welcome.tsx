import { ImageIndex } from '@src/assets/AssetIndex';
import React from 'react';
import { Image, Text, View } from 'react-native';

export interface RIWelcome { }

export namespace PIWelcome { }

export default function Welcome(props: RIWelcome) {
    return (
        <View>
            <View className="flex flex-row items-center">
                <View>
                    <Text
                        className="text-black text-sm mr-2"
                        style={{ fontFamily: 'Inter-Light' }}>
                        Welcome to
                    </Text>
                </View>
                <View>
                    <Image source={ImageIndex.HelloHandSrc} />
                </View>
            </View>
            <View>
                <Text
                    className="text-3xl text-slate-800"
                    style={{ fontFamily: 'Inter-Bold' }}>
                    Lohawalla
                </Text>
            </View>
        </View>
    );
}
