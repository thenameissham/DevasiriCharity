import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is missing in .env");
}

const adapter = new PrismaPg({
  connectionString: databaseUrl
});

const prisma = new PrismaClient({ adapter });

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

async function main() {
  const adminPassword = await hashPassword("Admin@12345");
  const donorPassword = await hashPassword("Donor@12345");
  const volunteerPassword = await hashPassword("Volunteer@12345");
  const studentPassword = await hashPassword("Student@12345");

  const admin = await prisma.user.upsert({
    where: {
      email: "admin@devasiri.org"
    },
    update: {
      name: "Devasiri Admin",
      passwordHash: adminPassword,
      role: "ADMIN",
      status: "ACTIVE",
      donorProfileCompleted: true
    },
    create: {
      name: "Devasiri Admin",
      email: "admin@devasiri.org",
      passwordHash: adminPassword,
      role: "ADMIN",
      status: "ACTIVE",
      donorProfileCompleted: true
    }
  });

  await prisma.user.upsert({
    where: {
      email: "donor@devasiri.org"
    },
    update: {
      name: "Demo Donor",
      passwordHash: donorPassword,
      role: "DONOR",
      status: "ACTIVE",
      donorProfileCompleted: true
    },
    create: {
      name: "Demo Donor",
      email: "donor@devasiri.org",
      passwordHash: donorPassword,
      role: "DONOR",
      status: "ACTIVE",
      donorProfileCompleted: true
    }
  });

  await prisma.user.upsert({
    where: {
      email: "volunteer@devasiri.org"
    },
    update: {
      name: "Demo Volunteer",
      passwordHash: volunteerPassword,
      role: "VOLUNTEER",
      status: "ACTIVE"
    },
    create: {
      name: "Demo Volunteer",
      email: "volunteer@devasiri.org",
      passwordHash: volunteerPassword,
      role: "VOLUNTEER",
      status: "ACTIVE",
      volunteer: {
        create: {
          fullName: "Demo Volunteer",
          email: "volunteer@devasiri.org",
          phone: "9999999999",
          city: "Bengaluru",
          state: "Karnataka",
          skills: ["Mentoring", "Documentation", "Event Support"],
          interests: ["Education", "Student Support"],
          availability: "Weekends",
          status: "ACTIVE"
        }
      }
    }
  });

  await prisma.user.upsert({
    where: {
      email: "student@devasiri.org"
    },
    update: {
      name: "Demo Student",
      passwordHash: studentPassword,
      role: "STUDENT",
      status: "ACTIVE"
    },
    create: {
      name: "Demo Student",
      email: "student@devasiri.org",
      passwordHash: studentPassword,
      role: "STUDENT",
      status: "ACTIVE",
      student: {
        create: {
          fullName: "Demo Student",
          email: "student@devasiri.org",
          phone: "8888888888",
          collegeName: "Demo Engineering College",
          course: "B.E.",
          branch: "Electronics and Communication",
          yearOfStudy: "Final Year",
          city: "Bengaluru",
          district: "Bengaluru Urban",
          state: "Karnataka",
          status: "ACTIVE_SUPPORT",
          requestedSupport: "Education fee and hostel support",
          approvedSupport: "Partial education fee support"
        }
      }
    }
  });

  await prisma.campaign.upsert({
    where: {
      slug: "emergency-education-fee-support"
    },
    update: {
      status: "ACTIVE",
      createdById: admin.id
    },
    create: {
      title: "Emergency Education Fee Support",
      slug: "emergency-education-fee-support",
      description:
        "Help students continue classes by covering urgent college, exam, and admission fee gaps.",
      story:
        "Many students lose continuity because small urgent fee gaps become major barriers. This campaign supports verified education needs.",
      category: "EDUCATION",
      status: "ACTIVE",
      goalAmountPaise: 90000000,
      raisedAmountPaise: 48500000,
      isFeatured: true,
      createdById: admin.id
    }
  });

  await prisma.campaign.upsert({
    where: {
      slug: "hostel-safety-support-program"
    },
    update: {
      status: "ACTIVE",
      createdById: admin.id
    },
    create: {
      title: "Hostel Safety Support Program",
      slug: "hostel-safety-support-program",
      description:
        "Support safe accommodation for students who travel far from home to continue education.",
      story:
        "Hostel support helps students remain close to college, reduce travel burden, and focus on education.",
      category: "HOSTEL",
      status: "ACTIVE",
      goalAmountPaise: 65000000,
      raisedAmountPaise: 32000000,
      isFeatured: true,
      createdById: admin.id
    }
  });

  await prisma.campaign.upsert({
    where: {
      slug: "student-sponsorship-track"
    },
    update: {
      status: "ACTIVE",
      createdById: admin.id
    },
    create: {
      title: "Student Sponsorship Track",
      slug: "student-sponsorship-track",
      description:
        "Sponsor verified students through structured, milestone-based educational support.",
      story:
        "Student sponsorships help create longer-term continuity through milestone-based support.",
      category: "SPONSORSHIP",
      status: "ACTIVE",
      goalAmountPaise: 120000000,
      raisedAmountPaise: 78000000,
      isFeatured: true,
      createdById: admin.id
    }
  });

  await prisma.impactStory.upsert({
    where: {
      slug: "education-support-changed-continuity"
    },
    update: {
      isPublished: true,
      isFeatured: true
    },
    create: {
      title: "Education support changed continuity",
      slug: "education-support-changed-continuity",
      content:
        "A student received timely support for education expenses and continued the academic year with confidence.",
      metrics: {
        supportType: "Education Assistance",
        duration: "1 academic year",
        outcome: "Academic continuity"
      },
      isFeatured: true,
      isPublished: true,
      publishedAt: new Date()
    }
  });

  console.log("Seed completed successfully.");
  console.log("Admin: admin@devasiri.org / Admin@12345");
  console.log("Donor: donor@devasiri.org / Donor@12345");
  console.log("Volunteer: volunteer@devasiri.org / Volunteer@12345");
  console.log("Student: student@devasiri.org / Student@12345");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });