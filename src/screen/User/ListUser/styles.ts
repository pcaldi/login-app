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
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#c7C7C7',
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

  pageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    gap: 6,
  },

  pageSelected: {
    backgroundColor: '#c7C7C7',
    borderWidth: 1,
    borderColor: '#10101c',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  pageTextSelected: {
    fontSize: 18,
    padding: 12,
    fontWeight: '700',
    color: '#10101c',
    textAlign: 'center'
  },

});
