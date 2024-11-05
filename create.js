#!/usr/bin/env node
const { execSync } = require("child_process");

const repoURL = "https://github.com/skshadab1234/CinemaHub";
const projectName = process.argv[2] || "my-nextjs-app";

try {
    execSync(`git clone ${repoURL} ${projectName}`, { stdio: "inherit" });
    process.chdir(projectName);
    execSync("npm install", { stdio: "inherit" });
    console.log("Project setup complete. Run 'npm run dev' to start the development server.");
} catch (error) {
    console.error("Error setting up the project:", error);
}
