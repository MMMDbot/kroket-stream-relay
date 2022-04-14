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
                stage('Build images') {
                    steps {
                    echo 'Building images...'
                            dir('backend') {
                                script {
                                    dockerApi = docker.build(imageName)
                                    dockerIngest = docker.build(imageName, "-f Dockerfile-ingest ." )
                                    dockerRelay = docker.build(imageName, "-f Dockerfile-relay .")
                                    dockerThumbnails = docker.build(imageName, "-f Dockerfile-thumbnails .")
                                }
                            }
                            dir('frontend') {
                                script {
                                    dockerFrontend = docker.build(imageName)
                                }
                            }
                    }
                }
                stage('Publish') {
                    steps {
                    echo 'Publishing images...'
                    script {
                        docker.withRegistry(registryUri, registryCredentialSet) {
                            dockerApi.push('api')
                            dockerIngest.push('ingest')
                            dockerRelay.push('relay')
                            dockerThumbnails.push('thumbnails')
                            dockerFrontend.push('frontend')
                        }
                    }    
                    }
                }
            }
        }
    }
}
