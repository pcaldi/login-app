import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10101c',
    padding: 4,
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
  formLabel: {
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
  }
});
