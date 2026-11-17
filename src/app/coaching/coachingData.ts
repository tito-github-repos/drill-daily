/* =========================================================
   Coaching content for each class.
   To change wording / timetable, edit it here.
   ========================================================= */

export type Tone = "orange" | "blue" | "purple";
export type RowKind = "class" | "test" | "off";

export interface TimetableColumn {
  title: string; // e.g. "Morning"
  time: string; // e.g. "5:00 AM – 6:30 AM"
  tone: Tone;
  icon: "sun" | "moon" | "vacation";
}

export interface TimetableRow {
  day: string;
  cells?: string[]; // one per column
  span?: string; // one text across all columns
  kind?: RowKind;
}

export interface ClassCoachingData {
  slug: string; // url: /coaching/<slug>
  label: string; // "Class XI"
  heroEyebrow: string;
  heroDescription: string;
  timetableSubtitle: string;
  columns: TimetableColumn[];
  rows: TimetableRow[];
  scheduleRules: string[];
  policyRules: string[];
  admissionSubtitle: string;
  examChips: string[];
}

export const CLASS_XI: ClassCoachingData = {
  slug: "class-xi",
  label: "Class XI",
  heroEyebrow: "COACHING · CLASS XI · 2027",
  heroDescription:
    "Focused coaching for NEET, IIT JEE, IAT, NEST and CBSE Board Exams, taught by premier-institution coaches. Only 20 students per batch.",
  timetableSubtitle:
    "Two focused sessions every day, Monday to Saturday. Tests on Sundays.",
  columns: [
    { title: "Morning", time: "5:00 AM – 6:30 AM", tone: "orange", icon: "sun" },
    { title: "Evening", time: "6:30 PM – 8:00 PM", tone: "blue", icon: "moon" },
  ],
  rows: [
    { day: "Mon – Wed", cells: ["Maths", "Biology"] },
    { day: "Thu – Sat", cells: ["Physics", "Chemistry"] },
    {
      day: "Three Sundays a month",
      span: "Weekly Tests · MCQs · Competitive Exams",
      kind: "test",
    },
    {
      day: "Last Sunday of the month",
      span: "Monthly Tests · Descriptive · Board Exams",
      kind: "test",
    },
  ],
  scheduleRules: [
    "Portions will be completed by October.",
    "Only tests and discussion from November to January.",
    "No sessions in February and March.",
  ],
  policyRules: [
    "No repetition of classes.",
    "If a teacher cannot take a class, there is no compensation class.",
    "No vacations and no holidays.",
  ],
  admissionSubtitle:
    "Class XI · Covers NEET, IIT JEE, IAT, NEST and CBSE Board Exams.",
  examChips: ["NEET", "IIT JEE", "IAT", "NEST", "CBSE Board Exams"],
};

export const CLASS_X: ClassCoachingData = {
  slug: "class-x",
  label: "Class X",
  heroEyebrow: "COACHING · CLASS X · 2027",
  heroDescription:
    "Focused Maths and Science coaching for Class X, taught by premier-institution coaches. Only 20 students per batch.",
  timetableSubtitle:
    "One focused hour every morning, Monday to Friday. No sessions on weekends.",
  columns: [
    { title: "Regular", time: "5:00 AM – 6:00 AM", tone: "orange", icon: "sun" },
    {
      title: "May Month Vacation",
      time: "5:00 AM – 6:00 AM",
      tone: "purple",
      icon: "vacation",
    },
  ],
  rows: [
    { day: "Mon – Tue", cells: ["Maths", "Maths"] },
    { day: "Wed", cells: ["Physics / Chemistry", "Maths"] },
    { day: "Thu", cells: ["Biology", "Maths"] },
    {
      day: "Fri",
      cells: ["Weekly Tests · Maths & Science", "Weekly Tests · Maths"],
      kind: "test",
    },
    { day: "Sat – Sun", span: "No sessions", kind: "off" },
  ],
  scheduleRules: [
    "Portions will be completed by October.",
    "Only tests and discussion from November to January.",
    "No sessions in February and March.",
    "A separate timetable applies in the May month vacation.",
  ],
  policyRules: [
    "No repetition of classes.",
    "If a teacher cannot take a class, there is no compensation class.",
  ],
  admissionSubtitle: "Class X · Maths and Science coaching.",
  examChips: [],
};

export const ALL_CLASSES: ClassCoachingData[] = [CLASS_X, CLASS_XI];