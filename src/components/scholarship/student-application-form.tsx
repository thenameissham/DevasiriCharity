import { submitStudentApplicationAction } from "@/features/student-applications/student-application.actions";
import { Button } from "@/components/ui/button";

interface StudentApplicationFormProps {
  readonly errorMessage?: string;
}

const districts = [
  "Bengaluru Urban",
  "Bengaluru Rural",
  "Mysuru",
  "Hubballi-Dharwad",
  "Belagavi",
  "Kalaburagi",
  "Dakshina Kannada",
  "Tumakuru",
  "Shivamogga",
  "Ballari",
  "Other Karnataka district"
] as const;

const courseTypes = [
  "B.E. / B.Tech",
  "MBBS",
  "BDS",
  "B.Pharm",
  "Pharm.D",
  "B.Sc Nursing",
  "LLB",
  "MBA",
  "MCA",
  "Other professional course"
] as const;

export function StudentApplicationForm({
  errorMessage
}: StudentApplicationFormProps) {
  return (
    <form action={submitStudentApplicationAction} className="grid gap-6">
      {errorMessage ? (
        <div className="rounded-[20px] border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
          {errorMessage}
        </div>
      ) : null}

      <section className="rounded-[32px] border border-slate-200 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <h2 className="text-2xl font-black tracking-[-0.055em] text-slate-950">
          Personal Details
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label>
            <span className="text-sm font-bold text-slate-700">Full name</span>
            <input name="fullName" required className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 px-4 text-sm font-semibold" />
          </label>

          <label>
            <span className="text-sm font-bold text-slate-700">Email</span>
            <input name="email" type="email" required className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 px-4 text-sm font-semibold" />
          </label>

          <label>
            <span className="text-sm font-bold text-slate-700">Phone</span>
            <input name="phone" required className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 px-4 text-sm font-semibold" />
          </label>

          <label>
            <span className="text-sm font-bold text-slate-700">Date of birth</span>
            <input name="dateOfBirth" type="date" className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 px-4 text-sm font-semibold" />
          </label>

          <label>
            <span className="text-sm font-bold text-slate-700">Gender</span>
            <input name="gender" className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 px-4 text-sm font-semibold" />
          </label>

          <label>
            <span className="text-sm font-bold text-slate-700">
              Aadhaar last 4 digits only
            </span>
            <input
              name="aadhaarLast4"
              maxLength={4}
              inputMode="numeric"
              placeholder="1234"
              className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 px-4 text-sm font-semibold"
            />
          </label>
        </div>
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <h2 className="text-2xl font-black tracking-[-0.055em] text-slate-950">
          Karnataka Location
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label>
            <span className="text-sm font-bold text-slate-700">District</span>
            <select name="district" required className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 px-4 text-sm font-bold">
              <option value="">Select district</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="text-sm font-bold text-slate-700">Taluk</span>
            <input name="taluk" className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 px-4 text-sm font-semibold" />
          </label>
        </div>

        <label className="mt-5 block">
          <span className="text-sm font-bold text-slate-700">Address</span>
          <textarea name="address" rows={3} className="mt-2 w-full rounded-[18px] border border-slate-200 px-4 py-3 text-sm font-semibold" />
        </label>
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <h2 className="text-2xl font-black tracking-[-0.055em] text-slate-950">
          Academic Details
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label>
            <span className="text-sm font-bold text-slate-700">Course type</span>
            <select name="courseType" required className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 px-4 text-sm font-bold">
              <option value="">Select course</option>
              {courseTypes.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="text-sm font-bold text-slate-700">Course name / branch</span>
            <input name="courseName" required placeholder="Computer Science, MBBS, LLB..." className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 px-4 text-sm font-semibold" />
          </label>

          <label>
            <span className="text-sm font-bold text-slate-700">College name</span>
            <input name="collegeName" required className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 px-4 text-sm font-semibold" />
          </label>

          <label>
            <span className="text-sm font-bold text-slate-700">University / board</span>
            <input name="university" placeholder="VTU, RGUHS, etc." className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 px-4 text-sm font-semibold" />
          </label>

          <label>
            <span className="text-sm font-bold text-slate-700">Current year</span>
            <input name="currentYear" required placeholder="1st Year, 2nd Year..." className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 px-4 text-sm font-semibold" />
          </label>

          <label>
            <span className="text-sm font-bold text-slate-700">Current semester</span>
            <input name="currentSemester" placeholder="Semester 1, Semester 5..." className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 px-4 text-sm font-semibold" />
          </label>

          <label>
            <span className="text-sm font-bold text-slate-700">Admission number</span>
            <input name="admissionNumber" className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 px-4 text-sm font-semibold" />
          </label>

          <label>
            <span className="text-sm font-bold text-slate-700">USN / registration number</span>
            <input name="usn" className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 px-4 text-sm font-semibold" />
          </label>

          <label>
            <span className="text-sm font-bold text-slate-700">Entrance exam</span>
            <input name="entranceExam" placeholder="KCET, COMEDK, NEET..." className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 px-4 text-sm font-semibold" />
          </label>

          <label>
            <span className="text-sm font-bold text-slate-700">Rank / score</span>
            <input name="entranceRank" className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 px-4 text-sm font-semibold" />
          </label>
        </div>
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <h2 className="text-2xl font-black tracking-[-0.055em] text-slate-950">
          Financial Need
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <label>
            <span className="text-sm font-bold text-slate-700">Annual fee ₹</span>
            <input name="annualFeeRupees" type="number" required min={1000} className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 px-4 text-sm font-semibold" />
          </label>

          <label>
            <span className="text-sm font-bold text-slate-700">Already paid ₹</span>
            <input name="paidAmountRupees" type="number" required min={0} defaultValue={0} className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 px-4 text-sm font-semibold" />
          </label>

          <label>
            <span className="text-sm font-bold text-slate-700">Requested support ₹</span>
            <input name="requestedAmountRupees" type="number" required min={500} className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 px-4 text-sm font-semibold" />
          </label>

          <label>
            <span className="text-sm font-bold text-slate-700">Family annual income ₹</span>
            <input name="familyIncomeRupees" type="number" min={0} className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 px-4 text-sm font-semibold" />
          </label>

          <label>
            <span className="text-sm font-bold text-slate-700">Income certificate number</span>
            <input name="incomeCertificateNo" className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 px-4 text-sm font-semibold" />
          </label>

          <label>
            <span className="text-sm font-bold text-slate-700">Previous percentage / CGPA</span>
            <input name="previousPercentage" className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 px-4 text-sm font-semibold" />
          </label>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {[
            ["receivesSsp", "Receiving SSP"],
            ["receivesVidyasiri", "Receiving Vidyasiri"],
            ["receivesOtherSupport", "Receiving other support"]
          ].map(([name, label]) => (
            <label
              key={name}
              className="flex items-center gap-3 rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <input name={name} type="checkbox" className="h-4 w-4" />
              <span className="text-sm font-bold text-slate-700">{label}</span>
            </label>
          ))}
        </div>

        <label className="mt-5 block">
          <span className="text-sm font-bold text-slate-700">
            Other scholarship/support details
          </span>
          <textarea name="otherSupportDetails" rows={3} className="mt-2 w-full rounded-[18px] border border-slate-200 px-4 py-3 text-sm font-semibold" />
        </label>
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <h2 className="text-2xl font-black tracking-[-0.055em] text-slate-950">
          Document Links
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          For now, paste secure document links. S3/private file upload will be added in the storage phase.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <input name="admissionProofUrl" type="url" placeholder="Admission proof URL" className="h-12 rounded-[18px] border border-slate-200 px-4 text-sm font-semibold" />
          <input name="feeStructureUrl" type="url" placeholder="Fee structure URL" className="h-12 rounded-[18px] border border-slate-200 px-4 text-sm font-semibold" />
          <input name="incomeCertificateUrl" type="url" placeholder="Income certificate URL" className="h-12 rounded-[18px] border border-slate-200 px-4 text-sm font-semibold" />
          <input name="marksCardUrl" type="url" placeholder="Marks card URL" className="h-12 rounded-[18px] border border-slate-200 px-4 text-sm font-semibold" />
        </div>
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <label>
          <span className="text-sm font-bold text-slate-700">
            Explain your education support need
          </span>
          <textarea
            name="needStatement"
            required
            minLength={30}
            rows={6}
            className="mt-2 w-full rounded-[18px] border border-slate-200 px-4 py-3 text-sm font-semibold"
          />
        </label>

        <label className="mt-5 flex items-start gap-3 rounded-[20px] border border-blue-100 bg-blue-50 px-4 py-3">
          <input name="consentAccepted" type="checkbox" required className="mt-1 h-4 w-4" />
          <span className="text-sm font-semibold leading-6 text-blue-950">
            I confirm that the submitted details are true. I allow Devasiri Charitable Trust to verify my academic, financial, and contact details for scholarship support.
          </span>
        </label>
      </section>

      <Button type="submit" size="lg" className="w-full">
        Submit Scholarship Application
      </Button>
    </form>
  );
}