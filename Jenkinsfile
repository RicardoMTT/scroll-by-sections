pipeline {
    agent any

    tools {nodejs "NodeJS"}

    environment {
        AWS_CLI_DIR = "$HOME/aws-cli"
        PATH = "$PATH:$HOME/bin"
    }

    stages {

      stage('Install AWS CLI') {
            steps {
                sh '''
                curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
                unzip -o awscliv2.zip
                ./aws/install --update -i $HOME/aws-cli -b $HOME/bin
                export PATH=$PATH:$HOME/bin
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
                    sh '$HOME/bin/aws s3 cp dist/navigation-angular-left/. s3://angular-jenkins-test/ --recursive'
                }
            }
        }
    }
}
