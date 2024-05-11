import { StyleSheet, TextInput, View } from 'react-native';

export interface RIInput {
    isValid?: boolean;
    error?: string;
    value?: string;
    onChange?: (d: string) => void;
    onBlue?: () => void;
    endIcon?: React.ReactNode;
    placeHolder?: string;
    placeHolderTextColor?: string;
    type?:
    | 'none'
    | 'URL'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'creditCardNumber'
    | 'emailAddress'
    | 'familyName'
    | 'fullStreetAddress'
    | 'givenName'
    | 'jobTitle'
    | 'location'
    | 'middleName'
    | 'name'
    | 'namePrefix'
    | 'nameSuffix'
    | 'nickname'
    | 'organizationName'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'sublocality'
    | 'telephoneNumber'
    | 'username'
    | 'password'
    | 'newPassword'
    | 'oneTimeCode'
    | undefined;
    secureTextEntry?: boolean
}

export namespace PIInput { }
export default function Input(props: RIInput) {
    return (
        <View className="flex flex-row" style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={props.placeHolder}
                placeholderTextColor={props.placeHolderTextColor}
                textContentType={props.type}
                secureTextEntry={props.secureTextEntry}
                onChangeText={d => {
                    props.onChange && props.onChange(d);
                }}
            />
            {props.endIcon ? (
                <View className="flex justify-center" style={{ marginHorizontal: 4 }}>
                    <>{props.endIcon}</>
                </View>
            ) : (
                <></>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        borderColor: '#D8DADC',
        borderWidth: 1,
        borderRadius: 10,
        padding: 4,
    },
    input: {
        flexGrow: 1,
        fontFamily: 'Inter-Regular',
        color: 'black',
        height: '100%',
        fontSize: 16,
    },
});
