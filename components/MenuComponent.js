import React,{Component} from 'react';
import { FlatList,Text } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import {DISHES} from '../shared/dishes';

const mapStateToProps = (state) => {
    return {
      dishes: {dishes: DISHES, //state.dishes
              isLoading: false,
              errMess: ''}
    }
  }

class Menu extends Component{

    static navigationOptions={
                              title: 'Menu'
                              };
    constructor(props){
    super(props);
    }

    render(){
      const  {navigate}  = this.props.navigation;
        const renderMenuItem = ({item, index}) => {
          
          return (
                <Tile
                    key={index}
                    title={item.name}
                    caption={item.description}
                    featured
                    imageSrc={{ uri: baseUrl + item.image}}
                    onPress={() => navigate('DishDetail', { dishId: item.id })}
                  />
        );
    };
      

    if(this.props.dishes.isLoading) {
      return (
        <Loading/>
      );
    }
    else if(this.props.dishes.errMess){
      return (
        <Text>
          {this.props.dishes.errMess}
        </Text>
      );
    }
    else
    return (
            <FlatList 
                data={this.props.dishes.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                />
    );
    }
}


export default connect(mapStateToProps)(Menu);