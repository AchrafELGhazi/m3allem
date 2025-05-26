# 📋 M3allem Database Models

## 1. User Model (`src/db/models/User.ts`)

**Purpose:** Base user model for all user types (customer, professional, admin)

**Key Fields:**
- **Basic info:** firstName, lastName, email, password, phone
- **Account:** userType (customer/professional/admin), isVerified, isActive
- **Profile:** profilePicture, address, language, notificationPreferences
- **Auth:** emailVerificationToken, passwordResetToken

## 2. Professional Model (`src/db/models/Professional.ts`)

**Purpose:** Extended profile for professional users (linked to User via userId)

**Key Fields:**
- **Professional info:** experienceLevel (Snaaï/Khrayfi/M3allem), specializations, hourlyRate
- **Verification:** isVerified, backgroundCheckStatus, hasCriminalRecord, licenses, certifications
- **Work:** portfolio, workingAreas, workingHours, currentLocation
- **Performance:** rating, totalReviews, totalJobsCompleted, responseTimeMinutes
- **Business:** subscriptionType, totalEarnings, accountStatus

## 3. Service Model (`src/db/models/Service.ts`)

**Purpose:** Catalog of available services on the platform

**Key Fields:**
- **Names:** name, nameAr, nameFr (multilingual support)
- **Classification:** category, subcategory, tags
- **Descriptions:** description, descriptionAr, descriptionFr
- **Pricing:** averagePrice (min/max/unit), estimatedDuration
- **Requirements:** requiredExperienceLevel

## 4. Booking Model (`src/db/models/Booking.ts`)

**Purpose:** Main transaction model connecting customers with professionals

**Key Fields:**
- **Participants:** customerId, professionalId, serviceId
- **Details:** title, description, urgency, preferredDate, preferredTimeSlot
- **Location:** serviceLocation (address + coordinates)
- **Status:** status, statusHistory (pending → accepted → in_progress → completed)
- **Pricing:** pricing (hourlyRate, subtotal, platformFee, totalAmount)
- **Payment:** paymentMethod, paymentStatus, paymentReference
- **Completion:** workCompletedImages, customerRating, professionalRating

## 5. Review Model (`src/db/models/Review.ts`)

**Purpose:** Rating and feedback system for completed bookings

**Key Fields:**
- **Relationship:** bookingId, reviewerId, revieweeId, reviewerType
- **Content:** rating (1-5), comment, pros, cons
- **Detailed ratings:** quality, punctuality, communication, professionalism, value
- **Moderation:** isVerified, isPublic, isFlagged, isApproved
- **Interaction:** helpfulCount, reportCount, response

## 6. Chat Model (`src/db/models/Chat.ts`)

**Purpose:** Chat rooms for each booking (customer ↔ professional communication)

**Key Fields:**
- **Relationship:** bookingId, participants
- **Activity:** lastMessage, lastActivity, isActive

## 7. Message Model (`src/db/models/Message.ts`)

**Purpose:** Individual messages within chat rooms

**Key Fields:**
- **Relationship:** chatId, senderId
- **Content:** messageType, content, attachments
- **Status:** isRead, readAt, isEdited, isDeleted
- **Features:** replyTo (for message threading)

## 8. Notification Model (`src/db/models/Notification.ts`)

**Purpose:** Push notifications, emails, and in-app notifications

**Key Fields:**
- **Target:** userId, type (booking/message/review/payment/system/promotion)
- **Content:** title, message, data, actionUrl
- **Status:** isRead, readAt, expiresAt, priority
- **Channels:** channels, sentChannels (push/email/sms)

## 🗂️ Model Relationships

- User (1) ←→ (0..1) Professional
- User (1) ←→ (0..*) Booking [as customer]
- Professional (1) ←→ (0..*) Booking [as professional]
- Service (1) ←→ (0..*) Booking
- Booking (1) ←→ (0..1) Review
- Booking (1) ←→ (0..1) Chat
- Chat (1) ←→ (0..*) Message
- User (1) ←→ (0..*) Notification

## 📊 Experience Levels

- **Snaaï (صنايعي)** - Skilled Craftsman
- **Khrayfi (خرايفي)** - Specialist
- **M3allem (معلّم)** - Master Expert

## 🔧 Service Categories

electrical, plumbing, painting, tiling, plastering, furniture_assembly, ac_repair, carpentry, beauty, hair

---

*All models are properly indexed and include validation rules, timestamps, and virtual fields where appropriate!*