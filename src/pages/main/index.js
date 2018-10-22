import React, { Component } from 'react';
import {
  View,
  YellowBox,
  Image,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
//import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UsuarioActions } from 'store/ducks/usuario';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class Main extends Component {
  state = {
    login: '',
    senha: '',
  };

  login = () => {
    if (!this.state.login || !this.state.senha) {
      Alert.alert(
        'Login Incorreto',
        'Usuário ou senha não informados.',
      );
      return  
    }

    const { login, senha } = this.state;
    this.props.UsuarioActions.getUserLogin(login, senha);

    console.tron.log('retorno');
    console.tron.log(this.props.usuario);

    if(this.props.usuario.erro !== "") {
      if (this.props.usuario.erro.code === 'auth/wrong-password') {
        Alert.alert(
          'Senha Incorreta',
          'Favor verificar a senha informada.',
        ); 
        return
      } else {
        Alert.alert(
          'Login Incorreto',
          'Usuário não cadastrado.',
        );
        return
      }
    } else {
      this.props.navigation.navigate('Perfil');
    }

    /*
    try {
      const user = await firebase.auth()
        .signInAndRetrieveDataWithEmailAndPassword(login, senha);

      this.props.navigation.navigate('Perfil');
    } catch (err) {
      console.tron.log('err');
      console.tron.log(err);
      if (err.code === 'auth/wrong-password') {
        Alert.alert(
          'Senha Incorreta',
          'Favor verificar a senha informada.',
        ); 
      } else {
        Alert.alert(
          'Login Incorreto',
          'Usuário não cadastrado.',
        );
      }
    } 
    */
    
  }

  render() {
    console.tron.log('render');
    console.tron.log(this.props.usuario);
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.containerImage}>
          <Image source={require('images/theg.png')} />
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Usuário"
            placeholderTextColor="#2c4eb8"
            underlineColorAndroid="transparent"
            onSubmitEditing={() => this.inputSenha.focus()}
            keyboardType="email-address"
            onChangeText={login => this.setState({ login })}
          />

          <TextInput
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Senha"
            placeholderTextColor="#2c4eb8"
            underlineColorAndroid="transparent"
            secureTextEntry
            returnKeyType="go"
            ref={(input) => { this.inputSenha = input; }}
            onChangeText={senha => this.setState({ senha })}
          />
        </View>
        <View style={styles.formConclui}>
          <TouchableOpacity onPress={this.login} style={styles.buttonAces}>
            <Text style={styles.titleAces}>Acessar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Cadastro')} style={styles.buttonInsc}>
            <Text style={styles.titleInsc}>INSCREVER-SE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

/*
Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
*/

const mapStateToProps = state => ({
  usuario: state.usuario,
});

function mapDispatchToProps(dispatch) {
  return {
    UsuarioActions: bindActionCreators(UsuarioActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
