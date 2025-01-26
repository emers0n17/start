import { databases, storage, DB_ID, PROJECTS_COLLECTION, IMAGES_BUCKET } from './appwrite'
import { ID, Query } from 'appwrite'

export class ProjectService {
    constructor() {
        this.bucketId = IMAGES_BUCKET
    }

    async createProject(projectData) {
        try {
            const response = await databases.createDocument(
                DB_ID,
                PROJECTS_COLLECTION,
                ID.unique(),
                {
                    title: projectData.title,
                    description: projectData.description,
                    price: projectData.price,
                    categoryId: projectData.categoryId,
                    technologies: projectData.technologies,
                    features: projectData.features,
                    status: projectData.status,
                    userId: projectData.userId,
                    imageIds: projectData.imageIds,
                    demoUrl: projectData.demoUrl,
                    documentation: projectData.documentation,
                    createdAt: projectData.createdAt,
                    updatedAt: projectData.updatedAt
                }
            )

            return response
        } catch (error) {
            throw error
        }
    }

    async uploadImage(file) {
        try {
            return await storage.createFile(
                IMAGES_BUCKET,
                ID.unique(),
                file
            )
        } catch (error) {
            throw new Error('Erro ao fazer upload da imagem: ' + error.message)
        }
    }

    async getUserProjects(userId) {
        try {
            const response = await databases.listDocuments(
                DB_ID,
                PROJECTS_COLLECTION,
                [
                    Query.equal('userId', userId)
                ]
            );

            // Processar as imagens para cada projeto
            const projects = await Promise.all(response.documents.map(async project => {
                let images = [];
                if (project.imageIds && Array.isArray(project.imageIds)) {
                    images = await Promise.all(
                        project.imageIds.map(id => this.getImagePreview(id))
                    );
                }

                return {
                    ...project,
                    images: images.length > 0 ? images : ['/project-thumbnail.jpg'],
                    technologies: Array.isArray(project.technologies) 
                        ? project.technologies 
                        : project.technologies?.split(',') || []
                };
            }));

            return projects;
        } catch (error) {
            console.error('Erro ao buscar projetos:', error);
            throw new Error('Erro ao buscar projetos: ' + error.message);
        }
    }

    async updateProjectStatus(projectId, status) {
        try {
            const response = await databases.updateDocument(
                DB_ID,
                PROJECTS_COLLECTION,
                projectId,
                {
                    status,
                    updatedAt: new Date().toISOString()
                }
            )
            return response
        } catch (error) {
            throw new Error('Erro ao atualizar status: ' + error.message)
        }
    }

    async getFeaturedProjects() {
        try {
            const response = await databases.listDocuments(
                DB_ID,
                PROJECTS_COLLECTION,
                [Query.equal('status', 'active')]
            )
            
            // Processar as imagens para cada projeto
            const projects = await Promise.all(response.documents.map(async project => {
                let images = [];
                if (project.imageIds && Array.isArray(project.imageIds)) {
                    images = await Promise.all(
                        project.imageIds.map(id => this.getImagePreview(id))
                    );
                }

                return {
                    ...project,
                    images: images.length > 0 ? images : ['/project-thumbnail.jpg'],
                    technologies: Array.isArray(project.technologies) 
                        ? project.technologies 
                        : project.technologies?.split(',') || []
                };
            }));

            return projects;
        } catch (error) {
            console.error('Erro ao carregar projetos:', error);
            throw new Error('Erro ao carregar projetos: ' + error.message);
        }
    }

    async getAllProjects() {
        try {
            const response = await databases.listDocuments(
                DB_ID,
                PROJECTS_COLLECTION,
                [Query.equal('status', 'active')]
            );

            // Processar as imagens para cada projeto
            const projects = await Promise.all(response.documents.map(async project => {
                let images = [];
                if (project.imageIds && Array.isArray(project.imageIds)) {
                    images = await Promise.all(
                        project.imageIds.map(id => this.getImagePreview(id))
                    );
                }

                return {
                    ...project,
                    images: images.length > 0 ? images : ['/project-thumbnail.jpg'],
                    technologies: Array.isArray(project.technologies) 
                        ? project.technologies 
                        : project.technologies?.split(',') || []
                };
            }));

            return projects;
        } catch (error) {
            console.error('Erro ao carregar projetos:', error);
            throw new Error('Erro ao carregar projetos: ' + error.message);
        }
    }

    async getImagePreview(imageId) {
        try {
            console.log('BucketID:', this.bucketId) // Debug
            console.log('ImageID:', imageId) // Debug
            
            return storage.getFilePreview(
                IMAGES_BUCKET,
                imageId,
                800,
                600
            ).href
        } catch (error) {
            console.error('Erro ao obter preview da imagem:', error)
            return '/project-thumbnail.jpg'
        }
    }

    async getProjectById(projectId) {
        try {
            const project = await databases.getDocument(
                DB_ID,
                PROJECTS_COLLECTION,
                projectId
            )
            
            console.log('Projeto bruto:', project)

            // Buscar URLs das imagens
            if (project.imageIds && Array.isArray(project.imageIds)) {
                const imageUrls = await Promise.all(
                    project.imageIds.map(id => this.getImagePreview(id))
                )
                return {
                    ...project,
                    images: imageUrls,
                    technologies: Array.isArray(project.technologies) 
                        ? project.technologies 
                        : project.technologies?.split(',') || []
                }
            }
            
            return {
                ...project,
                images: ['/project-thumbnail.jpg'],
                technologies: []
            }
        } catch (error) {
            console.error('Erro ao carregar projeto:', error)
            throw new Error('Erro ao carregar projeto: ' + error.message)
        }
    }
}

export default new ProjectService()

// bucketId