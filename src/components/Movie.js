import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,

} from 'react-native';

export default class Movie extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <Image
          style={styles.poster}
          resizeMode="contain"
          source={{
            uri: this.props.movie.poster,
            width: 276,
            height: 395,
          }}
        />

        <View style={styles.infoContainer} >
          <Text style={styles.title}>{this.props.movie.show_title}</Text>
          <Text
            style={styles.description}
            numberOfLines={5}
            ellipsizeMode="tail"
          >
            {this.props.movie.summary}
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={ this.props.onFavoritePress }
          >
            <Text style={styles.buttonText}>
              { this.props.favorite
                ? 'Remover dos Favoritos'
                : 'Adicionar aos Favoritos'
              }
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    );  // Fim do return render
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: '#444',
  },

  poster: {
    width: 120,
    height: 172,
  },

  infoContainer: {
    marginLeft: 10,
    width: 200,
  },

  title: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  description: {
    color: '#ccc',
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20,
  },

  button: {
    backgroundColor: '#BE3232',
    alignSelf: 'stretch',
    height: 30,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
