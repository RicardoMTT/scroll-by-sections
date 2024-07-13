pipeline {
    agent any

    tools {nodejs "NodeJS"}

    stages {
        stage('Build') {
            steps {
                sh 'ls'
                sh 'npm install'
                sh 'echo N | ng analytics off'
                sh 'npm run build'
                sh 'ls'
                sh 'cd dist && ls'
                sh 'cd dist/navigation-angular-left && ls'
            }
        }
        stage('S3 Upload') {
            steps {
                withAWS(region: 'us-east-1', credentials: '8c94fa09-4954-4498-aac9-838d930a9170') {
                    sh 'ls -la'
                    sh 'aws s3 cp dist/navigation-angular-left/. s3://angular-jenkins-test/ --recursive'
                }
            }
        }
    }
}
