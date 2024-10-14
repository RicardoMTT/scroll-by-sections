# Jenkins en una aplicacion Angular a un s3 de AWS

Implementación de un flujo automatizado usando Jenkins

## Jenkins
Es una herramienta para automatizar la integracion y despliegue en una aplicacion, es una serie de pasos
automatizados para construir (build), probar (test) y desplegar(deploy) una aplicación.

### Jenkinsfile
Es un archivo que define un pipeline de Jenkins, en jenkinsfile usamos diveras configuraciones:

agent any , que el pipeline puede ejecutarse en cualquier agente disponible.
tools {node "NodeJS"}, que el pipeline necesita Nodejs para ejecutarse
 



