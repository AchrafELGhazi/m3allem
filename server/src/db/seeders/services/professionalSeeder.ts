import { Professional } from '../../models/Professional';
import { User } from '../../models/User';
import * as fs from 'fs';
import * as path from 'path';

export const seedProfessionals = async () => {
  try {
    console.log('🌱 Seeding professionals...');

    // Clear existing professionals
    await Professional.deleteMany({});

    // Get professional users
    const professionalUsers = await User.find({ userType: 'professional' });

    if (professionalUsers.length === 0) {
      console.log('⚠️  No professional users found. Please seed users first.');
      return [];
    }

    // Read professionals data from JSON file
    const professionalsDataPath = path.join(
      __dirname,
      '../data/Professionals.json'
    );
    const professionalsData = JSON.parse(
      fs.readFileSync(professionalsDataPath, 'utf8')
    );

    // Convert the data and link with user IDs
    const professionals = professionalsData
      .map((prof: any) => {
        const user = professionalUsers.find(u => u.email === prof.userEmail);

        if (!user) {
          console.log(`⚠️  User not found for email: ${prof.userEmail}`);
          return null;
        }

        // Convert date strings back to Date objects
        const processedProf = {
          ...prof,
          userId: user._id,
          backgroundCheckDate: prof.backgroundCheckDate
            ? new Date(prof.backgroundCheckDate)
            : undefined,
          subscriptionExpiryDate: prof.subscriptionExpiryDate
            ? new Date(prof.subscriptionExpiryDate)
            : undefined,
          currentLocation: {
            ...prof.currentLocation,
            lastUpdated: prof.currentLocation.lastUpdated
              ? new Date(prof.currentLocation.lastUpdated)
              : new Date(),
          },
          licenses:
            prof.licenses?.map((license: any) => ({
              ...license,
              expiryDate: license.expiryDate
                ? new Date(license.expiryDate)
                : undefined,
            })) || [],
          certifications:
            prof.certifications?.map((cert: any) => ({
              ...cert,
              issuedDate: cert.issuedDate
                ? new Date(cert.issuedDate)
                : undefined,
              expiryDate: cert.expiryDate
                ? new Date(cert.expiryDate)
                : undefined,
            })) || [],
          portfolio:
            prof.portfolio?.map((item: any) => ({
              ...item,
              completedDate: item.completedDate
                ? new Date(item.completedDate)
                : undefined,
            })) || [],
        };

        // Remove the userEmail field as it's no longer needed
        delete processedProf.userEmail;

        return processedProf;
      })
      .filter(Boolean); // Remove null entries

    if (professionals.length === 0) {
      console.log('⚠️  No valid professional data found.');
      return [];
    }

    // Insert professionals
    const createdProfessionals = await Professional.insertMany(professionals);

    console.log(
      `✅ Successfully seeded ${createdProfessionals.length} professionals`
    );

    return createdProfessionals;
  } catch (error) {
    console.error('❌ Error seeding professionals:', error);
    throw error;
  }
};
