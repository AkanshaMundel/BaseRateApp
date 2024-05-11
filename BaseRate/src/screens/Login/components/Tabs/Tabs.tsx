import React, { useState } from 'react';
import {
    Pressable,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Vibration,
    View,
} from 'react-native';
import TabItem, { RITabItem } from './components/TabItem';

export interface RITabs {
    config: RITabItem[];
}

export namespace PITabs { }

export default function Tabs(props: RITabs) {

    return (
        <View
            className="rounded-full bg-slate-200 w-full flex flex-row"
            style={{ padding: 8 }}>
            {props.config.map((v, i) => (
                <View
                    key={i}
                    style={{
                        flexGrow: 1,
                        marginRight: i === props.config.length - 1 ? 0 : 8,
                    }}>
                    <TabItem {...v} key={i} />
                </View>
            ))}
        </View>
    );
}
