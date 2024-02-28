import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10101c',
  },

  content: {
    padding: 12,
  },

  containerImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 175,
    height: 175,
    borderWidth: 2,
    borderColor: '#6c7fd8',
    borderRadius: 999,
    resizeMode: 'cover',
  },

  contentView: {
    borderBottomColor: '#c4c4c4',
    borderBottomWidth: 1,
    marginBottom: 6,
    padding: 12,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6c7fd8',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f5f5f5',
  },
  btnView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  }
});
