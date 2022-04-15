pipeline {
    environment {
        imageName = 'square/kroket-stream-relay'
        registryCredentialSet = 'registry'
        registryUri = 'https://registry.arturobracero.com'
        pullRegistry = 'registry.arturobracero.com'
        commitShortHash = "${GIT_COMMIT[0..7]}"
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
                                    dockerApi = docker.build("${imageName}-api:${GIT_COMMIT[0..7]}")
                                    dockerIngest = docker.build("${imageName}-ingest:${GIT_COMMIT[0..7]}", "-f Dockerfile-ingest ." )
                                    dockerRelay = docker.build("${imageName}-relay:${GIT_COMMIT[0..7]}", "-f Dockerfile-relay .")
                                    dockerThumbnails = docker.build("${imageName}-thumbnails:${GIT_COMMIT[0..7]}", "-f Dockerfile-thumbnails .")
                                }
                            }
                            dir('frontend') {
                                script {
                                    dockerFrontend = docker.build("${imageName}-frontend:${commitShortHash}")
                                }
                            }
                    }
                }
                stage('Publish') {
                    steps {
                    echo 'Publishing images...'
                    script {
                        docker.withRegistry(registryUri, registryCredentialSet) {
                            dockerApi.push()
                            dockerIngest.push()
                            dockerRelay.push()
                            dockerThumbnails.push()
                            dockerFrontend.push()
                        }
                    }    
                    }
                }
            }
        }
        stage('Deploy') {
            agent any
            steps {
                script {
                    def remote = [:]
                    remote.name = "nagrand"
                    remote.host = "192.168.1.200"
                    remote.allowAnyHosts = true

                    node {
                        withCredentials([sshUserPrivateKey(credentialsId: 'ssh-deploy', keyFileVariable: 'identity', usernameVariable: 'userName')]) {
                            remote.user = userName
                            remote.identityFile = identity

                            writeFile file: 'abc.sh', text: "ls ${GIT_COMMIT[0..7]}"
                            sshPut remote: remote, from: 'abc.sh', into: '/home/square/jenkins/'
                            sshCommand remote: remote, command: "cd /home/square/kroket-stream-relay/ && docker pull ${pullRegistry}/${imageName}-api:${GIT_COMMIT[0..7]} && docker pull ${pullRegistry}/${imageName}-ingest:${GIT_COMMIT[0..7]} && docker pull ${pullRegistry}/${imageName}-relay:${GIT_COMMIT[0..7]} && docker pull ${pullRegistry}/${imageName}-thumbnails:${GIT_COMMIT[0..7]} && docker pull ${pullRegistry}/${imageName}-frontend:${GIT_COMMIT[0..7]} && TAG=${GIT_COMMIT[0..7]} docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d"
                        }
                    }
                }
            }
        }
    }
}
