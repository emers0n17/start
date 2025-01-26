import { databases, DB_ID, USERS_COLLECTION } from './appwrite';
import { ID, Query } from 'appwrite';

const storageKey = 'currentUser';

class AuthService {
  currentUser = null;

  async login(email, password) {
    try {
      const { documents } = await databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_USERS_COLLECTION_ID,
        [Query.equal('email', email)]
      );

      if (documents.length === 0) throw new Error('Usuário não encontrado');
      if (documents[0].senha !== password) throw new Error('Senha incorreta');

      const user = documents[0];
      await databases.updateDocument(
        DB_ID,
        import.meta.env.VITE_USERS_COLLECTION_ID,
        user.$id,
        { ultimo_login: new Date().toISOString() }
      );

      this.currentUser = user;
      localStorage.setItem(storageKey, JSON.stringify(user));
      return user;
    } catch (error) {
      throw new Error(error.message || 'Erro no login');
    }
  }

  async register(userData) {
    try {
      return await databases.createDocument(
        DB_ID,
        USERS_COLLECTION,
        ID.unique(),
        {
          ...userData,
          criado_em: new Date().toISOString(),
        }
      );
    } catch (error) {
      throw new Error(error.message || 'Erro no registro');
    }
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem(storageKey);
  }

  getCurrentUser() {
    if (!this.currentUser) {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          const user = JSON.parse(stored);
          if (user?.$id && user?.email) this.currentUser = user;
        } catch {
          this.logout();
        }
      }
    }
    return this.currentUser;
  }

  // No AuthService
  async updateLastLogin(userId) {
    try {
      const response = await databases.updateDocument(
        DB_ID,
        USERS_COLLECTION,
        userId,
        {
          ultimo_login: new Date().toISOString()
        }
      )
      return response
    } catch (error) {
      console.error('Erro ao atualizar último login:', error)
      // Não vamos lançar o erro para não bloquear o carregamento do dashboard
      return null
    }
  }

  async getUserDetails(userId) {
    try {
      return await databases.getDocument(
        DB_ID,
        USERS_COLLECTION,
        userId
      );
    } catch (error) {
      throw new Error(error.message || 'Erro ao buscar detalhes');
    }
  }
}

export default new AuthService();