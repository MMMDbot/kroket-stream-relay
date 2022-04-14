pipeline {
    agent {
        docker { image 'node:16.13.1-alpine' }
    }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
                sh 'cd ./backend'
                sh 'npm ci'
                sh 'npm test'
            }
        }
    }
}