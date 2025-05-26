import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  bookingId: mongoose.Types.ObjectId;
  reviewerId: mongoose.Types.ObjectId;
  revieweeId: mongoose.Types.ObjectId;
  reviewerType: 'customer' | 'professional';

  rating: number;
  comment?: string;
  pros?: string[];
  cons?: string[];

  detailedRatings?: {
    quality: number;
    punctuality: number;
    communication: number;
    professionalism: number;
    value: number;
  };

  images?: string[];
  isVerified: boolean;
  isPublic: boolean;
  isFlagged: boolean;
  flagReason?: string;

  isApproved: boolean;
  moderatedBy?: mongoose.Types.ObjectId;
  moderatedAt?: Date;
  moderationNotes?: string;

  helpfulCount: number;
  reportCount: number;

  response?: {
    content: string;
    respondedAt: Date;
    respondedBy: mongoose.Types.ObjectId;
  };

  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    reviewerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    revieweeId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reviewerType: {
      type: String,
      enum: ['customer', 'professional'],
      required: true,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be between 1 and 5'],
      max: [5, 'Rating must be between 1 and 5'],
    },
    comment: {
      type: String,
      maxlength: [1000, 'Comment cannot exceed 1000 characters'],
      trim: true,
    },
    pros: [
      {
        type: String,
        maxlength: [100, 'Pro point cannot exceed 100 characters'],
      },
    ],
    cons: [
      {
        type: String,
        maxlength: [100, 'Con point cannot exceed 100 characters'],
      },
    ],
    detailedRatings: {
      quality: {
        type: Number,
        min: [1, 'Rating must be between 1 and 5'],
        max: [5, 'Rating must be between 1 and 5'],
      },
      punctuality: {
        type: Number,
        min: [1, 'Rating must be between 1 and 5'],
        max: [5, 'Rating must be between 1 and 5'],
      },
      communication: {
        type: Number,
        min: [1, 'Rating must be between 1 and 5'],
        max: [5, 'Rating must be between 1 and 5'],
      },
      professionalism: {
        type: Number,
        min: [1, 'Rating must be between 1 and 5'],
        max: [5, 'Rating must be between 1 and 5'],
      },
      value: {
        type: Number,
        min: [1, 'Rating must be between 1 and 5'],
        max: [5, 'Rating must be between 1 and 5'],
      },
    },
    images: [String],
    isVerified: {
      type: Boolean,
      default: false,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    isFlagged: {
      type: Boolean,
      default: false,
    },
    flagReason: String,
    isApproved: {
      type: Boolean,
      default: true,
    },
    moderatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    moderatedAt: Date,
    moderationNotes: String,
    helpfulCount: {
      type: Number,
      default: 0,
    },
    reportCount: {
      type: Number,
      default: 0,
    },
    response: {
      content: {
        type: String,
        maxlength: [500, 'Response cannot exceed 500 characters'],
      },
      respondedAt: Date,
      respondedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ bookingId: 1 });
reviewSchema.index({ reviewerId: 1 });
reviewSchema.index({ revieweeId: 1 });
reviewSchema.index({ rating: -1 });
reviewSchema.index({ isApproved: 1, isPublic: 1 });

export const Review = mongoose.model<IReview>('Review', reviewSchema);
