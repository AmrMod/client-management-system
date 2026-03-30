const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addUsers =  async (req, res) => {
    try{
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
    }


    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    });
    res.status(201).json(newUser);      
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    try{
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addUsers,
    login
}