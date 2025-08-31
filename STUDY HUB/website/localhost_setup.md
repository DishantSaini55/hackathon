# Local Development Server Setup

This file contains instructions for running your Study Hub website on a local development server.

## Option 1: Using Python's HTTP Server (Recommended)

Python comes with a built-in HTTP server that's perfect for local development.

### Prerequisites:
- Python installed on your computer (Python 3.x recommended)

### Steps:

1. Open a command prompt or terminal
2. Navigate to your website directory:
   ```
   cd c:\Users\pc\Downloads\STUDY HUB\website
   ```
3. Start the server:
   - For Python 3.x:
     ```
     python -m http.server 8000
     ```
   - For Python 2.x:
     ```
     python -m SimpleHTTPServer 8000
     ```
4. Open your web browser and go to:
   ```
   http://localhost:8000
   ```

## Option 2: Using Node.js and http-server

If you prefer using Node.js:

### Prerequisites:
- Node.js installed on your computer

### Steps:

1. Install http-server globally:
   ```
   npm install -g http-server
   ```
2. Navigate to your website directory:
   ```
   cd c:\Users\pc\Downloads\STUDY HUB\website
   ```
3. Start the server:
   ```
   http-server -p 8000
   ```
4. Open your web browser and go to:
   ```
   http://localhost:8000
   ```

## Option 3: Using Visual Studio Code Live Server

If you're using Visual Studio Code:

### Prerequisites:
- Visual Studio Code installed
- Live Server extension installed

### Steps:

1. Open your project folder in VS Code
2. Right-click on the index.html file in the Explorer panel
3. Select "Open with Live Server"
4. The website will automatically open in your default browser

## Troubleshooting

- If you get a "port already in use" error, try changing the port number (e.g., 8080, 9000)
- Make sure no firewall is blocking the port you're using
- If images or resources aren't loading, check that their paths are correct relative to the index.html file
