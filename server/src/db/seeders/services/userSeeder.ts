import { User } from '../../models/User';
import bcrypt from 'bcryptjs';

const users = [
  // Admin User
  {
    firstName: 'Ahmed',
    lastName: 'Admin',
    email: 'admin@m3allem.ma',
    password: 'Admin123!',
    phone: '+212661234567',
    userType: 'admin',
    isVerified: true,
    isActive: true,
    address: {
      city: 'Casablanca',
      region: 'Casablanca-Settat',
      country: 'Morocco',
      coordinates: {
        latitude: 33.5731,
        longitude: -7.5898,
      },
    },
    language: 'fr',
  },

  // Customer Users
  {
    firstName: 'Youssef',
    lastName: 'Bennani',
    email: 'youssef.bennani@gmail.com',
    password: 'Customer123!',
    phone: '+212662345678',
    userType: 'customer',
    isVerified: true,
    isActive: true,
    dateOfBirth: new Date('1990-05-15'),
    gender: 'male',
    address: {
      street: 'Rue des Orangers, Quartier Maarif',
      city: 'Casablanca',
      region: 'Casablanca-Settat',
      postalCode: '20100',
      country: 'Morocco',
      coordinates: {
        latitude: 33.5892,
        longitude: -7.6036,
      },
    },
    language: 'ar',
    notificationPreferences: {
      email: true,
      push: true,
      sms: false,
    },
  },
  {
    firstName: 'Fatima',
    lastName: 'El Mansouri',
    email: 'fatima.elmansouri@hotmail.com',
    password: 'Customer123!',
    phone: '+212663456789',
    userType: 'customer',
    isVerified: true,
    isActive: true,
    dateOfBirth: new Date('1985-12-03'),
    gender: 'female',
    address: {
      street: 'Avenue Hassan II',
      city: 'Rabat',
      region: 'Rabat-Salé-Kénitra',
      postalCode: '10000',
      country: 'Morocco',
      coordinates: {
        latitude: 34.0209,
        longitude: -6.8416,
      },
    },
    language: 'fr',
  },
  {
    firstName: 'Omar',
    lastName: 'Tazi',
    email: 'omar.tazi@yahoo.com',
    password: 'Customer123!',
    phone: '+212664567890',
    userType: 'customer',
    isVerified: true,
    isActive: true,
    dateOfBirth: new Date('1988-08-20'),
    gender: 'male',
    address: {
      street: 'Rue de la Liberté',
      city: 'Marrakech',
      region: 'Marrakech-Safi',
      postalCode: '40000',
      country: 'Morocco',
      coordinates: {
        latitude: 31.6295,
        longitude: -7.9811,
      },
    },
    language: 'ar',
  },

  // Professional Base Users (will be linked to Professional profiles)
  {
    firstName: 'Hassan',
    lastName: 'Electricien',
    email: 'hassan.electricien@m3allem.ma',
    password: 'Professional123!',
    phone: '+212665678901',
    userType: 'professional',
    isVerified: true,
    isActive: true,
    dateOfBirth: new Date('1982-03-10'),
    gender: 'male',
    address: {
      street: 'Derb El Kabir',
      city: 'Casablanca',
      region: 'Casablanca-Settat',
      country: 'Morocco',
      coordinates: {
        latitude: 33.5731,
        longitude: -7.5898,
      },
    },
    language: 'ar',
  },
  {
    firstName: 'Said',
    lastName: 'Plombier',
    email: 'said.plombier@m3allem.ma',
    password: 'Professional123!',
    phone: '+212666789012',
    userType: 'professional',
    isVerified: true,
    isActive: true,
    dateOfBirth: new Date('1979-11-25'),
    gender: 'male',
    address: {
      street: 'Hay Riad',
      city: 'Rabat',
      region: 'Rabat-Salé-Kénitra',
      country: 'Morocco',
      coordinates: {
        latitude: 34.0209,
        longitude: -6.8416,
      },
    },
    language: 'ar',
  },
  {
    firstName: 'Khalid',
    lastName: 'Peintre',
    email: 'khalid.peintre@m3allem.ma',
    password: 'Professional123!',
    phone: '+212667890123',
    userType: 'professional',
    isVerified: true,
    isActive: true,
    dateOfBirth: new Date('1985-07-14'),
    gender: 'male',
    address: {
      street: 'Quartier Gueliz',
      city: 'Marrakech',
      region: 'Marrakech-Safi',
      country: 'Morocco',
      coordinates: {
        latitude: 31.6295,
        longitude: -7.9811,
      },
    },
    language: 'fr',
  },
  {
    firstName: 'Mustapha',
    lastName: 'Carreleur',
    email: 'mustapha.carreleur@m3allem.ma',
    password: 'Professional123!',
    phone: '+212668901234',
    userType: 'professional',
    isVerified: true,
    isActive: true,
    dateOfBirth: new Date('1980-01-30'),
    gender: 'male',
    address: {
      street: 'Hay Salam',
      city: 'Fès',
      region: 'Fès-Meknès',
      country: 'Morocco',
      coordinates: {
        latitude: 34.0181,
        longitude: -5.0078,
      },
    },
    language: 'ar',
  },
  {
    firstName: 'Abdellah',
    lastName: 'Menuisier',
    email: 'abdellah.menuisier@m3allem.ma',
    password: 'Professional123!',
    phone: '+212669012345',
    userType: 'professional',
    isVerified: true,
    isActive: true,
    dateOfBirth: new Date('1975-09-18'),
    gender: 'male',
    address: {
      street: 'Quartier Industriel',
      city: 'Casablanca',
      region: 'Casablanca-Settat',
      country: 'Morocco',
      coordinates: {
        latitude: 33.5731,
        longitude: -7.5898,
      },
    },
    language: 'ar',
  },
  {
    firstName: 'Aicha',
    lastName: 'Coiffeuse',
    email: 'aicha.coiffeuse@m3allem.ma',
    password: 'Professional123!',
    phone: '+212670123456',
    userType: 'professional',
    isVerified: true,
    isActive: true,
    dateOfBirth: new Date('1987-04-12'),
    gender: 'female',
    address: {
      street: 'Centre Ville',
      city: 'Rabat',
      region: 'Rabat-Salé-Kénitra',
      country: 'Morocco',
      coordinates: {
        latitude: 34.0209,
        longitude: -6.8416,
      },
    },
    language: 'fr',
  },
  {
    firstName: 'Nadia',
    lastName: 'Estheticienne',
    email: 'nadia.estheticienne@m3allem.ma',
    password: 'Professional123!',
    phone: '+212671234567',
    userType: 'professional',
    isVerified: true,
    isActive: true,
    dateOfBirth: new Date('1990-02-28'),
    gender: 'female',
    address: {
      street: 'Quartier Hivernage',
      city: 'Marrakech',
      region: 'Marrakech-Safi',
      country: 'Morocco',
      coordinates: {
        latitude: 31.6295,
        longitude: -7.9811,
      },
    },
    language: 'fr',
  },
];

export const seedUsers = async () => {
  try {
    console.log('🌱 Seeding users...');

    // Clear existing users
    await User.deleteMany({});

    // Hash passwords before inserting
    const usersWithHashedPasswords = await Promise.all(
      users.map(async user => {
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12');
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        return {
          ...user,
          password: hashedPassword,
        };
      })
    );

    // Insert users
    const createdUsers = await User.insertMany(usersWithHashedPasswords);

    console.log(`✅ Successfully seeded ${createdUsers.length} users`);

    // Return users categorized by type for easy reference
    const categorizedUsers = {
      admin: createdUsers.filter(user => user.userType === 'admin'),
      customers: createdUsers.filter(user => user.userType === 'customer'),
      professionals: createdUsers.filter(
        user => user.userType === 'professional'
      ),
    };

    console.log(`   📊 Admin: ${categorizedUsers.admin.length}`);
    console.log(`   📊 Customers: ${categorizedUsers.customers.length}`);
    console.log(
      `   📊 Professionals: ${categorizedUsers.professionals.length}`
    );

    return categorizedUsers;
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  }
};
