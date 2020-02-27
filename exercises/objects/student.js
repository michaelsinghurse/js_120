// student.js

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


let foo = createStudent('Foo', '1st');
foo.info(); // logs 'Foo is a 1st year student'

console.log(foo.listCourses()); // returns [];

foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });

console.log(foo.listCourses());    
// returns [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]

foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');

foo.viewNotes(); // logs "Math: Fun Course; Remember to study for algebra"

foo.addNote(102, 'Difficult subject');

foo.viewNotes();
// logs "Math: Fun Course; Remember to study for algebra"
//       "Advance Math: Difficult Subject"

foo.updateNote(101, 'Fun course');

foo.viewNotes(); 
// logs "Math: Fun Course"
//      "Advance Math: Difficult Subject"
