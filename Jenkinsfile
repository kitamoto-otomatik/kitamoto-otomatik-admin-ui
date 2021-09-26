pipeline {
    environment {
      app_name = 'kitamoto-otomatik-admin-ui'
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
        stage('Build Image') {
            steps {
                script {
                    docker.withRegistry('', 'docker_credentials') { 
                        def image = docker.build('nikkinicholasromero/$app_name')
                        image.push()
                    }
                }
            }
        }
        stage('Deploy Image') {
            steps {
                withKubeConfig([credentialsId: 'kubernetes_credentials', serverUrl: 'http://localhost:9001']) {
                    bat 'kubectl delete service --ignore-not-found=true $app_name'
                    bat 'kubectl delete deployments --ignore-not-found=true $app_name'
                    bat 'kubectl apply -f kubernetes/deployment.yaml'
                    bat 'kubectl apply -f kubernetes/service.yaml'
                }
            }
        }
    }
}
