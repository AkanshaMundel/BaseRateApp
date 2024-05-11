
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert, RefreshControl, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ImageIndex } from '@src/assets/AssetIndex';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clickable from '@src/components/Interaction/Clickable/Clickable';
import { useAuthContext } from '@src/auth/AuthGuard';
import { showMessage } from 'react-native-flash-message';
import { Dialog,ALERT_TYPE } from 'react-native-alert-notification';

interface CardProps {
    item: any;
    apiCallFinished: boolean;
    clickedAssistText?: string;
    updateEditedItems?: (updatedItem: Item) => void;
    editedItems?: Item[];
    setRefresh: any;
}
interface Item {
    id?: number;
    cost?: number;
    // Other properties...
}
const VirtualizedList = ({
    children,
    style
}: {
    children: React.ReactNode;
    style?: object
}) => {
    return (
        <FlatList
            data={[]}
            keyExtractor={() => 'key'}
            renderItem={null}
            ListHeaderComponent={<>{children}</>}
            refreshControl={<>{children}</>}
        />
    );
};
export const Card: React.FC<CardProps> = React.memo(({ item, apiCallFinished, clickedAssistText, updateEditedItems, editedItems, setRefresh }) => {
    console.log("i am waiting for card", item);
    const [showDescription, setShowDescription] = useState(false);
    const [editingCost, setEditingCost] = useState(false);
    const [editedCost, setEditedCost] = useState(item.cost.toString());
    const isEditEnabled = editedCost !== item.cost.toString(); // Check if user edited the cost
    const [refreshing, setRefreshing] = useState(false)
    const auth = useAuthContext()
    console.log("I am Auth", auth);
    const toggleDescription = () => {
        setShowDescription(!showDescription);
    };
    console.log("oooooyeahhh", editedItems);

    const startEditing = () => {
        if (apiCallFinished) { // Only allow editing if API call has finished
            setEditedCost(item.cost.toString());
            setEditingCost(true);
        }
    }
    const updateCost = async (item: any) => {
        setEditingCost(false);
        const updatedItem = {
            ...item,
            cost: parseFloat(editedCost),
        };
        console.log("Ia1234568420", updatedItem);
        const formedData = {
            "list": [{
                "priceFieldId": updatedItem.priceFieldId,
                "value": updatedItem.cost
            }],
            "by": {
                "name": auth.authData.loginData.name,
                "userId": auth.authData.loginData.userId
            }
        }
        try {
            setRefresh(true);
            setRefreshing(true)
            const update = await axios.post(`https://www.lohawalla.com/purchaser/pages/setBasicPrice/saveBasicPrice`, formedData)
            // showMessage({
            //     message: "Data saved successfully",
            //     type: "success",
            //     duration: 5000,
            //     style: { borderRadius: 50 }
            // })
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: 'Congrats! Data Updated Successfully!',
                button: 'close',
                
            })
            if (updateEditedItems) {
                updateEditedItems(updatedItem);
            }
            setRefresh(false);
            setRefreshing(false)
        } catch (error) {
            showMessage({
                message: "Failed to update",
                type: "danger",
                duration: 5000,
                style: { borderRadius: 50 }
            })
        }

    }
    if (refreshing) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Updating...</Text>
            </View>
        );
    }
    return (
        <View style={styles.card}>
            <Image style={styles.image} source={{ uri: item.companyName.imageURL }} />
            <View style={styles.cardContent}>
                <View style={styles.header}>
                    <Text style={styles.companyName}>{item.companyName.name}</Text>

                </View>
                <Text style={styles.description}>
                    {showDescription ? item.description : item.description.substring(0, 30)}
                </Text>
                <TouchableOpacity onPress={toggleDescription}>
                    <Text style={styles.readMore}>{showDescription ? 'Read Less' : 'Read More'}</Text>
                </TouchableOpacity> 
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    {editingCost ? (
                        <TouchableWithoutFeedback>
                            <TextInput
                                style={styles.priceContainer}
                                value={editedCost}
                                onChangeText={text => setEditedCost(text)}
                            />
                        </TouchableWithoutFeedback>
                    ) : (
                        <View style={styles.priceContainer}>
                            <TouchableOpacity onPress={startEditing}>
                                <Text style={styles.price}> {editedCost}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => updateCost(item)}>
                        {isEditEnabled? (<Image
                            style={{
                                backgroundColor:  'green', // Change the background color based on edit status
                                width: 30,
                                height: 30,
                                borderRadius: 6,
                            }}
                            source={ImageIndex.check}
                        />):null}
                        
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
});

