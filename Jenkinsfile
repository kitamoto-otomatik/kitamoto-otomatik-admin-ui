pipeline {
    environment {
      APP_NAME = "kitamoto-otomatik-admin-ui"
    }
    agent any
    stages {
        stage("Build Application") {
            steps {
                bat "npm install"
                bat "npm test"
                bat "npm run build"
            }
        }
        stage("Build Image") {
            steps {
                script {
                    docker.withRegistry("", "docker_credentials") {
                      image = docker.build("${DOCKER_REPOSITORY}/${APP_NAME}:${BUILD_NUMBER}")
                      image.push("${BUILD_NUMBER}")
                    }
                }
            }
        }
        stage("Deploy Image") {
            steps {
                withKubeConfig([credentialsId: "kubernetes_credentials", serverUrl: "${KUBERNETES_HOME}"]) {
                    bat "kubectl delete service --ignore-not-found=true ${APP_NAME}"
                    bat "kubectl delete deployments --ignore-not-found=true ${APP_NAME}"
                    bat "kubectl apply -f kubernetes/deployment.yaml"
                    bat "kubectl apply -f kubernetes/service.yaml"
                }
            }
        }
    }
}
