import mongoose, { Document, Schema } from 'mongoose';

export type ExperienceLevel = 'Snaaï' | 'Khrayfi' | 'M3allem';
export type ServiceCategory =
  | 'electrical'
  | 'plumbing'
  | 'painting'
  | 'tiling'
  | 'plastering'
  | 'furniture_assembly'
  | 'ac_repair'
  | 'carpentry'
  | 'beauty'
  | 'hair';

export interface IProfessional extends Document {
  userId: mongoose.Types.ObjectId;

  // Professional Information
  experienceLevel: ExperienceLevel;
  specializations: ServiceCategory[];
  yearsOfExperience: number;
  hourlyRate: number;
  description?: string;

  // Verification & Credentials
  isVerified: boolean;
  backgroundCheckStatus: 'pending' | 'approved' | 'rejected' | 'expired';
  backgroundCheckDate?: Date;
  hasCriminalRecord: boolean;
  criminalRecordDetails?: string;
  licenses: {
    type: string;
    number: string;
    issuedBy: string;
    expiryDate?: Date;
    documentUrl?: string;
  }[];
  certifications: {
    name: string;
    issuedBy: string;
    issuedDate: Date;
    expiryDate?: Date;
    documentUrl?: string;
  }[];

  // Portfolio & Work
  portfolio: {
    title: string;
    description?: string;
    imageUrls: string[];
    category: ServiceCategory;
    completedDate: Date;
  }[];

  // Availability & Location
  isAvailable: boolean;
  currentLocation?: {
    latitude: number;
    longitude: number;
    lastUpdated: Date;
  };
  workingAreas: {
    city: string;
    region: string;
    maxDistanceKm: number;
  }[];
  workingHours: {
    [key: string]: {
      start: string;
      end: string;
      available: boolean;
    };
  };

  // Business Information
  businessName?: string;
  taxId?: string;
  insurancePolicy?: {
    provider: string;
    policyNumber: string;
    expiryDate: Date;
    coverageAmount: number;
  };

  // Performance Metrics
  rating: number;
  totalReviews: number;
  totalJobsCompleted: number;
  responseTimeMinutes: number;
  cancellationRate: number;
  onTimePercentage: number;

  // Financial
  totalEarnings: number;
  subscriptionType?: 'basic' | 'pro' | 'premium';
  subscriptionExpiryDate?: Date;

  // Status
  accountStatus: 'pending' | 'active' | 'suspended' | 'rejected';
  suspensionReason?: string;
  rejectionReason?: string;

  createdAt: Date;
  updatedAt: Date;
}

