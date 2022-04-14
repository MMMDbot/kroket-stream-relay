pipeline {
    environment {
        imageName = 'square/kroket-stream-relay'
        registryCredentialSet = 'registry'
        registryUri = 'https://registry.arturobracero.com'
    }
    agent none
    stages {
        stage('Test') {
            agent {
                docker { image 'node:16.13.1-alpine' }
            }
            steps {
                dir('backend') {
                    sh 'node --version'
                    sh 'npm ci'
                    sh 'npm test'
                }
            }
        }
        stage('Build and Publish') {
            agent any
            stages {
                stage('Build') {
                    steps {
                    echo 'Building backend image...'
                            dir('backend') {
                                script {
                                    dockerInstance = docker.build(imageName)
                                }
                            }
                    }
                }
                stage('Publish') {
                    steps {
                    echo 'Publishing image...'
                    script {
                        docker.withRegistry(registryUri, registryCredentialSet) {
                            dockerInstance.push('latest')
                        }
                    }    
                    }
                }
            }
        }
    }
}
