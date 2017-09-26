import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Button,
  AsyncStorage
} from 'react-native';

import Movie from '../components/Movie';

export default class Search extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        search: '',
        movie: null,
        loading: false,
        inputS: 'Texto padrão',
        searchL: 0,
        searchI: '',
        url: '',
        bookmark: []
      };
  }

  componentWillMount() {
    AsyncStorage.getItem('@Workshop:bookmark').then(result => {
      let bookmark = result ? JSON.parse(result) : [];
      this.setState({ bookmark });
    });
  }

  CheckTextInputIsEmptyOrNot = () => {
    const { search }  = this.state ;

    if(search == '') {
      Alert.alert("Please Enter the Value.");
    }
    else{
      // Do something here which you want to if all the Text Input is filled.
      Alert.alert("All Text Input is Filled.");
    }
  }

  fetchMovies = async (search) => {
    //const {search} = this.state;
    this.setState({searchL: search.lenght});
    if (search != ''){
      this.setState({loading: true});
      this.setState({inputS: 'fez o loading true'});
      this.setState({searchI: search});

      try {
        const url = "http://netflixroulette.net/api/api.php?title="+search;
        this.setState({url});

        const response = await fetch(url);

        if(!response.ok) throw {};

        const movie = await response.json();
        this.setState({ movie: movie, loading: false, inputS: 'Fez o try' });

      } catch (error) {
        this.setState({ movie: null, loading: false, inputS: 'Fez o catch'  });
      }
    } else {
      this.setState({ movie: null, loading: false, inputS: 'Search null' });
    }
  };

  handleFavorite = () => {
    let bookmark = this.state.bookmark;

    if (this.isFavorite()){
      bookmark = bookmark.filter(bookmarkMovie =>
        bookmarkMovie.show_id !== this.state.movie.show_id
      );
    } else {
      bookmark.push(this.state.movie);
    }

    this.setState({ bookmark });

    AsyncStorage.setItem('@Workshop:bookmark', JSON.stringify(bookmark));
  }

  isFavorite = () => {
    return this.state.bookmark.filter(bookmarkMovie =>
      bookmarkMovie.show_id === this.state.movie.show_id
    ).length > 0;
  }

  render(){
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua Busca"
          onChangeText={this.fetchMovies}
        />

        { this.state.loading &&
          <ActivityIndicator
            style={styles.loading}
            color="#FFF"
            size="small"
          />
        }

        { this.state.movie &&
          <Movie
            movie={this.state.movie}
            favorite={this.isFavorite()}
            onFavoritePress={this.handleFavorite}
          />
        }

        <Text>search: {this.state.search}</Text>
        <Text>searchL: {this.state.searchL}</Text>
        <Text>searchI: {this.state.searchI}</Text>
        <Text>inputS: {this.state.inputS}</Text>
        <Text>url: {this.state.url}</Text>


      </View>
    ); // Fim do return render
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding: 20,
  },

  input: {
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    height: 40,
    borderRadius: 3,
    marginTop: 20,
    fontSize: 12,
    paddingHorizontal: 20,
    fontFamily: 'Helvetica',
  },

  loading: {
    marginTop: 20,
  }
});
