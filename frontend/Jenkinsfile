pipeline {
  agent any

  tools {
    nodejs 'Node18'
  }

  environment {
    FRONT_DIR = 'frontend'
  }

  stages {
    stage('Checkout') {
      steps {
        git url: 'hhttps://github.com/Alfikriangelo/fullstack-cicd.git', branch: 'main', credentialsId: 'github-token'
      }
    }

    stage('Install Dependencies') {
      steps {
        dir("${FRONT_DIR}") {
          sh 'npm install'
        }
      }
    }

    stage('Build') {
      steps {
        dir("${FRONT_DIR}") {
          sh 'npm run build'
        }
      }
    }

    stage('Test') {
      steps {
        dir("${FRONT_DIR}") {
          sh 'npm test || true'
        }
      }
    }

    stage('SAST - ESLint') {
      steps {
        dir("${FRONT_DIR}") {
          sh 'npx eslint . || true'
        }
      }
    }

    stage('DAST - OWASP ZAP') {
      steps {
        sh '''
          nohup npx serve -s frontend/build -l 3000 &
          sleep 5
          zap-cli start
          zap-cli open-url http://localhost:3000
          zap-cli active-scan http://localhost:3000
          zap-cli report -o zap_report.html -f html
          zap-cli stop
        '''
      }
    }

    stage('Deploy to Staging') {
      steps {
        sh 'cp -r frontend/build/* /var/www/staging/frontend/'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: '**/zap_report.html', allowEmptyArchive: true
    }
    failure {
      echo 'Pipeline failed'
    }
  }
}
