// Context - compartilhar dados entre telas
import { createContext } from "react";

interface AuthContextType {
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  signIn: async () => { },
  signOut: async () => { },
});
