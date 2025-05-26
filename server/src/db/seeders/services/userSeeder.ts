import { User } from '../../models/User';
import bcrypt from 'bcryptjs';
import * as fs from 'fs';
import * as path from 'path';

export const seedUsers = async () => {
  try {
    console.log('🌱 Seeding users...');

    await User.deleteMany({});

    const usersDataPath = path.join(__dirname, '../data/Users.json');
    const usersData = JSON.parse(fs.readFileSync(usersDataPath, 'utf8'));

    const users = usersData.map((user: any) => ({
      ...user,
      dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : undefined,
    }));

    const usersWithHashedPasswords = await Promise.all(
      users.map(async (user: any) => {
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12');
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        return {
          ...user,
          password: hashedPassword,
        };
      })
    );

    const createdUsers = await User.insertMany(usersWithHashedPasswords);

    console.log(`✅ Successfully seeded ${createdUsers.length} users`);

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