const professionalSchema = new Schema<IProfessional>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    experienceLevel: {
      type: String,
      required: true,
      enum: ['Snaaï', 'Khrayfi', 'M3allem'],
      default: 'Snaaï',
    },
    specializations: [
      {
        type: String,
        enum: [
          'electrical',
          'plumbing',
          'painting',
          'tiling',
          'plastering',
          'furniture_assembly',
          'ac_repair',
          'carpentry',
          'beauty',
          'hair',
        ],
        required: true,
      },
    ],
    yearsOfExperience: {
      type: Number,
      required: true,
      min: [0, 'Years of experience cannot be negative'],
      max: [50, 'Years of experience seems too high'],
    },
    hourlyRate: {
      type: Number,
      required: true,
      min: [50, 'Hourly rate must be at least 50 MAD'],
      max: [1000, 'Hourly rate cannot exceed 1000 MAD'],
    },
    description: {
      type: String,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    backgroundCheckStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'expired'],
      default: 'pending',
    },
    backgroundCheckDate: Date,
    hasCriminalRecord: {
      type: Boolean,
      default: false,
    },
    criminalRecordDetails: String,
    licenses: [
      {
        type: {
          type: String,
          required: true,
        },
        number: {
          type: String,
          required: true,
        },
        issuedBy: {
          type: String,
          required: true,
        },
        expiryDate: Date,
        documentUrl: String,
      },
    ],
    certifications: [
      {
        name: {
          type: String,
          required: true,
        },
        issuedBy: {
          type: String,
          required: true,
        },
        issuedDate: {
          type: Date,
          required: true,
        },
        expiryDate: Date,
        documentUrl: String,
      },
    ],
    portfolio: [
      {
        title: {
          type: String,
          required: true,
          maxlength: [100, 'Portfolio title cannot exceed 100 characters'],
        },
        description: {
          type: String,
          maxlength: [
            500,
            'Portfolio description cannot exceed 500 characters',
          ],
        },
        imageUrls: [
          {
            type: String,
            required: true,
          },
        ],
        category: {
          type: String,
          required: true,
          enum: [
            'electrical',
            'plumbing',
            'painting',
            'tiling',
            'plastering',
            'furniture_assembly',
            'ac_repair',
            'carpentry',
            'beauty',
            'hair',
          ],
        },
        completedDate: {
          type: Date,
          required: true,
        },
      },
    ],
    isAvailable: {
      type: Boolean,
      default: true,
    },
    currentLocation: {
      latitude: {
        type: Number,
        min: [-90, 'Latitude must be between -90 and 90'],
        max: [90, 'Latitude must be between -90 and 90'],
      },
      longitude: {
        type: Number,
        min: [-180, 'Longitude must be between -180 and 180'],
        max: [180, 'Longitude must be between -180 and 180'],
      },
      lastUpdated: {
        type: Date,
        default: Date.now,
      },
    },
    workingAreas: [
      {
        city: {
          type: String,
          required: true,
        },
        region: {
          type: String,
          required: true,
        },
        maxDistanceKm: {
          type: Number,
          required: true,
          min: [1, 'Maximum distance must be at least 1 km'],
          max: [100, 'Maximum distance cannot exceed 100 km'],
        },
      },
    ],
    workingHours: {
      monday: {
        start: String,
        end: String,
        available: { type: Boolean, default: true },
      },
      tuesday: {
        start: String,
        end: String,
        available: { type: Boolean, default: true },
      },
      wednesday: {
        start: String,
        end: String,
        available: { type: Boolean, default: true },
      },
      thursday: {
        start: String,
        end: String,
        available: { type: Boolean, default: true },
      },
      friday: {
        start: String,
        end: String,
        available: { type: Boolean, default: true },
      },
      saturday: {
        start: String,
        end: String,
        available: { type: Boolean, default: true },
      },
      sunday: {
        start: String,
        end: String,
        available: { type: Boolean, default: false },
      },
    },
    businessName: String,
    taxId: String,
    insurancePolicy: {
      provider: String,
      policyNumber: String,
      expiryDate: Date,
      coverageAmount: Number,
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be negative'],
      max: [5, 'Rating cannot exceed 5'],
    },
    totalReviews: {
      type: Number,
      default: 0,
      min: [0, 'Total reviews cannot be negative'],
    },
    totalJobsCompleted: {
      type: Number,
      default: 0,
      min: [0, 'Total jobs completed cannot be negative'],
    },
    responseTimeMinutes: {
      type: Number,
      default: 0,
      min: [0, 'Response time cannot be negative'],
    },
    cancellationRate: {
      type: Number,
      default: 0,
      min: [0, 'Cancellation rate cannot be negative'],
      max: [100, 'Cancellation rate cannot exceed 100%'],
    },
    onTimePercentage: {
      type: Number,
      default: 100,
      min: [0, 'On-time percentage cannot be negative'],
      max: [100, 'On-time percentage cannot exceed 100%'],
    },
    totalEarnings: {
      type: Number,
      default: 0,
      min: [0, 'Total earnings cannot be negative'],
    },
    subscriptionType: {
      type: String,
      enum: ['basic', 'pro', 'premium'],
      default: 'basic',
    },
    subscriptionExpiryDate: Date,
    accountStatus: {
      type: String,
      enum: ['pending', 'active', 'suspended', 'rejected'],
      default: 'pending',
    },
    suspensionReason: String,
    rejectionReason: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
professionalSchema.index({ userId: 1 });
professionalSchema.index({ experienceLevel: 1 });
professionalSchema.index({ specializations: 1 });
professionalSchema.index({ isAvailable: 1 });
professionalSchema.index({ rating: -1 });
professionalSchema.index({ hourlyRate: 1 });
professionalSchema.index({ accountStatus: 1 });
professionalSchema.index({ currentLocation: '2dsphere' });
professionalSchema.index({ 'workingAreas.city': 1, 'workingAreas.region': 1 });

// Virtual populate for user data
professionalSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

// Virtual for experience badge color
professionalSchema.virtual('experienceBadgeColor').get(function () {
  switch (this.experienceLevel) {
    case 'Snaaï':
      return '#3B82F6'; // Blue
    case 'Khrayfi':
      return '#10B981'; // Green
    case 'M3allem':
      return '#F59E0B'; // Gold
    default:
      return '#6B7280'; // Gray
  }
});

export const Professional = mongoose.model<IProfessional>(
  'Professional',
  professionalSchema
);
