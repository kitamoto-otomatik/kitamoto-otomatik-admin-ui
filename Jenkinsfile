pipeline {
    environment {
      app_name = 'kitamoto-otomatik-admin-ui'
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
                    def url = "nikkinicholasromero/" + app_name 
                    def credentials = 'docker_credentials' 
                    
                    docker.withRegistry('', credentials) { 
                        def image = docker.build(url)
                        image.push()
                    }
                }
            }
        }
    }
}
