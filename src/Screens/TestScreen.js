import React, { useEffect, useState } from 'react';
import {View, Text} from 'react-native';
import { RecipeSmall } from '../Components/index';
import { RequestUtil } from "../data/RequestUtil";

export default function App( { navigation }) {
    return (
        <View>
            <RecipeSmall />
        </View>
    );
}