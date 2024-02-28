import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10101c',

  },
  containerImage: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconView: {
    position: 'absolute',
    zIndex: 999,
    top: 1,
    right: 120,
    bottom: 120,
    left: 220,

    backgroundColor: '#6c7fd8',
    borderRadius: 9999,

    alignItems: 'center',
    justifyContent: 'center',

  },
  icon: {
    fontSize: 32,
    color: '#F5F5F5',
  },
  image: {
    borderWidth: 2,
    borderColor: '#C7C7C7',
    borderRadius: 999,
    width: 175,
    height: 175,
    resizeMode: 'cover',
  },

  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  formLabel: {
    marginTop: 18,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  textForm: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  viewRequired: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    //paddingTop: 12,
    marginTop: 20,
  },
  txtRequired: {
    color: '#C7C7C7',
    fontSize: 14
  },
  btnView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
});
