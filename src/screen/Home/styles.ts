import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10101c',
    padding: 10,
  },
  content: {
    backgroundColor: 'transparent',
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#c7C7C7',
    borderRadius: 6,
    flexDirection: 'row',
  },
  contentView: {
    padding: 20,
    color: '#f5f5f5',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "flex-start",
    gap: 12,
  },
  title: {
    fontSize: 22,
    color: '#f5f5f5',
  },

});
