export type UserRole = "ADMIN" | "DONOR" | "VOLUNTEER" | "STUDENT";

export type UserStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "SUSPENDED"
  | "PENDING_VERIFICATION";

export type CampaignStatus =
  | "DRAFT"
  | "ACTIVE"
  | "PAUSED"
  | "COMPLETED"
  | "ARCHIVED";

export type CampaignCategory =
  | "EDUCATION"
  | "HOSTEL"
  | "SPONSORSHIP"
  | "EMERGENCY"
  | "VOLUNTEER"
  | "GENERAL";

export type DonationStatus =
  | "INITIATED"
  | "PENDING"
  | "SUCCESS"
  | "FAILED"
  | "REFUNDED"
  | "CANCELLED";

export type PaymentProvider = "RAZORPAY" | "STRIPE" | "MANUAL";

export type PaymentStatus =
  | "CREATED"
  | "AUTHORIZED"
  | "CAPTURED"
  | "FAILED"
  | "REFUNDED"
  | "CANCELLED";

export type StudentStatus =
  | "APPLIED"
  | "UNDER_REVIEW"
  | "APPROVED"
  | "REJECTED"
  | "ACTIVE_SUPPORT"
  | "COMPLETED"
  | "SUSPENDED";

export type VolunteerStatus =
  | "APPLIED"
  | "APPROVED"
  | "ACTIVE"
  | "INACTIVE"
  | "REJECTED";

export type EventStatus =
  | "DRAFT"
  | "UPCOMING"
  | "ONGOING"
  | "COMPLETED"
  | "CANCELLED";

export type NotificationType =
  | "DONATION"
  | "CAMPAIGN"
  | "STUDENT"
  | "VOLUNTEER"
  | "EVENT"
  | "SYSTEM";

export type NotificationStatus = "UNREAD" | "READ" | "ARCHIVED";

export type ContactInquiryStatus =
  | "NEW"
  | "IN_REVIEW"
  | "RESPONDED"
  | "CLOSED"
  | "SPAM";

export type AuditAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "LOGIN"
  | "LOGOUT"
  | "DONATION_INITIATED"
  | "DONATION_SUCCESS"
  | "DONATION_FAILED"
  | "PAYMENT_CAPTURED"
  | "ROLE_CHANGED"
  | "STATUS_CHANGED";

export interface PublicUser {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: UserRole;
  status: UserStatus;
}

export interface CampaignSummary {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: CampaignCategory;
  status: CampaignStatus;
  goalAmountPaise: number;
  raisedAmountPaise: number;
  coverImageUrl: string | null;
  endDate: Date | null;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DonationSummary {
  id: string;
  amountPaise: number;
  currency: string;
  status: DonationStatus;
  donorName: string;
  donorEmail: string;
  donorPhone: string | null;
  isAnonymous: boolean;
  campaignId: string;
  receiptNumber: string | null;
  receiptUrl: string | null;
  donatedAt: Date | null;
  createdAt: Date;
}

export interface StudentProfile {
  id: string;
  fullName: string;
  email: string | null;
  phone: string | null;
  collegeName: string | null;
  course: string | null;
  branch: string | null;
  yearOfStudy: string | null;
  city: string | null;
  district: string | null;
  state: string | null;
  status: StudentStatus;
  requestedSupport: string | null;
  approvedSupport: string | null;
}

export interface VolunteerProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  city: string | null;
  state: string | null;
  skills: string[];
  availability: string | null;
  interests: string[];
  status: VolunteerStatus;
}

export interface ImpactStorySummary {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl: string | null;
  videoUrl: string | null;
  metrics: unknown;
  isFeatured: boolean;
  isPublished: boolean;
  publishedAt: Date | null;
}

export interface SuccessStorySummary {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl: string | null;
  quote: string | null;
  educationOutcome: string | null;
  supportSummary: string | null;
  isPublished: boolean;
  publishedAt: Date | null;
}

export interface HostelFacilitySummary {
  id: string;
  studentId: string;
  hostelName: string;
  address: string;
  city: string;
  state: string;
  monthlyCostPaise: number | null;
  supportStartDate: Date | null;
  supportEndDate: Date | null;
  isActive: boolean;
  notes: string | null;
}

export interface EventSummary {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string | null;
  city: string | null;
  state: string | null;
  startDate: Date;
  endDate: Date | null;
  status: EventStatus;
  maxVolunteers: number | null;
  imageUrl: string | null;
}

export interface NewsletterSubscriberSummary {
  id: string;
  email: string;
  name: string | null;
  isActive: boolean;
  subscribedAt: Date;
  unsubscribedAt: Date | null;
  source: string | null;
}

export interface PaymentTransactionSummary {
  id: string;
  provider: PaymentProvider;
  status: PaymentStatus;
  amountPaise: number;
  currency: string;
  providerOrderId: string | null;
  providerPaymentId: string | null;
  providerRefundId: string | null;
  donationId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationSummary {
  id: string;
  userId: string;
  type: NotificationType;
  status: NotificationStatus;
  title: string;
  message: string;
  actionUrl: string | null;
  createdAt: Date;
  readAt: Date | null;
}

export interface ContactInquirySummary {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: ContactInquiryStatus;
  source: string | null;
  metadata: unknown;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditLogSummary {
  id: string;
  actorId: string | null;
  action: AuditAction;
  entity: string;
  entityId: string | null;
  oldValue: unknown;
  newValue: unknown;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: Date;
}