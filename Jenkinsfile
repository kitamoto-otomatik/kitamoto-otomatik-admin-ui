pipeline {
    environment { 
        registry = "nikkinicholasromero/kitamoto-otomatik-admin-ui" 
        registryCredential = 'docker_credentials' 
        dockerImage = '' 
    }
    agent any
    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }
        stage('Build Application') {
            steps {
                bat 'npm run build'
            }
        }
        stage('Build and Push Image') {
            steps {
                script {
                    docker.withRegistry('', registryCredential) { 
                        dockerImage = docker.build(registry)
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Deploy Application') {
            steps('Delete Deployment') {
                bat 'kubectl delete deployments kitamoto-otomatik-admin-ui'
            }
            steps('Delete Service') {
                bat 'kubectl delete service kitamoto-otomatik-admin-ui'
            }
            steps('Create Deployment') {
                bat 'kubectl apply -f kubernetes/deployment.yaml'
            }
            steps('Create Service') {
                bat 'kubectl apply -f kubernetes/service.yaml'
            }
        }
    }
}
