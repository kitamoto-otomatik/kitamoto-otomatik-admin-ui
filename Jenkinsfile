pipeline {
    environment { 
        imageRegistryUrl = "nikkinicholasromero/kitamoto-otomatik-admin-ui" 
        imageRegistryCredential = 'docker_credentials' 
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
                    docker.withRegistry('', imageRegistryCredential) { 
                        def image = docker.build(imageRegistryUrl)
                        image.push()
                    }
                }
            }
        }
    }
}
