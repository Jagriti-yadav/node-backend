const authMiddleware = (req, res, next) => {
const token = req.headers.authorization;

```
if (token === "my-secret-token") {
    next();
} else {
    res.status(401).json({
        message: "Unauthorized! Please log in first."
    });
}
```

};

module.exports = authMiddleware;
