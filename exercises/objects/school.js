// school.js

function createStudent(name, year) {
  return {
    name: name,
    year: year,
    courses: [],
    
    addCourse: function(course) {
      this.courses.push(course);
    },
    
    addNote: function(courseCode, newNote) {
      let course = this.courses.find(obj => obj.code === courseCode);
      if (!course) return;
      
      if (course.note) {
        course.note += '; ' + newNote;
      } else {
        course.note = newNote;
      }
    },
    
    info: function() {
      console.log(`${this.name} is a ${this.year} year student`);
    },
    
    listCourses: function() {
      return this.courses;
    },
    
    updateNote: function(courseCode, newNote) {
      let course = this.courses.find(obj => obj.code === courseCode);
      if (!course) return;
      
      course.note = newNote;
    },
    
    viewNotes: function() {
      this.courses.forEach(course => {
        if (course.note) {
          console.log(`${course.name}: ${course.note}`);  
        }
      });
    }
  };
}

let school = {
  VALID_YEARS: ['1st', '2nd', '3rd', '4th', '5th'],
  courses: [
    { name: 'Math', code: 101 },
    { name: 'Advanced Math', code: 102 },
    { name: 'Physics', code: 202 },
  ],
  students: [],
  
  addGrade: function(student, courseCode, courseGrade) {
    let course = student.listCourses().find(courseObj => {
      return courseObj.code === courseCode;
    });
    course.grade = courseGrade;
  },
  
  addStudent: function(name, year) {
    if (!this.VALID_YEARS.includes(year)) {
      console.log('Invalid Year');
      return;
    }
    
    let student = createStudent(name, year);
    
    this.students.push(student);
    
    return student;
  },
  
  courseReport: function(courseName) {
    function getCourse(student, courseName) {
      return student.listCourses().filter(course => {
        return course.name === courseName;
      })[0];
    }

    let courseStudents = this.students.map(student => {
      let course = getCourse(student, courseName) || { grade: undefined };
      return { name: student.name, grade: course.grade };
    }).filter(student => student.grade);

    if (courseStudents.length > 0) {
      console.log(`= ${courseName} Grades=`);

      let average = courseStudents.reduce((total, student) => {
        console.log(`${student.name} : ${String(student.grade)}`);
        return total + student.grade;
      }, 0) / courseStudents.length;

      console.log('---');
      console.log(`Course Average: ${String(average)}`);
    }
  },
  
  enrollStudent: function(student, courseCode) {
    let course = this.courses.find(courseObj => courseObj.code === courseCode);
    student.addCourse(Object.create(course));
  },
  
  getReportCard: function(student) {
    student.listCourses().forEach(course => {
      console.log(`${course.name}: ${course.grade || 'In Progress'}`);
    });
  },
};

let foo = school.addStudent('foo', '3rd');
school.enrollStudent(foo, 101);
school.enrollStudent(foo, 102);
school.enrollStudent(foo, 202);
school.addGrade(foo, 101, 95);
school.addGrade(foo, 102, 90);

let bar = school.addStudent('bar', '1st');
school.enrollStudent(bar, 101);
school.addGrade(bar, 101, 91);

let qux = school.addStudent('qux', '2nd');
school.enrollStudent(qux, 101);
school.enrollStudent(qux, 102);
school.addGrade(qux, 101, 93);
school.addGrade(qux, 102, 90);


school.getReportCard(foo);
// //logs  Math: 95
// //      Advanced Math: 90
// //      Physics: In progress

console.log();

school.courseReport('Math');
// // logs  =Math Grades=
// //       foo: 95
// //       bar: 91
// //       qux: 93
// //       ---
// //       Course Average: 93

console.log();

school.courseReport('Advanced Math');
// // logs  =Advanced Math Grades=
// //       foo: 90
// //       qux: 90
// //       ---
// //       Course Average: 90

console.log();

school.courseReport('Physics');
// // logs  undefined