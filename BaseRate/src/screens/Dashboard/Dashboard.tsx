import { FlatList, StyleSheet, Text, View, TextInput, RefreshControl, Image, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback } from 'react-native'
import Clickable from '@src/components/Interaction/Clickable/Clickable';
import { useAuthContext } from '@src/auth/AuthGuard';
import Navbar from '@src/components/Project/Navbar/Navbar';
import React, { useEffect, useState } from 'react';
import SearchBar from '@src/components/Project/SearchBar/SearchBar';
import ToggleSwitch from 'toggle-switch-react-native';
// import TableViewCard from '../Body/TableviewCard';

// import TableviewTable from '../Body/TableviewTable';
import FlashMessage from 'react-native-flash-message';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import { Dialog, ALERT_TYPE } from 'react-native-alert-notification';
import { showMessage } from 'react-native-flash-message';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { ImageIndex } from '@src/assets/AssetIndex';



export interface RIDashboard { }
export namespace PIDashboard { }
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
    console.log("iseddited", isEditEnabled)
    console.log(":editedCost", editedCost)
    console.log("apiicalling", apiCallFinished)
    console.log("editingcost", editingCost)
    useEffect(() => {
        setEditedCost(item.cost.toString()); // Update editedCost when item changes
    }, [item]);

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
            <Image style={styles.image1} source={{ uri: item.companyName.imageURL }} />
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
                    <TouchableOpacity style={{ marginLeft: '10%' , }} onPress={() => updateCost(item)}>
                        {isEditEnabled ? (
                        //     <Image
                        //     style={{
                        //         backgroundColor: 'green', // Change the background color based on edit status
                        //         width: 30,
                        //         height: 30,
                        //         borderRadius: 6,
                        //     }}
                        //     source={ImageIndex.check}
                        // />
                        <Feather
                        name="check-circle"
                        size={20}
                        color={'green'}
                      
                    />
                        ) : <Feather
                        name="check-circle"
                        size={20}
                        color={'gray'}
                      
                    />}

                    </TouchableOpacity>

                    
                </View>
            </View>
        </View>
    );
});



const VirtualizedList = ({
    children,
    style,
}: {
    children: React.ReactNode;
    style: object;
}) => {
    return (
        <FlatList
            data={[]}
            style={style}
            keyExtractor={() => 'key'}
            renderItem={null}
            ListHeaderComponent={<>{children}</>}
        />
    );
};
const Dashboard = ({ navigation }: any) => {
    const auth = useAuthContext();
    const [toggle, setToggle] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState<any>([]);
    const [apiCallFinished, setApiCallFinished] = useState(false); // Flag to track API call completion
    const [filteredData, setFilteredData] = useState([]);
    const [editedItems, setEditedItems] = useState<Array<Item>>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const setRefresh = (value: boolean) => {
        setRefreshing(value);
    };
    const fetchData = async () => {
        try {
            const API_URL = 'https://www.lohawalla.com/purchaser/pages/setBasicPrice/getBasicPrice';
            const response = await axios.get(API_URL);
            const data = response.data;
            console.log("data-----------------------------------", data)
            // setData(data)
            // await AsyncStorage.setItem('Base', JSON.stringify(data));
            setData(data); // Set the fetched data
            setApiCallFinished(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
console.log("editeeeeeeeeeeeeeeeeeeeeeeeeee", editedItems)
    useEffect(() => {

        fetchData(); // Fetch data on mount
    }, [refreshing, searchQuery]);
    console.log("seccdata", data);


    const searchData = (searchQuery: any) => {
        if (!searchQuery) {
            return data; // Return all data if no search query
        }
        searchQuery = searchQuery.toLowerCase(); // Convert the search query to lowercase for case-insensitive search
        return data.filter((item: any) => {
            const name = item.companyName.name.toLowerCase();

            return name.includes(searchQuery)
        });
    };
    const searchResults = searchData(searchQuery)


    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }
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
        console.log("chhhhhhecjkll", updatedItem)
        setEditedItems(prevEditedItems => [...prevEditedItems, updatedItem]);
    };

    // const handleToggle = () => {

    //     setToggle(!toggle);
    // };
    return (
        <>
            <View style={{ zIndex: 2000000 }}>
                <View>
                    <Navbar screenName={'Dashboard'}
                        goBack={function (): void {
                            navigation.goBack();
                        }} />
                </View>
                <View style={styles.body}>
                    <VirtualizedList style={styles.container1}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ marginBottom: 20 }} >
                                <Text
                                    className="text-xl text-slate-700 "
                                    style={{ fontFamily: 'Inter-Medium' }}>
                                    Welcome Back!
                                </Text>
                                <Text className="text-xs"
                                    style={{ fontFamily: 'Inter-Regular', color: '#969393' }}>
                                    Hello {auth.authData.loginData.name}
                                </Text>
                            </View>
                            <View >
                                {/* <ToggleSwitch
                                    isOn={toggle}
                                    onColor="#414EF1"
                                    offColor="#B0B0B0"
                                    size="small"
                                    onToggle={handleToggle}
                                    label="Table View"
                                    labelStyle={{ color: "black", fontWeight: "600" }}
                                /> */}
                            </View>
                        </View>
                    </VirtualizedList>
                    <View >
                        <Text style={{ color: 'black', fontWeight: '700' }}
                            className="text-lg text-black">Base Pricing</Text>
                    </View>

                    {/* <View style={{ marginBottom: 1, zIndex: 2000 }}>
                        <SearchBar onSearch={(searchText: any) => setSearchText(searchText)} />
                    </View> */}

                    <View style={styles.searchBarContainer}>
                        <Feather
                            name="search"
                            size={18}
                            color={'black'}
                            style={styles.searchIcon}
                        />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search by companyName..."
                            onChangeText={text => setSearchQuery(text)}
                            value={searchQuery}
                            placeholderTextColor="gray"
                        />
                    </View>

                </View>
                <View style={{ maxHeight: "65%", }}>
                    <FlatList
                        style={styles.container}
                        data={searchResults}
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


            </View >
        </>

    )
}

export default Dashboard

const styles = StyleSheet.create({
    container1: {
        width: '100%',
        // height: '92%',
        // backgroundColor: 'orange',
    },
    navbar: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.05)',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: 'white',
    },
    image1: {
        width: 32,
        height: 32,
        borderRadius: 200,
        objectFit: 'cover',
    },
    body: {
        padding: 20,
        backgroundColor: 'white',
    },
    popularSearchCard: {
        padding: 14,
        borderRadius: 10,
        marginBottom: 20,
    },
    searchBarContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#DEDEDE',
        //   paddingVertical: '1%',
        marginLeft: '4%',
        //height:"10%"
    },
    searchIcon: {
        fontSize: 16,
        marginRight: 10,
        color: '#333',

    },
    searchInput: {
        fontSize: 16,
        height: 48,
        flex: 1,
        color: 'black',
    },
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