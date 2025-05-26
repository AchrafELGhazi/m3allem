import mongoose, { Document, Schema } from 'mongoose';

export type BookingStatus =
  | 'pending'
  | 'accepted'
  | 'professional_en_route'
  | 'professional_arrived'
  | 'in_progress'
  | 'completed'
  | 'cancelled_by_customer'
  | 'cancelled_by_professional'
  | 'cancelled_by_admin';

export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'failed';
export type PaymentMethod = 'cash' | 'card' | 'bank_transfer';

export interface IBooking extends Document {
  customerId: mongoose.Types.ObjectId;
  professionalId: mongoose.Types.ObjectId;
  serviceId: mongoose.Types.ObjectId;

  title: string;
  description?: string;
  urgency: 'low' | 'medium' | 'high' | 'emergency';

  preferredDate: Date;
  preferredTimeSlot: {
    start: string;
    end: string;
  };
  estimatedDuration: number;
  actualStartTime?: Date;
  actualEndTime?: Date;

  serviceLocation: {
    address: string;
    city: string;
    region: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    accessInstructions?: string;
  };

  status: BookingStatus;
  statusHistory: {
    status: BookingStatus;
    timestamp: Date;
    note?: string;
    changedBy: mongoose.Types.ObjectId;
  }[];

  pricing: {
    hourlyRate: number;
    estimatedHours: number;
    subtotal: number;
    platformFee: number;
    totalAmount: number;
    currency: string;
  };

  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentReference?: string;
  paymentDate?: Date;

  customerNotes?: string;
  professionalNotes?: string;
  adminNotes?: string;

  professionalLocation?: {
    latitude: number;
    longitude: number;
    lastUpdated: Date;
  };
  estimatedArrivalTime?: Date;
  actualArrivalTime?: Date;

  workCompletedImages?: string[];
  customerSignature?: string;
  issuesReported?: {
    description: string;
    images?: string[];
    reportedBy: 'customer' | 'professional';
    timestamp: Date;
  }[];

  customerRating?: {
    rating: number;
    comment?: string;
    ratedAt: Date;
  };
  professionalRating?: {
    rating: number;
    comment?: string;
    ratedAt: Date;
  };

  cancellationReason?: string;
  cancellationDate?: Date;
  cancellationFee?: number;
  refundAmount?: number;

  isRescheduled: boolean;
  rescheduleCount: number;
  isRepeatBooking: boolean;
  originalBookingId?: mongoose.Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    professionalId: {
      type: Schema.Types.ObjectId,
      ref: 'Professional',
      required: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Booking title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    urgency: {
      type: String,
      enum: ['low', 'medium', 'high', 'emergency'],
      default: 'medium',
    },
    preferredDate: {
      type: Date,
      required: [true, 'Preferred date is required'],
    },
    preferredTimeSlot: {
      start: {
        type: String,
        required: true,
        match: [
          /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
          'Invalid time format. Use HH:mm',
        ],
      },
      end: {
        type: String,
        required: true,
        match: [
          /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
          'Invalid time format. Use HH:mm',
        ],
      },
    },
    estimatedDuration: {
      type: Number,
      required: true,
      min: [30, 'Estimated duration must be at least 30 minutes'],
    },
    actualStartTime: Date,
    actualEndTime: Date,
    serviceLocation: {
      address: {
        type: String,
        required: [true, 'Service address is required'],
        maxlength: [200, 'Address cannot exceed 200 characters'],
      },
      city: {
        type: String,
        required: [true, 'City is required'],
      },
      region: {
        type: String,
        required: [true, 'Region is required'],
      },
      coordinates: {
        latitude: {
          type: Number,
          required: true,
        },
        longitude: {
          type: Number,
          required: true,
        },
      },
      accessInstructions: String,
    },
    status: {
      type: String,
      enum: [
        'pending',
        'accepted',
        'professional_en_route',
        'professional_arrived',
        'in_progress',
        'completed',
        'cancelled_by_customer',
        'cancelled_by_professional',
        'cancelled_by_admin',
      ],
      default: 'pending',
    },
    statusHistory: [
      {
        status: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        note: String,
        changedBy: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
      },
    ],
    pricing: {
      hourlyRate: {
        type: Number,
        required: true,
        min: [50, 'Hourly rate must be at least 50 MAD'],
      },
      estimatedHours: {
        type: Number,
        required: true,
        min: [0.5, 'Estimated hours must be at least 0.5'],
      },
      subtotal: {
        type: Number,
        required: true,
      },
      platformFee: {
        type: Number,
        required: true,
      },
      totalAmount: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        default: 'MAD',
      },
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'card', 'bank_transfer'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded', 'failed'],
      default: 'pending',
    },
    paymentReference: String,
    paymentDate: Date,
    customerNotes: String,
    professionalNotes: String,
    adminNotes: String,
    professionalLocation: {
      latitude: Number,
      longitude: Number,
      lastUpdated: Date,
    },
    estimatedArrivalTime: Date,
    actualArrivalTime: Date,
    workCompletedImages: [String],
    customerSignature: String,
    issuesReported: [
      {
        description: {
          type: String,
          required: true,
        },
        images: [String],
        reportedBy: {
          type: String,
          enum: ['customer', 'professional'],
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    customerRating: {
      rating: {
        type: Number,
        min: [1, 'Rating must be between 1 and 5'],
        max: [5, 'Rating must be between 1 and 5'],
      },
      comment: String,
      ratedAt: Date,
    },
    professionalRating: {
      rating: {
        type: Number,
        min: [1, 'Rating must be between 1 and 5'],
        max: [5, 'Rating must be between 1 and 5'],
      },
      comment: String,
      ratedAt: Date,
    },
    cancellationReason: String,
    cancellationDate: Date,
    cancellationFee: Number,
    refundAmount: Number,
    isRescheduled: {
      type: Boolean,
      default: false,
    },
    rescheduleCount: {
      type: Number,
      default: 0,
    },
    isRepeatBooking: {
      type: Boolean,
      default: false,
    },
    originalBookingId: {
      type: Schema.Types.ObjectId,
      ref: 'Booking',
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.index({ customerId: 1 });
bookingSchema.index({ professionalId: 1 });
bookingSchema.index({ serviceId: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ preferredDate: 1 });
bookingSchema.index({ createdAt: -1 });
bookingSchema.index({ 'serviceLocation.coordinates': '2dsphere' });

export const Booking = mongoose.model<IBooking>('Booking', bookingSchema);
