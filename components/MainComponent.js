import React, { Component } from 'react';
import {View, Platform, Image, StyleSheet, ScrollView, Text} from 'react-native';
import DishDetail from './DishDetailComponent';
import {createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView} from 'react-navigation';
import {Icon} from 'react-native-elements';
import { connect } from 'react-redux';
import {fetchComments,fetchDishes,fetchLeaders,fetchPromos} from '../shared/redux/ActionCreater'
import Reservation from './ReservationComponent';
import  Menu  from './MenuComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Favorites from './FavoriteComponent';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
      }
  }

const mapDispatchToProps = dispatch => ({
    fetchDishes : ()=>dispatch(fetchDishes()),
    fetchComments : ()=>dispatch(fetchComments()),
    fetchPromos : ()=>dispatch(fetchPromos()),
    fetchLeaders : ()=>dispatch(fetchLeaders())
})

const MenuNavigator= createStackNavigator({
    Menu: { screen: (props)=>(<Menu {...props}/>),
        navigationOptions: ({ navigation }) => ({
          headerLeft: (<Icon name="menu" size={24} 
          color= 'white' containerStyle={{paddingLeft:10}}
          onPress={ () => navigation.toggleDrawer() }
          hea
          />
          )          
        })  
    },
    DishDetail: {screen: (props)=><DishDetail {...props}/>}
},{ 
    initialRouteName: 'Menu',
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerTitle: 'Menu'
    }
});

const HomeNavigator= createStackNavigator({
    Home: {screen: (props)=> <Home {...{props}}/>}
},{ 
    navigationOptions: ({navigation})=>({
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTitle: 'Home',
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24}
        color='white' containerStyle={{paddingLeft:10}}
        onPress={()=>navigation.toggleDrawer()}></Icon>
    })
});

const ContactNavigator= createStackNavigator({
    Contact: {screen: Contact},
},{ 
    navigationOptions: ({navigation})=>({
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff' 
        },
        headerLeft: <Icon name='menu' size={24}
        color='white' containerStyle={{paddingLeft:10}}
        onPress={()=>navigation.toggleDrawer()}></Icon>
    })
});

const AboutNavigator= createStackNavigator({
About: {screen: (props)=>(<About {...{props}}/>)},
},{ 
    navigationOptions: ({navigation})=>({
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitle: 'About Us',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24}
        color='white' containerStyle={{paddingLeft:10}}
        onPress={()=>navigation.toggleDrawer()}></Icon>
    })
});

const ReservationNavigator = createStackNavigator({
    Reservation: { screen: Reservation }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff",
      headerTitle: 'My Favorites',
      headerLeft: <Icon name="menu" size={24}
        iconStyle={{ color: 'white' }} containerStyle={{paddingLeft:10}} 
       onPress={ () => navigation.toggleDrawer() } />    
    })
  });

  const FavoritesNavigator = createStackNavigator({
    Favorites: { screen: (props)=> <Favorites {...props}/> }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff",
      headerLeft: <Icon name="menu" size={24}
        iconStyle={{ color: 'white' }} containerStyle={{paddingLeft:10}} 
        onPress={ () => navigation.toggleDrawer() } />    
    })
  });

const CustomDrawerComponent = (props) => (
<ScrollView>
    <SafeAreaView style={styles.container}
                  forceInset={{top: 'always', horizontal: 'never'}}>
        <View style={styles.drawerHeader}>
        <View style={{flex: 1}}>
            <Image source={require('./images/logo.png')}
                   style={styles.drawerImage}/>
        </View>
        <View style={{flex: 2}}>
            <Text style={styles.drawerHeaderText}>
            Ristorante Con Fusion
            </Text>
        </View>
        </View>
        <DrawerItems {...props}/>
    </SafeAreaView>
</ScrollView>
)
const MainNavigator = createDrawerNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='home'
                  type='font-awesome'            
                  size={24}
                  color={tintColor}
                />
              )
        }
    },
    About: {
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About Us',
            drawerLabel: 'About Us',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='info-circle'
                  type='font-awesome'            
                  size={24}
                  color={tintColor}
                />
              )
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='list'
                  type='font-awesome'            
                  size={20}
                  color={tintColor}
                />
              )
        }
    },
    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact Us',
            drawerLabel: 'Contact Us',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='address-card'
                  type='font-awesome'            
                  size={24}
                  color={tintColor}
                />
              )
        }
    },
    Reservation:
    { screen: ReservationNavigator,
      navigationOptions: {
        title: 'Reserve Table',
        drawerLabel: 'Reserve Table',
        drawerIcon: ({ tintColor, focused }) => (
          <Icon
            name='cutlery'
            type='font-awesome'            
            size={24}
            iconStyle={{ color: tintColor }}
          />
        ),
      }
    },
    Favorites:
        { screen: FavoritesNavigator,
          navigationOptions: {
            title: 'My Favorites',
            drawerLabel: 'My Favorites',
            drawerIcon: ({ tintColor, focused }) => (
              <Icon
                name='heart'
                type='font-awesome'            
                size={24}
                iconStyle={{ color: tintColor }}
              />
            ),
          }
        }
},{
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: CustomDrawerComponent
});

class Main extends Component {
  
    render() {
    return (
        <View style={{flex: 1, backgroundColor: 'purple', paddingTop:  Platform.OS==='ios'?0:Expo.Constants.statusBarHeight}}>
        <MainNavigator />
        </View>
    );
  }


    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();        
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
      },
      drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
      },
      drawerImage: {
        margin: 10,
        width: 80,
        height: 60
      }
    });
    
export default connect(mapStateToProps,mapDispatchToProps)(Main);