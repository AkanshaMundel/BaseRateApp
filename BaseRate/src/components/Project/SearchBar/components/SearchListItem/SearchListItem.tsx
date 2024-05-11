import Clickable from "@src/components/Interaction/Clickable/Clickable";
import { Text, View } from 'react-native';
import SearchBar from "../../SearchBar";
import TableView from "@src/screens/Body/TableviewCard";
import React from 'react'

export interface RISearchListItem {
    assistText: string;
}


export namespace PISearchListItem { }

export default function SearchListItem(props: RISearchListItem) {
    const [clickedAssistText, setClickedAssistText] = React.useState(""); // State to store clicked assistText
    const {  assistText } = props;
    // TableView({ clickedAssistText }); 
    return (
        <Clickable onPress={() => {
            setClickedAssistText(assistText);
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
                    {assistText}
                </Text>
            </View>
        </Clickable>
    )
}