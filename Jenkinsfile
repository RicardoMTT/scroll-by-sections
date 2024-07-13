pipeline {
    agent any

    tools {nodejs "NodeJS"}

    stages {
      stage('Install AWS CLI') {
            steps {
                sh '''
                pip3 install --user awscli
                export PATH=$PATH:$HOME/.local/bin
                aws --version
                '''
            }
        }

        stage('Build') {
            steps {
                sh 'ls'
                sh 'npm install'
                sh 'npm run build'
                sh 'ls'
                sh 'cd dist && ls'
                sh 'cd dist/navigation-angular-left && ls'
            }
        }
        stage('S3 Upload') {
            steps {
                withAWS(region: 'us-east-1', credentials: '661048e1-9539-43bb-bf28-59c6a889fec6') {
                    sh 'ls -la'
                    sh 'aws s3 cp dist/navigation-angular-left/. s3://angular-jenkins-test/ --recursive'
                }
            }
        }
    }
}
