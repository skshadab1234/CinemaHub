#!/usr/bin/env node
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const repoURL = "https://github.com/skshadab1234/CinemaHub"; // Replace this with your actual repo URL
const projectName = process.argv[2] || "my-nextjs-app";

try {
    // Step 1: Clone the repository
    console.log("Cloning the repository...");
    execSync(`git clone ${repoURL} ${projectName}`, { stdio: "inherit" });
    
    // Step 2: Change to the project directory
    process.chdir(projectName);
    
    // Step 3: Install dependencies
    console.log("Installing dependencies...");
    execSync("npm install", { stdio: "inherit" });

    // Step 4: Remove unnecessary files
    console.log("Cleaning up setup files...");
    fs.unlinkSync(path.join(process.cwd(), "create.js")); // Delete the create.js script
    const packageJsonPath = path.join(process.cwd(), "package.json");

    // Remove "bin" field from package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
    if (packageJson.bin) {
        delete packageJson.bin;
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    }

    console.log("Project setup complete. Run 'npm run dev' to start the development server.");
} catch (error) {
    console.error("Error setting up the project:", error);
}