const TableView = ({ searchText }: any) => {
    const [data, setData] = useState<any>([]);
    const [apiCallFinished, setApiCallFinished] = useState(false); // Flag to track API call completion
    const [filteredData, setFilteredData] = useState([]);
    const [editedItems, setEditedItems] = useState<Array<Item>>([]);
    const [refreshing, setRefreshing] = useState(false);
    const setRefresh = (value: boolean) => {
        setRefreshing(value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const API_URL = 'https://www.lohawalla.com/purchaser/pages/setBasicPrice/getBasicPrice';
                const response = await axios.get(API_URL);
                const data = response.data;
                setData(data)
                await AsyncStorage.setItem('Base', JSON.stringify(data));
                setData(data); // Set the fetched data
                setApiCallFinished(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Fetch data on mount
    }, [refreshing]);
   
    const handleRefresh = async () => {
        // Place your data fetching logic here
        try {
            const API_URL = 'https://www.lohawalla.com/purchaser/pages/setBasicPrice/getBasicPrice';
            const response = await axios.get(API_URL);
            const data = response.data;
            setData(data)
            await AsyncStorage.setItem('Base', JSON.stringify(data));
            setData(data); // Set the fetched data
            setApiCallFinished(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        // Simulate data fetching with a delay (remove this in your actual implementation)
        setTimeout(() => {
            // Update the data if needed

            // Step 4: After data fetching is complete, set refreshing to false
            setRefreshing(false);
        }, 1000); // Adjust the delay as needed
    };
    useEffect(() => {
        const getDataFromStorage = async () => {
            try {
                const dataFromStorage = await AsyncStorage.getItem('Base');

                if (dataFromStorage !== null) {
                    

                    const parsedData = JSON.parse(dataFromStorage);
                    console.log("asynnnc data", parsedData)
                    // setData(parsedData); // Set the data from storage
                } else {
                    console.log('Data not found in AsyncStorage');
                }
            } catch (error) {
                console.error('Error getting data from storage:', error);
            }
        };

        getDataFromStorage(); // Fetch data from storage after the first useEffect
    }, []);

    useEffect(() => {
        // Filter data based on clickedAssistText
        if (searchText) {
            const filtered = data.filter((item: any) => (
                item.companyName.name.toLowerCase().includes(searchText.toLowerCase())
            ));
            setFilteredData(filtered);
        } else {
            setFilteredData(data); // If searchText is empty, show all data
        }
    }, [searchText, data]);
    // console.log("I am Filtered Out Dtaa", filteredData);

    const renderSkeletonItem = () => {
        const skeletonCount = 50; // Number of times to repeat the skeleton item
        const skeletonItems = Array.from({ length: skeletonCount }, (_, index) => (
            <SkeletonPlaceholder key={index}>
                <View style={{ padding: 12 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: '100%', height: 100, borderRadius: 4 }} />
                    </View>
                </View>
            </SkeletonPlaceholder>
        ));

        return skeletonItems;
    };
    const updateEditedItems = (updatedItem: Item) => {
        setEditedItems(prevEditedItems => [...prevEditedItems, updatedItem]);
    };
    return (
        <View style={{ maxHeight: "65%",}}>
            <FlatList
                style={styles.container}
                data={filteredData}
                ListEmptyComponent={renderSkeletonItem}
                keyExtractor={(item, index) => index.toString()}
                // Attach the RefreshControl directly to the FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
                renderItem={({ item }) => (
                    <Card
                        item={item}
                        apiCallFinished={apiCallFinished}
                        updateEditedItems={updateEditedItems}
                        editedItems={editedItems}
                        setRefresh={setRefresh}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 30,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        elevation: 1,
        marginLeft: '5%',
        marginRight: '5%',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    cardContent: {
        marginLeft: 20,
        justifyContent: 'center',

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    companyName: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
    },
    readMore: {
        color: 'black',
        fontSize: 12,
    },
    description: {
        fontSize: 14,
        marginBottom: 5,
        color: '#000000BF',
        fontWeight: '400'
    },
    priceContainer: {
        backgroundColor: 'white',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 3,
        alignSelf: 'flex-start',
        borderWidth: 0.3,
        borderColor: 'black',
        marginTop: 3,
        color: 'black'
    },
    price: {
        fontSize: 14,
        color: 'black'
    },
    container: {
        width: '100%',
        height: '500%',
        backgroundColor: 'white',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TableView;
