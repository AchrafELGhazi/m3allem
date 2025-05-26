import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  name: string;
  nameAr: string;
  nameFr: string;
  category: string;
  subcategory?: string;
  description: string;
  descriptionAr: string;
  descriptionFr: string;
  icon: string;
  isActive: boolean;
  averagePrice: {
    min: number;
    max: number;
    unit: 'hour' | 'job' | 'sqm' | 'piece';
  };
  estimatedDuration: {
    min: number;
    max: number;
    unit: 'minutes' | 'hours' | 'days';
  };
  requiredExperienceLevel: 'Snaaï' | 'Khrayfi' | 'M3allem';
  tags: string[];
  popularityScore: number;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<IService>(
  {
    name: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true,
      maxlength: [100, 'Service name cannot exceed 100 characters'],
    },
    nameAr: {
      type: String,
      required: [true, 'Arabic service name is required'],
      trim: true,
      maxlength: [100, 'Arabic service name cannot exceed 100 characters'],
    },
    nameFr: {
      type: String,
      required: [true, 'French service name is required'],
      trim: true,
      maxlength: [100, 'French service name cannot exceed 100 characters'],
    },
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
        'cleaning',
        'gardening',
        'moving',
        'appliance_repair',
      ],
    },
    subcategory: {
      type: String,
      maxlength: [50, 'Subcategory cannot exceed 50 characters'],
    },
    description: {
      type: String,
      required: [true, 'Service description is required'],
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    descriptionAr: {
      type: String,
      required: [true, 'Arabic description is required'],
      maxlength: [500, 'Arabic description cannot exceed 500 characters'],
    },
    descriptionFr: {
      type: String,
      required: [true, 'French description is required'],
      maxlength: [500, 'French description cannot exceed 500 characters'],
    },
    icon: {
      type: String,
      required: [true, 'Service icon is required'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    averagePrice: {
      min: {
        type: Number,
        required: true,
        min: [0, 'Minimum price cannot be negative'],
      },
      max: {
        type: Number,
        required: true,
        min: [0, 'Maximum price cannot be negative'],
      },
      unit: {
        type: String,
        required: true,
        enum: ['hour', 'job', 'sqm', 'piece'],
      },
    },
    estimatedDuration: {
      min: {
        type: Number,
        required: true,
        min: [1, 'Minimum duration must be at least 1'],
      },
      max: {
        type: Number,
        required: true,
        min: [1, 'Maximum duration must be at least 1'],
      },
      unit: {
        type: String,
        required: true,
        enum: ['minutes', 'hours', 'days'],
      },
    },
    requiredExperienceLevel: {
      type: String,
      enum: ['Snaaï', 'Khrayfi', 'M3allem'],
      default: 'Snaaï',
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
        maxlength: [30, 'Tag cannot exceed 30 characters'],
      },
    ],
    popularityScore: {
      type: Number,
      default: 0,
      min: [0, 'Popularity score cannot be negative'],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
serviceSchema.index({ category: 1 });
serviceSchema.index({ isActive: 1 });
serviceSchema.index({ popularityScore: -1 });
serviceSchema.index({ tags: 1 });
serviceSchema.index({ requiredExperienceLevel: 1 });
serviceSchema.index({ name: 'text', nameAr: 'text', nameFr: 'text' }); // Text search

// Virtual for localized name based on language
serviceSchema.virtual('localizedName').get(function () {
  // This would be set by the controller based on request language
  return this.name; // Default to English
});

// Pre-save validation
serviceSchema.pre('save', function (next) {
  // Validate that min price is not greater than max price
  if (this.averagePrice.min > this.averagePrice.max) {
    return next(
      new Error('Minimum price cannot be greater than maximum price')
    );
  }

  // Validate that min duration is not greater than max duration
  if (this.estimatedDuration.min > this.estimatedDuration.max) {
    return next(
      new Error('Minimum duration cannot be greater than maximum duration')
    );
  }

  next();
});

// Static method to get services by category
serviceSchema.statics.getByCategory = function (category: string) {
  return this.find({ category, isActive: true }).sort({ popularityScore: -1 });
};

// Static method to search services
serviceSchema.statics.search = function (
  query: string,
  language: 'en' | 'ar' | 'fr' = 'en'
) {
  const searchField =
    language === 'ar' ? 'nameAr' : language === 'fr' ? 'nameFr' : 'name';
  return this.find({
    $and: [
      { isActive: true },
      {
        $or: [
          { [searchField]: { $regex: query, $options: 'i' } },
          { tags: { $in: [new RegExp(query, 'i')] } },
        ],
      },
    ],
  }).sort({ popularityScore: -1 });
};

// Instance method to increment popularity
serviceSchema.methods.incrementPopularity = function () {
  this.popularityScore += 1;
  return this.save();
};

export const Service = mongoose.model<IService>('Service', serviceSchema);
