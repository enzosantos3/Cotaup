# Stage 1: build (opcional usar imagem do builder se quiser compilar no container)
# Aqui assumimos que você já tem target/app.jar
FROM eclipse-temurin:17-jre-focal
WORKDIR /app
COPY target/app.jar app.jar
# Copia o wait script se usar
COPY ../wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh

# Expor porta (igual ao server.port no application.properties)
EXPOSE 8080

ENTRYPOINT ["java","-jar","/app/app.jar"]