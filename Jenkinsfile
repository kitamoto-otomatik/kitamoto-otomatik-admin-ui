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
            steps {
                bat 'docker run -d -t -p 127.0.0.1:80:80 --name kitamoto-otomatik-admin-ui nikkinicholasromero/kitamoto-otomatik-admin-ui'
            }
        }
    }
}
