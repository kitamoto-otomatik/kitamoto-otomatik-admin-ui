pipeline {
    environment {
      app_name = 'kitamoto-otomatik-admin-ui'
      kubernetes_url = 'http://localhost:9001'
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
                    docker.withRegistry('', 'docker_credentials') { 
                        def image = docker.build("nikkinicholasromero/" + app_name )
                        image.push()
                    }
                }
            }
        }
        stage('Delete Service') {
            steps {
                withKubeConfig([credentialsId: 'kubernetes_credentials', serverUrl: kubernetes_url]) {
                    bat 'kubectl delete service kitamoto-otomatik-admin-ui'
                }
            }
        }
    }
}
