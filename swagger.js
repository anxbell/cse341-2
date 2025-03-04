const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "CSE341 Personal Project",
        description: "Contact information and CRUD operations",
    },
    host: "localhost:8080",
    schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles  = ['./routes/*.js'];

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    console.log("Swagger documentation generated.");
});
