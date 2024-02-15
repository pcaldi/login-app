import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10101c',
    padding: 10,
  },
  rowData: {
    padding: 14,
    width: '100%',
    backgroundColor: '#1d1d35',
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  infoData: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  valueData: {
    fontSize: 16,
    color: '#F5F5F5',
    flex: 0
  },
  icon: {}
});
