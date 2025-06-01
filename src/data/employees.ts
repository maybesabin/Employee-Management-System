import type { User } from "../types/user"

export const employees: User[] = [
    {
        name: "Sabin Hamal",
        email: "sabin@example.com",
        password: "password123",
        role: "Employee"
    },
    {
        name: "Aayush Shrestha",
        email: "aayush@example.com",
        password: "aayushpass456",
        role: "Employee"
    },
    {
        name: "Pratik Gurung",
        email: "pratik@example.com",
        password: "pratik789",
        role: "Employee"
    },
    {
        name: "Ritu Shah",
        email: "ritu@example.com",
        password: "ritu321",
        role: "Employee",
    },
    {
        name: "Nischal Bista",
        email: "nischal@example.com",
        password: "nischal999",
        role: "Employee",
    },
];

export const employer = {
    name: "Sabin Admin",
    email: "sabin@admin.com",
    password: "password123",
    role: "Employer",
};
