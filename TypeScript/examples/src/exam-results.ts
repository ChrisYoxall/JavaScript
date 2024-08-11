// Example taken from https://levelup.gitconnected.com/5-pro-tips-from-a-staff-engineers-typescript-code-1680adb4eaf8

// Types Definition
type ExamResult = {
  subject: string;
  score: number;
  grade: string;
  comments?: string;
};

type Student = {
  name: string;
  age: number;
  results: ExamResult[];
};

type ProcessedStudentDetails = Pick<Student, 'name' | 'age'> & {
  averageScore: number;
  allGrades: string;
  allSubjects: string;
  comments: string[];
};

type StudentSummary = {
  totalStudents: number;
  averageScore: number;
  allGrades: string;
  allSubjects: string;
  comments: string[];
};

const createGradeChecker = (failingGrade: string) => (grade: string) => grade !== failingGrade;
const passingGrade = createGradeChecker('F');

// Function to calculate average score
const calculateAverageScore = (results: ExamResult[]): number =>
  results.reduce((acc, result) => acc + result.score, 0) / results.length;

// Generator Function to yield student details one by one
function* studentDetailsGenerator(students: Student[]): Generator<Student> {
  for (const student of students) {
    yield student;
  }
}

// Main function to process students
const processStudentExamResults = (students: Student[]) => {
  // Filter passed and failed students
  const passedStudents = students.filter(student =>
    student.results.some(result => passingGrade(result.grade))
  );
  const failedStudents = students.filter(student =>
    student.results.every(result => !passingGrade(result.grade))
  );

  // Function to process each student detail lazily using the generator
  const processStudentDetail = (student: Student): ProcessedStudentDetails => {
    const { name, age, results } = student;
    const averageScore = calculateAverageScore(results);
    const allGrades = [...new Set(results.map((result) => result.grade))].join(', ');
    const allSubjects = [...new Set(results.map((result) => result.subject))].join(', ');
    const comments = results.flatMap((result) => result.comments || []);

    return {
      name,
      age,
      averageScore,
      allGrades,
      allSubjects,
      comments
    };
  };

  // Function to summarize results
  const summarizeDetails = (processedDetails: ProcessedStudentDetails[]): StudentSummary => {
    const totalStudents = processedDetails.length;
    const averageScore = calculateAverageScore(processedDetails.map(student => ({
      subject: '',
      score: student.averageScore,
      grade: '',
    })));
    const allGrades = [...new Set(processedDetails.flatMap((student) => student.allGrades.split(', ')))].join(', ');
    const allSubjects = [...new Set(processedDetails.flatMap((student) => student.allSubjects.split(', ')))].join(', ');
    const comments = processedDetails.flatMap((student) => student.comments);

    return {
      totalStudents,
      averageScore,
      allGrades,
      allSubjects,
      comments
    };
  };


  // Process passed students
  const passedDetails: ProcessedStudentDetails[] = [];
  for (const student of studentDetailsGenerator(passedStudents)) {
    passedDetails.push(processStudentDetail(student));
  }

  // Process failed students
  const failedDetails: ProcessedStudentDetails[] = [];
  for (const student of studentDetailsGenerator(failedStudents)) {
    failedDetails.push(processStudentDetail(student));
  }

  // Process all students
  const allDetails: ProcessedStudentDetails[] = [];
  for (const student of studentDetailsGenerator(students)) {
    allDetails.push(processStudentDetail(student));
  }

  return {
    passedSummary: summarizeDetails(passedDetails),
    failedSummary: summarizeDetails(failedDetails),
    allSummary: summarizeDetails(allDetails)
  };
};

// Sample Students Input
const students: Student[] = [
  {
    name: "Alice",
    age: 20,
    results: [
      { subject: "Math", score: 85, grade: "A", comments: "Excellent" },
      { subject: "English", score: 78, grade: "B", comments: "Good" },
      { subject: "Science", score: 92, grade: "A", comments: "Outstanding" }
    ]
  },
  {
    name: "Bob",
    age: 22,
    results: [
      { subject: "Math", score: 65, grade: "C", comments: "Needs Improvement" },
      { subject: "English", score: 88, grade: "A", comments: "Very Good" },
      { subject: "Science", score: 75, grade: "B", comments: "Good" }
    ]
  },
  {
    name: "Charlie",
    age: 21,
    results: [
      { subject: "Math", score: 50, grade: "F", comments: "Failed" },
      { subject: "English", score: 45, grade: "F", comments: "Failed" },
      { subject: "Science", score: 55, grade: "F", comments: "Failed" }
    ]
  }
];

// Calling the function
const processedStudentSummary = processStudentExamResults(students);
console.info(processedStudentSummary);