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


const sectionClass = "rounded-xl border border-[#d0d7de] bg-white p-5 sm:p-6";
const sectionHeadingClass = "text-xl font-semibold tracking-tight text-[#24292f] sm:text-2xl";
const fieldLabelClass = "text-sm font-medium text-[#24292f]";
const fieldClass = "mt-2 min-h-11 w-full rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-sm text-[#24292f] shadow-sm outline-none transition placeholder:text-[#6e7781] focus-visible:border-[#1f883d] focus-visible:ring-2 focus-visible:ring-[#1f883d]/20";
const textAreaClass = "mt-2 min-h-24 w-full rounded-md border border-[#d0d7de] bg-white px-3 py-2.5 text-sm leading-6 text-[#24292f] shadow-sm outline-none transition placeholder:text-[#6e7781] focus-visible:border-[#1f883d] focus-visible:ring-2 focus-visible:ring-[#1f883d]/20";

export function StudentApplicationForm({
  errorMessage
}: StudentApplicationFormProps) {
  return (
    <form action={submitStudentApplicationAction} className="grid gap-6">
      {errorMessage ? (
        <div role="alert" aria-live="polite" className="rounded-lg border border-[#ff8182] bg-[#ffebe9] px-4 py-3 text-sm font-medium text-[#a40e26]">
          {errorMessage}
        </div>
      ) : null}

      <section className={sectionClass}>
        <h2 className={sectionHeadingClass}>
          Personal Details
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label>
            <span className="text-sm font-medium text-[#24292f]">Full name</span>
            <input name="fullName" autoComplete="name" required className={fieldClass} />
          </label>

          <label>
            <span className="text-sm font-medium text-[#24292f]">Email</span>
            <input name="email" type="email" autoComplete="email" required className={fieldClass} />
          </label>

          <label>
            <span className="text-sm font-medium text-[#24292f]">Phone</span>
            <input name="phone" type="tel" autoComplete="tel" inputMode="tel" required className={fieldClass} />
          </label>

          <label>
            <span className="text-sm font-medium text-[#24292f]">Date of birth</span>
            <input name="dateOfBirth" type="date" className={fieldClass} />
          </label>

          <label>
            <span className="text-sm font-medium text-[#24292f]">Gender</span>
            <input name="gender" className={fieldClass} />
          </label>

          <label>
            <span className="text-sm font-medium text-[#24292f]">
              Aadhaar last 4 digits only
            </span>
            <input
              name="aadhaarLast4"
              maxLength={4}
              pattern="[0-9]{4}"
              inputMode="numeric"
              placeholder="1234"
              className={fieldClass}
            />
          </label>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className={sectionHeadingClass}>
          Karnataka Location
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label>
            <span className="text-sm font-medium text-[#24292f]">District</span>
            <select name="district" required className={fieldClass}>
              <option value="">Select district</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="text-sm font-medium text-[#24292f]">Taluk</span>
            <input name="taluk" className={fieldClass} />
          </label>
        </div>

        <label className="mt-5 block">
          <span className="text-sm font-medium text-[#24292f]">Address</span>
          <textarea name="address" rows={3} className={textAreaClass} />
        </label>
      </section>

      <section className={sectionClass}>
        <h2 className={sectionHeadingClass}>
          Academic Details
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label>
            <span className="text-sm font-medium text-[#24292f]">Course type</span>
            <select name="courseType" required className={fieldClass}>
              <option value="">Select course</option>
              {courseTypes.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="text-sm font-medium text-[#24292f]">Course name / branch</span>
            <input name="courseName" required placeholder="Computer Science, MBBS, LLB..." className={fieldClass} />
          </label>

          <label>
            <span className="text-sm font-medium text-[#24292f]">College name</span>
            <input name="collegeName" required className={fieldClass} />
          </label>

          <label>
            <span className="text-sm font-medium text-[#24292f]">University / board</span>
            <input name="university" placeholder="VTU, RGUHS, etc." className={fieldClass} />
          </label>

          <label>
            <span className="text-sm font-medium text-[#24292f]">Current year</span>
            <input name="currentYear" required placeholder="1st Year, 2nd Year..." className={fieldClass} />
          </label>

          <label>
            <span className="text-sm font-medium text-[#24292f]">Current semester</span>
            <input name="currentSemester" placeholder="Semester 1, Semester 5..." className={fieldClass} />
          </label>

          <label>
            <span className="text-sm font-medium text-[#24292f]">Admission number</span>
            <input name="admissionNumber" className={fieldClass} />
          </label>

          <label>
            <span className="text-sm font-medium text-[#24292f]">USN / registration number</span>
            <input name="usn" className={fieldClass} />
          </label>

          <label>
            <span className="text-sm font-medium text-[#24292f]">Entrance exam</span>
            <input name="entranceExam" placeholder="KCET, COMEDK, NEET..." className={fieldClass} />
          </label>

          <label>
            <span className="text-sm font-medium text-[#24292f]">Rank / score</span>
            <input name="entranceRank" className={fieldClass} />
          </label>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className={sectionHeadingClass}>
          Financial Need
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <label>
            <span className="text-sm font-medium text-[#24292f]">Annual fee ₹</span>
            <input name="annualFeeRupees" type="number" required min={1000} className={fieldClass} />
          </label>

          <label>
            <span className="text-sm font-medium text-[#24292f]">Already paid ₹</span>
            <input name="paidAmountRupees" type="number" required min={0} defaultValue={0} className={fieldClass} />
          </label>

          <label>
            <span className="text-sm font-medium text-[#24292f]">Requested support ₹</span>
            <input name="requestedAmountRupees" type="number" required min={500} className={fieldClass} />
          </label>

          <label>
            <span className="text-sm font-medium text-[#24292f]">Family annual income ₹</span>
            <input name="familyIncomeRupees" type="number" min={0} className={fieldClass} />
          </label>

          <label>
            <span className="text-sm font-medium text-[#24292f]">Income certificate number</span>
            <input name="incomeCertificateNo" className={fieldClass} />
          </label>

          <label>
            <span className="text-sm font-medium text-[#24292f]">Previous percentage / CGPA</span>
            <input name="previousPercentage" className={fieldClass} />
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
              className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <input name={name} type="checkbox" className="h-4 w-4" />
              <span className="text-sm font-medium text-[#24292f]">{label}</span>
            </label>
          ))}
        </div>

        <label className="mt-5 block">
          <span className="text-sm font-medium text-[#24292f]">
            Other scholarship/support details
          </span>
          <textarea name="otherSupportDetails" rows={3} className={textAreaClass} />
        </label>
      </section>

      <section className={sectionClass}>
        <h2 className={sectionHeadingClass}>Document links</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#59636e]">
          Private file upload is not available yet. If you provide a link, make sure access is restricted to the intended reviewers. Do not paste publicly accessible links to sensitive documents.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label>
            <span className={fieldLabelClass}>Admission proof URL</span>
            <input name="admissionProofUrl" type="url" placeholder="https://…" className={fieldClass} />
          </label>
          <label>
            <span className={fieldLabelClass}>Fee structure URL</span>
            <input name="feeStructureUrl" type="url" placeholder="https://…" className={fieldClass} />
          </label>
          <label>
            <span className={fieldLabelClass}>Income certificate URL</span>
            <input name="incomeCertificateUrl" type="url" placeholder="https://…" className={fieldClass} />
          </label>
          <label>
            <span className={fieldLabelClass}>Marks card URL</span>
            <input name="marksCardUrl" type="url" placeholder="https://…" className={fieldClass} />
          </label>
        </div>
      </section>

      <section className={sectionClass}>
        <label>
          <span className="text-sm font-medium text-[#24292f]">
            Explain your education support need
          </span>
          <textarea
            name="needStatement"
            required
            minLength={30}
            rows={6}
            className={textAreaClass}
          />
        </label>

        <label className="mt-5 flex items-start gap-3 rounded-lg border border-[#d0d7de] bg-[#f6f8fa] px-4 py-3">
          <input name="consentAccepted" type="checkbox" required className="mt-1 h-4 w-4" />
          <span className="text-sm leading-6 text-[#24292f]">
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