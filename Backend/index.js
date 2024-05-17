const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mssql = require('mssql');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');


app.use(cors({
    origin: 'http://localhost:3001',
}));

app.use(express.json());

const config = {
    user: 'sa',
    password: '123456',
    server: 'DESKTOP-AGOLKD7',
    database: 'NewsApp',
    options: {
        encrypt: true,
        connectTimeout: 30000,
        trustServerCertificate: true,
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
};

app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const pool = await mssql.connect(config);
        await pool.request()
            .input('Name', mssql.NVarChar, name)
            .input('Email', mssql.NVarChar, email)
            .input('Password', mssql.NVarChar, hashedPassword)
            .query('INSERT INTO Singup (name, email, password) VALUES (@Name, @Email, @Password)');
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// app.post('/api/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const pool = await mssql.connect(config);
//         const result = await pool
//             .request()
//             .input('email', mssql.NVarChar, email)
//             .query('SELECT * FROM Singup WHERE email = @email');
//         const user = result.recordset[0];

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.Password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ userId: user.id }, 'secret_key');
//         res.json({ token, name: user.name }); // Return user's name along with the token
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// GET method to fetch user information
app.get('/api/user', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const pool = await mssql.connect(config);
        const result = await pool.request()
            .input('userId', mssql.Int, userId)
            .query('SELECT Name FROM Singup WHERE userId = @userId');
        
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = result.recordset[0];
        res.json({ Name: user.Name });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const pool = await mssql.connect(config);
        const result = await pool
            .request()
            .input('email', mssql.NVarChar, email)
            .query('SELECT * FROM Singup WHERE email = @email');
        const user = result.recordset[0];

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.Password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.userId }, 'secret_key');
        res.json({ token, userId: user.userId, Name: user.Name });
        // Return userId along with the token
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }

    try {
        // Extract the token value without "Bearer "
        const tokenValue = token.split(' ')[1];

        // Decode and verify the token
        const decoded = jwt.verify(tokenValue, 'secret_key');

        // Log the decoded token for debugging
        console.log('Decoded token:', decoded);

        // Set userId in the request object
        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.error('Error decoding token:', err);
        res.status(401).json({ message: 'Invalid token' });
    }
}



// POST method to add news
// app.post('/api/newsblog', async (req, res) => {
//     try {
//         const { title, category, shortDescription, longDescription ,imageUrl ,userId} = req.body;

//         const pool = await mssql.connect(config);
//         await pool
//             .request()
//             .input('Title', mssql.NVarChar, title)
//             .input('shortDescription', mssql.NVarChar, shortDescription)
//             .input('category', mssql.NVarChar, category)
//             .input('longDescription', mssql.NVarChar, longDescription)
//             .input('imageUrl',mssql.NVarChar,imageUrl)
//             .input('userId',mssql.Int,)
//             .query('INSERT INTO NewsBlog (title, shortDescription, category, longDescription,imageUrl,userId) VALUES (@title, @shortDescription, @category, @longDescription,@imageUrl,@userId)');
//         res.json({ message: 'News added successfully' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// POST method to add news
app.post('/api/newsblog',verifyToken, async (req, res) => {
    try {
        const { title, category, shortDescription, longDescription, imageUrl } = req.body;
        const userId = req.userId; // Retrieve userId from the request

        const pool = await mssql.connect(config);
        await pool
            .request()
            .input('Title', mssql.NVarChar, title)
            .input('shortDescription', mssql.NVarChar, shortDescription)
            .input('category', mssql.NVarChar, category)
            .input('longDescription', mssql.NVarChar, longDescription)
            .input('imageUrl', mssql.NVarChar, imageUrl)
            .input('userId', mssql.Int, userId) // Insert userId into the query
            .query('INSERT INTO NewsBlog (title, shortDescription, category, longDescription, imageUrl, userId) VALUES (@title, @shortDescription, @category, @longDescription, @imageUrl, @userId)');
        res.json({ message: 'News added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// GET method to fetch all news
app.get('/api/newsblog', async (req, res) => {
    try {
        const pool = await mssql.connect(config);
        const result = await pool.request().query('select Name,Title,shortDescription,category,longDescription,imageUrl from Singup join  NewsBlog on NewsBlog.userId=Singup.userId');
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
