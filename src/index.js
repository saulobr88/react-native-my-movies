import React from 'react';
import { View, Text, StatusBar } from 'react-native';

StatusBar.setBarStyle('light-content');

import { DrawerNavigator } from 'react-navigation';

import Search from './pages/Search';
import Bookmark from './pages/Bookmark';

const App = DrawerNavigator({
  Search: { screen: Search },
  Bookmark: { screen: Bookmark },
});

export default App;
