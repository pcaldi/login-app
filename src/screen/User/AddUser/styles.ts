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
  DropDownPickerStyle: {
    backgroundColor: '#c7c7c7',
    color: '#10101c',
    width: '90%',
    alignSelf: 'center',
    height: 56,
    marginTop: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#10101c',
  },
  dropDownContainerStyle: {
    backgroundColor: '#c7c7c7',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#10101c',
  },
  textStyle: {
    fontSize: 18,
    color: '#10101c',
  },
});
