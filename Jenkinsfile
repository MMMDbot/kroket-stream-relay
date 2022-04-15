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
                                    dockerApi = docker.build("${imageName}:api")
                                    dockerIngest = docker.build("${imageName}:ingest", "-f Dockerfile-ingest ." )
                                    dockerRelay = docker.build("${imageName}:relay", "-f Dockerfile-relay .")
                                    dockerThumbnails = docker.build("${imageName}:thumbnails", "-f Dockerfile-thumbnails .")
                                }
                            }
                            dir('frontend') {
                                script {
                                    dockerFrontend = docker.build("${imageName}:frontend")
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
            script {
                def remote = [:]
                remote.name = "nagrand"
                remote.host = "192.168.1.200"
                remote.allowAnyHosts = true

                node {
                    withCredentials([sshUserPrivateKey(credentialsId: 'ssh-deploy', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'userName')]) {
                        remote.user = userName
                        remote.identityFile = identity
                        stage("SSH Steps Rocks!") {
                            writeFile file: '/home/square/jenkins/abc.sh', text: 'ls'
                            sshCommand remote: remote, command: 'for i in {1..5}; do echo -n \"Loop \$i \"; date ; sleep 1; done'
                        }
                    }
                }
            }
        }
    }
}
