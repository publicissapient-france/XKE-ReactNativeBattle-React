import React from 'react';
import { StyleSheet, Text, View, Image, Platform, FlatList } from 'react-native';

const REQUEST_URL = 'http://henri-potier.xebia.fr/books';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: null,
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          books: responseData,
          loaded: true,
        });
      })
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={this.state.books}
          keyExtractor={(book) => book.isbn}
          renderItem={this.renderBook}
        />
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  renderBook({item}) {
    return (
      <View style={styles.bookContainer}>
        <Image
          style={styles.thumbnail}
          source={{ uri: item.cover }}/>
        <View style={styles.descriptionContainer}>
          <Text>{item.title}</Text>
          <Text style={styles.price}>{item.price}&nbsp;€</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
  },
  bookContainer: {
    width: 150,
    margin: 8,
    backgroundColor: '#FFF',
    ...Platform.select({
      ios: {
        shadowOpacity: 0.1,
        shadowOffset: {
          height: 1,
        },
        shadowColor: 'black',
        shadowRadius: 1,
      },
      android: {
        elevation: 2
      }
    })
  },
  descriptionContainer: {
    padding: 8,
  },
  price: {
    paddingTop: 8,
    color: '#03a9f4',
    alignSelf: 'flex-end'
  },
  thumbnail: {
    height: 200,
  },
});
