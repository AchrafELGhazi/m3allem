import { Professional } from '../../models/Professional';
import { User } from '../../models/User';

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

    const professionals = [
      // Hassan - Electrician
      {
        userId: professionalUsers.find(
          u => u.email === 'hassan.electricien@m3allem.ma'
        )?._id,
        experienceLevel: 'Khrayfi' as const,
        specializations: ['electrical' as const],
        yearsOfExperience: 12,
        hourlyRate: 180,
        description:
          'Expert electrician with 12 years of experience in residential and commercial electrical work. Specialized in installations, repairs, and troubleshooting.',
        isVerified: true,
        backgroundCheckStatus: 'approved' as const,
        backgroundCheckDate: new Date('2024-01-15'),
        hasCriminalRecord: false,
        licenses: [
          {
            type: 'Electrical License',
            number: 'EL-2024-001',
            issuedBy: 'Ministry of Equipment and Water',
            expiryDate: new Date('2026-01-15'),
          },
        ],
        certifications: [
          {
            name: 'Electrical Safety Certification',
            issuedBy: 'ONEE',
            issuedDate: new Date('2023-06-01'),
            expiryDate: new Date('2025-06-01'),
          },
        ],
        portfolio: [
          {
            title: 'Villa Electrical Installation',
            description: 'Complete electrical installation for 3-bedroom villa',
            imageUrls: [
              'https://example.com/electrical1.jpg',
              'https://example.com/electrical2.jpg',
            ],
            category: 'electrical' as const,
            completedDate: new Date('2024-02-15'),
          },
        ],
        currentLocation: {
          latitude: 33.5731,
          longitude: -7.5898,
          lastUpdated: new Date(),
        },
        workingAreas: [
          {
            city: 'Casablanca',
            region: 'Casablanca-Settat',
            maxDistanceKm: 25,
          },
        ],
        workingHours: {
          monday: { start: '08:00', end: '18:00', available: true },
          tuesday: { start: '08:00', end: '18:00', available: true },
          wednesday: { start: '08:00', end: '18:00', available: true },
          thursday: { start: '08:00', end: '18:00', available: true },
          friday: { start: '08:00', end: '18:00', available: true },
          saturday: { start: '08:00', end: '16:00', available: true },
          sunday: { start: '09:00', end: '13:00', available: false },
        },
        rating: 4.8,
        totalReviews: 45,
        totalJobsCompleted: 48,
        responseTimeMinutes: 15,
        cancellationRate: 2.1,
        onTimePercentage: 96,
        totalEarnings: 28500,
        subscriptionType: 'pro' as const,
        subscriptionExpiryDate: new Date('2024-12-31'),
        accountStatus: 'active' as const,
      },

      // Said - Plumber
      {
        userId: professionalUsers.find(
          u => u.email === 'said.plombier@m3allem.ma'
        )?._id,
        experienceLevel: 'M3allem' as const,
        specializations: ['plumbing' as const],
        yearsOfExperience: 18,
        hourlyRate: 200,
        description:
          'Master plumber with 18 years of experience. Specializing in bathroom renovations, pipe installations, and emergency repairs.',
        isVerified: true,
        backgroundCheckStatus: 'approved' as const,
        backgroundCheckDate: new Date('2024-01-10'),
        hasCriminalRecord: false,
        licenses: [
          {
            type: 'Plumbing License',
            number: 'PL-2024-002',
            issuedBy: 'Ministry of Equipment and Water',
            expiryDate: new Date('2026-01-10'),
          },
        ],
        certifications: [
          {
            name: 'Advanced Plumbing Systems',
            issuedBy: 'OFPPT',
            issuedDate: new Date('2023-03-15'),
            expiryDate: new Date('2025-03-15'),
          },
        ],
        portfolio: [
          {
            title: 'Luxury Bathroom Renovation',
            description:
              'Complete bathroom plumbing renovation with modern fixtures',
            imageUrls: [
              'https://example.com/plumbing1.jpg',
              'https://example.com/plumbing2.jpg',
            ],
            category: 'plumbing' as const,
            completedDate: new Date('2024-01-20'),
          },
        ],
        currentLocation: {
          latitude: 34.0209,
          longitude: -6.8416,
          lastUpdated: new Date(),
        },
        workingAreas: [
          {
            city: 'Rabat',
            region: 'Rabat-Salé-Kénitra',
            maxDistanceKm: 30,
          },
        ],
        workingHours: {
          monday: { start: '07:00', end: '19:00', available: true },
          tuesday: { start: '07:00', end: '19:00', available: true },
          wednesday: { start: '07:00', end: '19:00', available: true },
          thursday: { start: '07:00', end: '19:00', available: true },
          friday: { start: '07:00', end: '19:00', available: true },
          saturday: { start: '08:00', end: '17:00', available: true },
          sunday: { start: '08:00', end: '12:00', available: false },
        },
        rating: 4.9,
        totalReviews: 72,
        totalJobsCompleted: 78,
        responseTimeMinutes: 12,
        cancellationRate: 1.3,
        onTimePercentage: 98,
        totalEarnings: 45200,
        subscriptionType: 'premium' as const,
        subscriptionExpiryDate: new Date('2024-12-31'),
        accountStatus: 'active' as const,
      },
    ];

    // Filter out any professionals without valid user IDs
    const validProfessionals = professionals.filter(prof => prof.userId);

    if (validProfessionals.length === 0) {
      console.log('⚠️  No valid professional user IDs found.');
      return [];
    }

    // Insert professionals
    const createdProfessionals = await Professional.insertMany(
      validProfessionals
    );

    console.log(
      `✅ Successfully seeded ${createdProfessionals.length} professionals`
    );

    return createdProfessionals;
  } catch (error) {
    console.error('❌ Error seeding professionals:', error);
    throw error;
  }
};
