export const userValidSchema = {
    body:{
        type: "object",
        required: [
            "name",
            "lastname",
            "age",
            "idType",
            "idNumber",
            "password"
        ],
        properties: {
            name: {
                type: "string",
                minLength: 3,
                maxLength: 50
            },
            lastname: {
                type: "string",
                minLength: 3,
                maxLength: 50
            },
            age: {
                type: "number",
                minimum: 1,
                maximum: 100
            },
            idType: {
                type: "string",
                enum: ["TI", "CC"]
            },
            idNumber: {
                type: "string",
                minLength: 8,
                maxLength: 10
            },
            role: {
                type: "string",
            },
            password: {
                type: "string",
                minLength: 4,
                maxLength: 4,
            }
        }
    }
}