# Lightweight image for production 
FROM openjdk:24-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the jar file
COPY target/usersapp-0.0.1-SNAPSHOT.jar app.jar

# Expose default port
EXPOSE 8080

# Launch the spring boot app
ENTRYPOINT ["java", "-jar", "app.jar"]