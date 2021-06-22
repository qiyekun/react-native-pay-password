import React from 'react';
import { View, Text, Image, TouchableHighlight, Dimensions, StyleSheet, } from 'react-native';
const KeyboardItem = (props) => {
    const { type = 'num', value, style = [], numStyle, onPress = () => { }, } = props;
    return (<TouchableHighlight style={[styles.keyboardItem, ...style]} underlayColor={''} onPress={onPress}>
        {type === 'num'
        ? <Text style={[styles.text, numStyle]}>
                {value}
            </Text>
        : <Image source={value} resizeMode={'contain'} style={[styles.image, numStyle]}/>}
    </TouchableHighlight>);
};
const DATA_SOURCES = [
    [{
            type: 'num',
            value: '1',
        }, {
            type: 'num',
            value: '2',
        }, {
            type: 'num',
            value: '3',
        }],
    [{
            type: 'num',
            value: '4',
        }, {
            type: 'num',
            value: '5',
        }, {
            type: 'num',
            value: '6',
        }],
    [{
            type: 'num',
            value: '7',
        }, {
            type: 'num',
            value: '8',
        }, {
            type: 'num',
            value: '9',
        }],
    [{
            type: 'num',
            value: '',
        }, {
            type: 'num',
            value: '0',
        }, {
            type: 'image',
            value: require('../images/delete.png'),
        }]
];
const Keyboard = (props) => {
    const onPress = (item) => {
        if (item.onPress) {
            item.onPress(item.value);
            return;
        }
        if (item.type === 'num') {
            props.onPress && props.onPress(item.value);
        }
        else {
            props.onDelete && props.onDelete();
        }
    };
    return (<View style={[styles.keyboardView, props.style]}>
        {(props.dataSources || DATA_SOURCES).map((items, i) => {
        return (<View style={[styles.itemView, props.rowStyle]} key={i}>
                {items.map((item, j) => {
            const withBorder = Math.round(items.length / 2) === j + 1;
            return (<KeyboardItem key={`${i}-${j}`} type={item.type} value={item.value} style={[withBorder ? styles.border : {}, item.numStyle || {}]} onPress={() => { onPress(item); }}/>);
        })}
            </View>);
    })}
    </View>);
};
const styles = StyleSheet.create({
    keyboardView: {
        width: Dimensions.get('window').width,
    },
    itemView: {
        flexDirection: 'row',
        borderTopWidth: 4,
        borderTopColor: '#000102',
    },
    keyboardItem: {
        flex: 1,
        height: 46,
        backgroundColor: '#feffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    border: {
        borderLeftWidth: 4,
        borderLeftColor: '#000102',
        borderRightWidth: 4,
        borderRightColor: '#000102',
    },
    text: {
        fontSize: 22,
        color: '#F6F8FB'
    },
    image: {
        height: 30,
        width: 30,
    }
});
export default Keyboard;
