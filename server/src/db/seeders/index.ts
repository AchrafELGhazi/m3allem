import dotenv from 'dotenv';
import { connectDatabase, disconnectDatabase } from '../../config/database';
import { seedUsers } from './services/userSeeder';
import { seedProfessionals } from './services/professionalSeeder';
import { seedServices } from './services/serviceSeeder';


dotenv.config();

const runSeeders = async () => {
  try {
    console.log('🚀 Starting M3allem database seeding...\n');

    await connectDatabase();

    console.log('1️⃣ Seeding Users...');
    const users = await seedUsers();
    console.log('');

    console.log('2️⃣ Seeding Services...');
    const services = await seedServices();
    console.log('');

    console.log('3️⃣ Seeding Professionals...');
    const professionals = await seedProfessionals();
    console.log('');

    console.log('🎉 Database seeding completed successfully!\n');
    console.log('📊 SEEDING SUMMARY:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(
      `👥 Total Users: ${
        users.admin.length + users.customers.length + users.professionals.length
      }`
    );
    console.log(`   • Admin: ${users.admin.length}`);
    console.log(`   • Customers: ${users.customers.length}`);
    console.log(`   • Professional Users: ${users.professionals.length}`);
    console.log(`🔧 Services: ${services.length}`);
    console.log(`👨‍💼 Professional Profiles: ${professionals.length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('📋 TEST ACCOUNTS:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔐 Admin Account:');
    console.log('   Email: admin@m3allem.ma');
    console.log('   Password: Admin123!\n');

    console.log('👤 Customer Accounts:');
    console.log('   Email: youssef.bennani@gmail.com');
    console.log('   Email: fatima.elmansouri@hotmail.com');
    console.log('   Email: omar.tazi@yahoo.com');
    console.log('   Password: Customer123!\n');

    console.log('🔧 Professional Accounts:');
    console.log('   Email: hassan.electricien@m3allem.ma (Electrician)');
    console.log('   Email: said.plombier@m3allem.ma (Plumber)');
    console.log('   Email: khalid.peintre@m3allem.ma (Painter)');
    console.log('   Email: mustapha.carreleur@m3allem.ma (Tiler)');
    console.log('   Email: abdellah.menuisier@m3allem.ma (Carpenter)');
    console.log('   Email: aicha.coiffeuse@m3allem.ma (Hair Stylist)');
    console.log('   Email: nadia.estheticienne@m3allem.ma (Beauty Specialist)');
    console.log('   Password: Professional123!\n');

    console.log('💡 Next Steps:');
    console.log('   • Start your server: npm run dev');
    console.log('   • Test login with any of the accounts above');
    console.log('   • Check the API at: http://localhost:3000/health');
    console.log('   • API Documentation: http://localhost:3000/api/v1');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await disconnectDatabase();
    process.exit(0);
  }
};

if (require.main === module) {
  runSeeders();
}

export { runSeeders };
