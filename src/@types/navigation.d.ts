// Exportando declaração global para adicionar tipos às rotas do React Navigation
export declare global {
  // Definindo um namespace ReactNavigation para conter os tipos relacionados à navegação
  namespace ReactNavigation {
    // Definindo a interface RootParamList para conter os tipos de parâmetros de rota
    interface RootParamList {
      // Rotas que não esperam nenhum parâmetro
      newUser: undefined;
      recoverPassword: undefined;
      login: undefined;
      home: undefined;
      verifyKey: undefined;

      // Rotas que esperam o parâmetro userId do tipo string
      userDetails: {
        userId: string;
      };

      editUser: {
        userId: string;
      };

      editPasswordUser: {
        userId: string;
      };

      // Rotas que não esperam nenhum parâmetro
      addUser: undefined;
      listUser: undefined;
      editProfile: undefined;
      profileDetails: undefined;
      editPasswordProfile: undefined;
      listUserTab: undefined;
      homeTab: undefined;
      profileTab: undefined;
      editProfileImage: undefined;
    }
  }
}
