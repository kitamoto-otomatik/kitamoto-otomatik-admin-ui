pipeline {
    environment {
      app_name = 'kitamoto-otomatik-admin-ui'
      kubernetes_url = 'http://localhost:9001'
    }
    agent any
    stages {
        stage('Build Application') {
            steps {
                bat 'npm install'
                bat 'npm test'
                bat 'npm run build'
            }
        }
        stage('Build and Push Image') {
            steps {
                script {
                    docker.withRegistry('', 'docker_credentials') { 
                        def image = docker.build("nikkinicholasromero/" + app_name)
                        image.push()
                    }
                }
            }
        }
        stage('Deploy Image') {
            steps {
                withKubeConfig([credentialsId: 'kubernetes_credentials', serverUrl: kubernetes_url]) {
                    bat 'kubectl delete service kitamoto-otomatik-admin-ui'
                    bat 'kubectl delete deployments kitamoto-otomatik-admin-ui'
                    bat 'kubectl apply -f kubernetes/deployment.yaml'
                    bat 'kubectl apply -f kubernetes/service.yaml'
                }
            }
        }
    }
}
