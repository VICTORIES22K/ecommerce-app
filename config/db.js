const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
    await seedData();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const seedData = async () => {
  const User = require('../models/User');
  const Product = require('../models/Product');

  const adminExists = await User.findOne({ email: 'admin@shop.com' });
  if (!adminExists) {
    const hashed = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'Admin',
      email: 'admin@shop.com',
      password: hashed,
      isAdmin: true
    });
    console.log('Default admin created: admin@shop.com / admin123');
  }

  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    await Product.insertMany([
      { name: 'Wireless Headphones', description: 'Premium noise-cancelling wireless headphones with 30hr battery.', price: 99.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', stock: 50 },
      { name: 'Running Shoes', description: 'Lightweight and breathable running shoes for all terrains.', price: 59.99, category: 'Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', stock: 80 },
      { name: 'Leather Wallet', description: 'Slim genuine leather wallet with RFID blocking.', price: 29.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400', stock: 120 },
      { name: 'Smartwatch', description: 'Feature-rich smartwatch with health tracking and GPS.', price: 199.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', stock: 35 },
      { name: 'Sunglasses', description: 'UV400 polarized sunglasses with titanium frame.', price: 49.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', stock: 60 },
      { name: 'Backpack', description: '30L waterproof backpack with laptop compartment.', price: 79.99, category: 'Bags', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', stock: 45 },
      { name: 'Mechanical Keyboard', description: 'TKL mechanical keyboard with RGB backlight and blue switches.', price: 89.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400', stock: 25 },
      { name: 'Cotton T-Shirt', description: 'Premium 100% organic cotton t-shirt, available in multiple colors.', price: 19.99, category: 'Clothing', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', stock: 200 }
    ]);
    console.log('8 sample products seeded');
  }
};

module.exports = connectDB;