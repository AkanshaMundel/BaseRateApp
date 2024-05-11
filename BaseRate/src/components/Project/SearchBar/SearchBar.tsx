import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";
import React, { useEffect, useRef, useState } from 'react';
import FetchSearchBarAction from "./management/actions/FetchSearchBarAction";
import {
    SafeAreaView,
    ScrollView,
    ScrollViewComponent,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import AssetIndex from "@src/assets/AssetIndex";
import Clickable from "@src/components/Interaction/Clickable/Clickable";
import Tab from "./components/Tab/Tab";
import { FlatList } from "react-native-gesture-handler";
import SearchListItem from "./components/SearchListItem/SearchListItem";
import { ScreenIndex } from "@src/globals/screenNames/ScreenName.constant";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import TableView, { Card } from "@src/screens/Body/TableviewCard";


export interface RISearchBar {
    navigator: any;
}
export namespace PISearchBar { }

export default function SearchBar({ onSearch }: any, { navigation }: any) {
    const initialState: any = {
        searchedData: {
            item: []
        },
        loading: { fetchSearchData: AsyncStateFactory() },
    };
    const [showTabBar, setShowTabBar] = useState(true);
    const [state, setState] = React.useState(initialState);
    const [data, setData] = useState('')
    const [text, setText] = React.useState('');
    const [selected, setSelected] = React.useState(false);
    const [type, setType] = React.useState<'company'>('company');
    const fetchSearchDataAction = new FetchSearchBarAction(state, setState);
    console.log("Hey State", state.searchedData);
    const value = state.searchedData
    const filteredData = Array.isArray(value) ? [...value] : [];
    const Parsed = filteredData.filter(x =>
        x.companyName.name.toLowerCase().includes(text.toLowerCase())
    );
    console.log("Initialy Callin", text);
    useEffect(() => {
        if (text.length >= 1) {
            setShowTabBar(true);
        } else {
            setShowTabBar(false);
        }
        onSearch(text);
        fetchSearchDataAction.fetchSearchData(text)
    }, [text]);
    const handleSubmit: any = () => {
        onSearch(text);
        setShowTabBar(false);
        // setShowTabBar(false)
        // setText('')
        //     if (text.length >= 1) {
        //         setShowTabBar(true);
        //     } else {
        //         setShowTabBar(false);
        //     }
        //     fetchSearchDataAction.fetchSearchData(text)
        // setShowTabBar(true)

    }
    return (
        <>
            <View style={[
                styles.container,
                {
                    backgroundColor: selected ? '#fff' : '',
                    elevation: selected ? 1 : 0,
                },
            ]}>
                <AssetIndex.SearchMagnifier />
                <TextInput
                    onFocus={() => {
                        setSelected(true);
                    }}
                    value={text}
                    onBlur={() => setSelected(false)}
                    onChangeText={text => {
                        setText(text);
                        fetchSearchDataAction.fetchSearchData(text)
                        
                    }}
                    className="text-base text-slate-700"
                    placeholder="Search"
                    placeholderTextColor={'#64748B'}
                    style={styles.input}
                    onSubmitEditing={handleSubmit}
                />
                {text && (
                    <Clickable style={{ paddingHorizontal: 8 }}
                        onPress={() => {
                            setText('');
                            onSearch('');
                        }}>
                        <AssetIndex.SearchBarCrossIcon />
                    </Clickable>
                )}
                {text && showTabBar && (
                    <View style={styles.searchAssistContainer}>
                        <View
                            className="flex flex-row bg-slate-50"
                            style={{ borderRadius: 8 }}>
                            <Tab
                                isActive={type === 'company'}
                                text="company"
                                onPress={() => {
                                    setType('company');
                                }}
                                tabItemCounts={Parsed.length}
                            />
                        </View>
                        <SafeAreaView style={{ flex: 1 }}>
                            {type === 'company' && showTabBar && (
                                <FlatList
                                    nestedScrollEnabled={true}
                                    style={{ maxHeight: 300 }}
                                    renderItem={v => (
                                        <TouchableOpacity onPress={() => {
                                            setText(v.item.companyName.name);
                                            onSearch(v.item.companyName.name);
                                            setShowTabBar(false)
                                        }}>
                                            <View style={{
                                                paddingVertical: 8,
                                                borderBottomColor: '#F8FAFC',
                                                borderBottomWidth: 1,
                                            }}>
                                                <Text style={{
                                                    fontFamily: 'Inter-SemiBold',
                                                    color: 'black',
                                                   
                                                }}>
                                                    {v.item.companyName.name}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    data={Parsed}
                                />
                            )}
                        </SafeAreaView>
                    </View>
                )}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        borderWidth: 1,
        borderColor: '#CFD3D4',
        borderRadius: 4,
        gap: 10,
        padding: 8,
        alignItems: 'center',
        position: 'relative',
        zIndex: 9999,
    },
    input: {
        flexGrow: 1,
        flexShrink: 1,
        fontFamily: 'Inter-Regular',
        padding: 0,
    },
    searchAssistContainer: {
        backgroundColor: 'white',
        zIndex: 999,
        position: 'absolute',
        top: '180%',
        left: 0,
        right: 0,
        padding: 8,
        borderRadius: 4,
        elevation: 3,
    },
});
