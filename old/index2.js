//question => file handling using http and express

const http = require('http');
const fs = require('fs');
const path = require('path');

const main = (req, res) => {
    const urlPath = new URL(req.url, `http://${req.headers.host}`);

    const pathname = urlPath.pathname;
    const filename = urlPath.searchParams.get('filename');
    const content = urlPath.searchParams.get('content');

    const fileDir = path.join(__dirname, 'files');

    // Validate filename
    if (
        !filename ||
        filename.includes('/') ||
        filename.includes('\\') ||
        filename === '.' ||
        filename === '..'
    ) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('A valid filename is required');
        return;
    }

    const filepath = path.resolve(fileDir, filename);

    // DELETE: Delete an existing file
    if (pathname === '/delete' && req.method === 'DELETE') {
        fs.unlink(filepath, (err) => {
            if (err) {
                res.writeHead(
                    err.code === 'ENOENT' ? 404 : 500,
                    { 'Content-Type': 'text/plain' }
                );

                res.end(
                    err.code === 'ENOENT'
                        ? 'File not found'
                        : 'Error deleting file'
                );
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File deleted successfully');
        });

        return;
    }

    // PUT: Update an existing file
    if (pathname === '/update' && req.method === 'PUT') {
        if (content === null) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Content is required for update');
            return;
        }

        fs.writeFile(filepath, content, { flag: 'r+' }, (err) => {
            if (err) {
                res.writeHead(
                    err.code === 'ENOENT' ? 404 : 500,
                    { 'Content-Type': 'text/plain' }
                );

                res.end(
                    err.code === 'ENOENT'
                        ? 'File not found'
                        : 'Error updating file'
                );
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File updated successfully');
        });

        return;
    }

    // POST: Create a new file
    if (pathname === '/write' && req.method === 'POST') {
        if (content === null || content.length === 0) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('File content is required');
            return;
        }

        fs.writeFile(filepath, content, { flag: 'wx' }, (err) => {
            if (err) {
                res.writeHead(
                    err.code === 'EEXIST' ? 409 : 500,
                    { 'Content-Type': 'text/plain' }
                );

                res.end(
                    err.code === 'EEXIST'
                        ? 'File already exists'
                        : 'Error writing file'
                );
                return;
            }

            res.writeHead(201, { 'Content-Type': 'text/plain' });
            res.end('File created successfully');
        });

        return;
    }

    // GET: Read a file
    if (pathname === '/read' && req.method === 'GET') {
        fs.readFile(filepath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(
                    err.code === 'ENOENT' ? 404 : 500,
                    { 'Content-Type': 'text/plain' }
                );

                res.end(
                    err.code === 'ENOENT'
                        ? 'File not found'
                        : 'Error reading file'
                );
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });

        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Route not found');
};

const server = http.createServer(main);

server.listen(3000, (error) => {
    if (error) {
        console.log('Error in starting server:', error);
        return;
    }

    console.log('Server is running on port 3000');
});





