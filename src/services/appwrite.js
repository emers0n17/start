import { Client, Account, Databases, Storage } from 'appwrite'

// Configuração principal do cliente
const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject("67939d1700235391433c")

// Serviços
export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)

// Constantes de banco de dados (verifique se estão no .env)
export const DB_ID = import.meta.env.VITE_DATABASE_ID
// export const USERS_COLLECTION = import.meta.env.VITE_USERS_COLLECTION_ID
export const USERS_COLLECTION = '67939e11003b271b107f'
// export const PROJECTS_COLLECTION = import.meta.env.VITE_PROJECTS_COLLECTION_ID\
export const PROJECTS_COLLECTION = '6793be850006fc56af0d'
// export const CATEGORIES_COLLECTION = import.meta.env.VITE_CATEGORIES_COLLECTION_ID
export const CATEGORIES_COLLECTION = '6793c1ec001cc1c514cc'
export const IMAGES_BUCKET = import.meta.env.VITE_PROJECT_IMAGES_BUCKET_ID