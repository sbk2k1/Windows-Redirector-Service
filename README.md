# URL Shortener with Node.js, Express, Apache, and MongoDB

This project is a URL shortener application built with Node.js, Express.js, Apache, and MongoDB. It allows you to create custom word/hyphenated word mappings to websites and automatically redirects the browser to the corresponding URL when the custom word is entered.

## Prerequisites

Before running the application, make sure you have the following dependencies installed:

- Node.js and npm (Node Package Manager)
- Apache web server
- MongoDB

## Installation

- Clone the repository:

   ```shell
   git clone https://github.com/your-username/url-shortener.git

- Navigate to the project directory:

   ```shell
      cd url-shortener

- Navigate to the project directory:

   ```shell
      cd url-shortener

## Apache Configuration

- Install and configure the Apache web server on your machine. Refer to the Apache documentation for detailed instructions.

- Edit the Apache configuration file (httpd.conf) and enable the necessary modules, including mod_rewrite and mod_proxy. Make sure the virtual host configuration is set up    properly to allow URL rewriting and proxying.

- Restart the Apache server to apply the changes.


## Running the Application

- Start the Node.js server:
     ```shell
        node server.js

- Edit the Apache configuration file (httpd.conf) and enable the necessary modules, including mod_rewrite and mod_proxy. Make sure the virtual host configuration is set up    properly to allow URL rewriting and proxying.

- estart the Apache server to apply the changes.


## Testing

- Use the provided HTML form on the homepage (http://localhost:3000) to create new URL mappings.

- Enter a custom word and the corresponding website URL, then click "Create" to create a mapping.

- Test the mappings by entering the custom word in the browser's address bar. The browser should automatically redirect to the corresponding website URL.

## Host File Edit Access

In order for the server to modify the "hosts" file, make sure to provide write access to the file. On Windows, you can do this by right-clicking the hosts file and selecting "Properties". Then, go to the "Security" tab and add write permissions for the appropriate user or group.

## Windows Service Setup
- Install the node-windows package globally:

   ```shell
      npm install -g node-windows

- Create a Windows service for the Node.js application:

   ```shell
   node-windows --install

- Start the service:

   ```shell
   node-windows --start 

The Node.js application will now run as a Windows service, starting automatically whenever your computer starts.

## Author

[@sbk2k1](https://github.com/sbk2k1)

## License

This project is licensed under the GNU License - see the [LICENSE.md](https://github.com/SwapnilChatterjee/DockerFile_Templates/blob/main/LICENSE) file for details.
