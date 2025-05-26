import { Service } from '../../models/Service';
import * as fs from 'fs';
import * as path from 'path';

export const seedServices = async () => {
  try {
    console.log('🌱 Seeding services...');

    await Service.deleteMany({});

    const servicesDataPath = path.join(__dirname, '../data/Services.json');
    const servicesData = JSON.parse(fs.readFileSync(servicesDataPath, 'utf8'));

    const createdServices = await Service.insertMany(servicesData);

    console.log(`✅ Successfully seeded ${createdServices.length} services`);
    return createdServices;
  } catch (error) {
    console.error('❌ Error seeding services:', error);
    throw error;
  }
};
