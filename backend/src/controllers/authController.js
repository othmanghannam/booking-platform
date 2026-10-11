const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Fonction utilitaire pour générer le token JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// @desc    Inscription d'un nouvel utilisateur
// @route   POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    // 1. Vérifier si les champs obligatoires sont présents
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Veuillez remplir tous les champs obligatoires.' });
    }

    // 2. Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // 3. Hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Créer l'utilisateur dans MongoDB
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'client',
      phone: phone || '',
    });

    // 5. Répondre avec les données utilisateur et le token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// @desc    Connexion d'un utilisateur existant
// @route   POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Vérifier la saisie
    if (!email || !password) {
      return res.status(400).json({ message: 'Veuillez fournir un email et un mot de passe.' });
    }

    // 2. Chercher l'utilisateur dans la base
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Identifiants invalides.' });
    }

    // 3. Comparer le mot de passe en clair avec le hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Identifiants invalides.' });
    }

    // 4. Répondre avec les informations et le token
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

module.exports = {
  register,
  login,
};