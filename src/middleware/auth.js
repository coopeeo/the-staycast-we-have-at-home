import auth from 'basic-auth';
export default (request, response, next) => {
    const credentials = auth(request);
    if (credentials && credentials.name == process.env.ADMIN_USERNAME && credentials.pass == process.env.ADMIN_PASSWORD) {
        return next();
    }

    response.set('WWW-Authenticate', 'Basic realm="Admin Panel"');
    return response.status(401).send("Denied");
};
