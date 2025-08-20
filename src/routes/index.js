import MainRouter from "./app/main.js";
import AdminRouter from "./app/admin.js";
import ReceiverRouter from "./app/receiver.js";

export default [
    {
        name: "Main Application",
        path: "/",
        router: MainRouter
    },
    {
        name: "Admin Application",
        path: "/admin",
        router: AdminRouter
    },
    {
        name: "Receiver Application",
        path: "/receiver",
        router: ReceiverRouter
    },
];

// v1
import HealthCheckRouter from "./api/health.js";

export const ApiRoutes = [
    {
        version: "1",
        routes: [
            {
                name: "Health Check",
                path: "/health",
                router: HealthCheckRouter
            }
        ]
    }
]
