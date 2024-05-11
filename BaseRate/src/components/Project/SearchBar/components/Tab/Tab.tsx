import Clickable, { RIClickable } from "@src/components/Interaction/Clickable/Clickable";
import { Text, View } from 'react-native';

export interface RITab {
    isActive: boolean;
    text?: string;
    tabItemCounts?: number;
}

export namespace RITab { }

export default function Tab(props: RITab & RIClickable) {
    const { isActive, tabItemCounts, text = 'button', ...clickableProps } = props;
    return (
        <View style={{ flexGrow: 1, paddingLeft: 16 }}>
            <Clickable {...clickableProps}>
                <View
                    style={{
                        paddingVertical: 8,
                        width: '100%',
                        flexDirection: 'row',
                    }}>
                    <Text
                        className={
                            'text-sm mr-2 ' +
                            (isActive ? 'text-slate-900  text-underline' : 'text-slate-400')
                        }
                        style={{ fontFamily: !isActive ? 'Inter-Regular' : 'Inter-Bold' }}>
                        {text}
                    </Text>
                    {tabItemCounts ? (
                        <View
                            style={{
                                paddingHorizontal: 4,
                                paddingVertical: 2,
                                backgroundColor: isActive ? 'red' : '#E2E8F0',
                                borderRadius: 2000,
                            }}>
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: isActive ? 'white' : '#94A3B8',
                                    fontFamily: 'Inter-Bold',
                                }}>
                                {tabItemCounts.toString()}
                            </Text>
                        </View>
                    ) : (
                        <></>
                    )}
                </View>
            </Clickable>
        </View>
    )
}