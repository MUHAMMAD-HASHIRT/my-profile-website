// Data Storage System - Using localStorage
class SchoolData {
    constructor() {
        this.init();
    }

    init() {
        const defaultData = {
            teachers: [
                { id: 't1', name: 'Ms. Sarah Johnson', email: 'teacher@academus.edu', subjects: ['Mathematics'], classes: [{class: '5', section: 'A'}], portalId: 'TCH001', password: 'teacher123', schedule: [ { day: 'Mon', start: '09:00', end: '10:00', class: '5', section: 'A' }, { day: 'Wed', start: '10:00', end: '11:00', class: '5', section: 'A' } ] },
                { id: 't2', name: 'Mr. David Smith', email: 'teacher2@academus.edu', subjects: ['English'], classes: [{class: '6', section: 'B'}], portalId: 'TCH002', password: 'teacher123', schedule: [ { day: 'Tue', start: '11:00', end: '12:00', class: '6', section: 'B' }, { day: 'Thu', start: '13:00', end: '14:00', class: '6', section: 'B' } ] }
            ],
            students: [
                { id: 's1', studentId: 'STU001', name: 'Ahmed Hassan', class: '5', section: 'A', phone: '+971501234567', address: 'Villa 123, Al Wasl Road, Dubai', parentsName: 'Fatima Hassan' },
                { id: 's2', studentId: 'STU002', name: 'Sara Al-Mansoori', class: '5', section: 'A', phone: '+971501234568', address: 'Apartment 45, Jumeirah Beach Residence, Dubai', parentsName: 'Mohammed Al-Mansoori' },
                { id: 's3', studentId: 'STU003', name: 'Omar Al-Rashid', class: '6', section: 'B', phone: '+971501234569', address: 'House 78, Al Barsha, Dubai', parentsName: 'Aisha Al-Rashid' },
                { id: 's4', studentId: 'STU004', name: 'Layla Al-Zahra', class: '6', section: 'B', phone: '+971501234570', address: 'Villa 234, Palm Jumeirah, Dubai', parentsName: 'Khalid Al-Zahra' },
                { id: 's5', studentId: 'STU005', name: 'Mohammed Al-Farsi', class: '7', section: 'A', phone: '+971501234571', address: 'Apartment 12, Dubai Marina, Dubai', parentsName: 'Noor Al-Farsi' }
            ],
            courseContents: {
                mathematics: [
                    { id: 'cc1', title: 'Numbers to 1000', skills: [
                        'Is able to read and write numbers within 1000',
                        'Can sort odd and even numbers',
                        'Can use Money Notation'
                    ]},
                    { id: 'cc2', title: 'Place Value and Rounding', skills: [
                        'Is able to read and write place values',
                        'Can multiply numbers by 10',
                        'Can compare and order numbers within 1000',
                        'Is able to round off numbers to the nearest tens and hundreds'
                    ]},
                    { id: 'cc3', title: '2D and 3D shapes', skills: [
                        'Can classify and sketch polygons',
                        'Can tell the difference between regular and irregular polygons',
                        'Can identify Lines of Symmetry'
                    ]},
                    { id: 'cc4', title: 'Addition and Subtraction', skills: [
                        'Use Commutative and associative rule',
                        'Use compliments of numbers',
                        'Add and subtract money',
                        'Use objects to stand for unknown'
                    ]},
                    { id: 'cc5', title: 'Perimeter and Area', skills: [
                        'Can find the perimeter of 2D shapes',
                        'Can find the area of 2D shapes'
                    ]}
                ],
                english: [
                    { id: 'cc6', title: 'Reading and Comprehension', skills: [
                        'Can identify the main idea and supporting details in a text',
                        'Can locate and use relevant information from a text to answer questions'
                    ]},
                    { id: 'cc7', title: 'Grammar and Punctuation', skills: [
                        'Can use knowledge of punctuation and grammar to read familiar texts with understanding',
                        'Can use simple present and past tense accurately in writing and speech',
                        'Can use prepositions of time and place correctly and form clear noun phrases to add detail in writing'
                    ]}
                ]
            },
            assessments: {},
            adminSettings: {
                courseContentLocked: false,
                courseContentReady: false
            },
            progressStatus: {}
        };

        const stored = localStorage.getItem('schoolData');
        if (!stored) {
            localStorage.setItem('schoolData', JSON.stringify(defaultData));
        } else {
            try {
                const data = JSON.parse(stored);
                if (!data || typeof data !== 'object' || !Array.isArray(data.teachers) || !Array.isArray(data.students)) {
                    console.log('Stored data is corrupted, resetting to default');
                    localStorage.setItem('schoolData', JSON.stringify(defaultData));
                }
            } catch (e) {
                console.log('Error parsing stored data, resetting to default:', e);
                localStorage.setItem('schoolData', JSON.stringify(defaultData));
            }
        }
        // Ensure there are sample students available for the admin UI to show
        try {
            this.populateSampleStudents();
        } catch (e) {
            console.error('Error populating sample students:', e);
        }
    }

    populateSampleStudents() {
        const data = this.getData();
        if (!data) return;
        if (!Array.isArray(data.students)) data.students = [];

        // If there are already 6 or more students, don't add samples
        if (data.students.length >= 6) return;

        const samples = [
            { studentId: 'STU101', name: 'Samuel Green', class: '4', section: 'A', phone: '+1111000001', address: '10 River Road' },
            { studentId: 'STU102', name: 'Lina Perez', class: '5', section: 'B', phone: '+1111000002', address: '22 Hill St' },
            { studentId: 'STU103', name: 'Omar Khan', class: '6', section: 'A', phone: '+1111000003', address: '45 Lake Ave' },
            { studentId: 'STU104', name: 'Maya Singh', class: '5', section: 'C', phone: '+1111000004', address: '77 Pine Blvd' },
            { studentId: 'STU105', name: 'Ethan Cole', class: '4', section: 'B', phone: '+1111000005', address: '3 Oak Lane' },
            { studentId: 'STU106', name: 'Zara Ali', class: '6', section: 'B', phone: '+1111000006', address: '9 Cedar Court' }
        ];

        samples.forEach(s => {
            const exists = data.students.some(st => st.studentId && st.studentId.toLowerCase() === String(s.studentId).toLowerCase());
            if (!exists) {
                this.addStudent(s);
            }
        });
    }

    getData() {
        return JSON.parse(localStorage.getItem('schoolData'));
    }

    saveData(data) {
        localStorage.setItem('schoolData', JSON.stringify(data));
    }

    getTeacherByEmail(email) {
        const data = this.getData();
        return data.teachers.find(t => t.email === email);
    }

    getTeacherByPortalId(portalId) {
        const data = this.getData();
        return data.teachers.find(t => t.portalId === portalId);
    }

    getStudentsForTeacher(teacherId) {
        const data = this.getData();
        const teacher = data.teachers.find(t => t.id === teacherId);
        if (!teacher || !teacher.classes || teacher.classes.length === 0) {
            return [];
        }
        return data.students.filter(s => {
            return teacher.classes.some(c => 
                c.class === s.class && c.section === s.section
            );
        });
    }

    getCourseContent(subject) {
        const data = this.getData();
        return data.courseContents[subject.toLowerCase()] || [];
    }

    saveAssessment(teacherId, studentId, assessmentData) {
        const data = this.getData();
        const key = `${teacherId}_${studentId}`;
        data.assessments[key] = {
            ...assessmentData,
            submitted: true,
            submittedAt: new Date().toISOString()
        };
        this.updateProgressStatus(teacherId);
        this.saveData(data);
    }

    getAssessment(teacherId, studentId) {
        const data = this.getData();
        const key = `${teacherId}_${studentId}`;
        return data.assessments[key] || null;
    }

    assignTeacherToClass(teacherId, classInfo) {
        const data = this.getData();
        const teacher = data.teachers.find(t => t.id === teacherId);
        if (teacher) {
            if (!teacher.classes) teacher.classes = [];
            const exists = teacher.classes.some(c => 
                c.class === classInfo.class && c.section === classInfo.section
            );
            if (!exists) {
                teacher.classes.push(classInfo);
                this.saveData(data);
            }
        }
    }

    removeTeacherFromClass(teacherId, classInfo) {
        const data = this.getData();
        const teacher = data.teachers.find(t => t.id === teacherId);
        if (teacher && teacher.classes) {
            teacher.classes = teacher.classes.filter(c => 
                !(c.class === classInfo.class && c.section === classInfo.section)
            );
            this.saveData(data);
        }
    }

    addCourseContent(subject, content) {
        const data = this.getData();
        if (!data.courseContents[subject.toLowerCase()]) {
            data.courseContents[subject.toLowerCase()] = [];
        }
        data.courseContents[subject.toLowerCase()].push(content);
        this.saveData(data);
    }

    removeCourseContent(subject, contentId) {
        const data = this.getData();
        const subjectKey = subject.toLowerCase();
        if (data.courseContents[subjectKey]) {
            data.courseContents[subjectKey] = data.courseContents[subjectKey].filter(
                cc => cc.id !== contentId
            );
            this.saveData(data);
        }
    }

    lockCourseContent(locked) {
        const data = this.getData();
        data.adminSettings.courseContentLocked = locked;
        data.adminSettings.courseContentReady = !locked;
        this.saveData(data);
    }

    isCourseContentLocked() {
        const data = this.getData();
        return data.adminSettings.courseContentLocked;
    }

    updateProgressStatus(teacherId) {
        const data = this.getData();
        const teacher = data.teachers.find(t => t.id === teacherId);
        if (!teacher) return;

        const students = this.getStudentsForTeacher(teacherId);
        const totalStudents = students.length;
        let submittedCount = 0;

        students.forEach(student => {
            const key = `${teacherId}_${student.id}`;
            if (data.assessments[key] && data.assessments[key].submitted) {
                submittedCount++;
            }
        });

        data.progressStatus[teacherId] = {
            submitted: submittedCount,
            total: totalStudents,
            percentage: totalStudents > 0 ? Math.round((submittedCount / totalStudents) * 100) : 0
        };

        this.saveData(data);
    }

    getProgressStatus() {
        const data = this.getData();
        const allTeachers = data.teachers.filter(t => t.classes && t.classes.length > 0);
        const status = {};

        allTeachers.forEach(teacher => {
            this.updateProgressStatus(teacher.id);
            status[teacher.id] = data.progressStatus[teacher.id] || { submitted: 0, total: 0, percentage: 0 };
        });

        let totalSubmitted = 0;
        let totalStudents = 0;
        Object.values(status).forEach(s => {
            totalSubmitted += s.submitted;
            totalStudents += s.total;
        });

        return {
            teachers: status,
            overall: {
                submitted: totalSubmitted,
                total: totalStudents,
                percentage: totalStudents > 0 ? Math.round((totalSubmitted / totalStudents) * 100) : 0
            }
        };
    }

    getAllTeachers() {
        const data = this.getData();
        return data.teachers;
    }

    getAllStudents() {
        const data = this.getData();
        return data.students;
    }

    // Returns students filtered by class and section (both optional)
    getStudentsByClassSection(classNum, section) {
        const data = this.getData();
        if (!Array.isArray(data.students)) return [];
        return data.students.filter(s => {
            const classMatch = !classNum || String(s.class) === String(classNum);
            const sectionMatch = !section || String(s.section).toUpperCase() === String(section).toUpperCase();
            return classMatch && sectionMatch;
        });
    }

    // Returns teachers assigned to a specific class+section (both optional)
    getTeachersForClassSection(classNum, section) {
        const data = this.getData();
        if (!Array.isArray(data.teachers)) return [];
        return data.teachers.filter(t => {
            if (!t.classes || t.classes.length === 0) return false;
            return t.classes.some(c => {
                const classMatch = !classNum || String(c.class) === String(classNum);
                const sectionMatch = !section || String(c.section).toUpperCase() === String(section).toUpperCase();
                return classMatch && sectionMatch;
            });
        });
    }

    // Return schedule entries for a teacher
    getTeacherSchedule(teacherId) {
        const data = this.getData();
        const teacher = data.teachers.find(t => t.id === teacherId);
        return teacher && Array.isArray(teacher.schedule) ? teacher.schedule : [];
    }

    // Add a schedule entry to a teacher
    addTeacherSchedule(teacherId, scheduleEntry) {
        const data = this.getData();
        const teacher = data.teachers.find(t => t.id === teacherId);
        if (!teacher) return false;
        if (!teacher.schedule) teacher.schedule = [];
        teacher.schedule.push(scheduleEntry);
        this.saveData(data);
        return true;
    }

    // Returns the total number of students
    getStudentCount() {
        const data = this.getData();
        return Array.isArray(data.students) ? data.students.length : 0;
    }

    // Alias for getStudentCount (some UIs may call this name)
    getTotalStudents() {
        return this.getStudentCount();
    }

    // Adds a new student object to storage. Returns the newly added student or null on validation failure.
    addStudent(student) {
        if (!student || typeof student !== 'object') return null;
        const data = this.getData();
        if (!Array.isArray(data.students)) data.students = [];

        // Basic validation: require at least a name and class
        if (!student.name || !student.class) return null;

        // Generate a unique numeric id based on existing ids (s1, s2...)
        const nums = data.students
            .map(s => parseInt(String(s.id || '').replace(/^s/, ''), 10))
            .filter(n => !Number.isNaN(n));
        const maxNum = nums.length ? Math.max(...nums) : 0;
        const newNum = maxNum + 1;
        const newId = `s${newNum}`;
        const newStudentId = `STU${String(newNum).padStart(3, '0')}`;

        const newStudent = {
            id: newId,
            studentId: student.studentId || newStudentId,
            name: student.name,
            class: String(student.class),
            section: student.section || '',
            phone: student.phone || '',
            address: student.address || ''
        };

        data.students.push(newStudent);
        this.saveData(data);
        return newStudent;
    }

    // Adds a new teacher object to storage. Returns the newly added teacher or null on validation failure.
    addTeacher(teacher) {
        if (!teacher || typeof teacher !== 'object') return null;
        const data = this.getData();
        if (!Array.isArray(data.teachers)) data.teachers = [];

        // Basic validation: require at least name, email, and subjects
        if (!teacher.name || !teacher.email) return null;

        // Handle subjects - can be array or single subject for backward compatibility
        let subjects = [];
        if (Array.isArray(teacher.subjects)) {
            subjects = teacher.subjects;
        } else if (teacher.subject) {
            subjects = [teacher.subject];
        } else if (teacher.subjects && typeof teacher.subjects === 'string') {
            subjects = [teacher.subjects];
        }

        if (subjects.length === 0) return null;

        // Check if email already exists
        const emailExists = data.teachers.some(t => t.email && t.email.toLowerCase() === teacher.email.toLowerCase());
        if (emailExists) {
            return null; // Email already exists
        }

        // Generate a unique numeric id based on existing ids (t1, t2...)
        const nums = data.teachers
            .map(t => parseInt(String(t.id || '').replace(/^t/, ''), 10))
            .filter(n => !Number.isNaN(n));
        const maxNum = nums.length ? Math.max(...nums) : 0;
        const newNum = maxNum + 1;
        const newId = `t${newNum}`;
        const newPortalId = teacher.portalId || `TCH${String(newNum).padStart(3, '0')}`;
        const newPassword = teacher.password || 'teacher123';

        // Check if portalId already exists
        const portalIdExists = data.teachers.some(t => t.portalId && t.portalId === newPortalId);
        if (portalIdExists && !teacher.portalId) {
            // If auto-generated ID exists, try next one
            const nextNum = maxNum + 2;
            const nextPortalId = `TCH${String(nextNum).padStart(3, '0')}`;
            const nextId = `t${nextNum}`;

            const newTeacher = {
                id: nextId,
                name: teacher.name,
                email: teacher.email,
                subjects: subjects,
                subject: subjects[0], // Keep backward compatibility
                classes: teacher.classes || [],
                portalId: nextPortalId,
                password: newPassword,
                schedule: teacher.schedule || []
            };

            data.teachers.push(newTeacher);
            this.saveData(data);
            return newTeacher;
        }

        const newTeacher = {
            id: newId,
            name: teacher.name,
            email: teacher.email,
            subjects: subjects,
            subject: subjects[0], // Keep backward compatibility
            classes: teacher.classes || [],
            portalId: newPortalId,
            password: newPassword,
            schedule: teacher.schedule || []
        };

        data.teachers.push(newTeacher);
        this.saveData(data);
        return newTeacher;
    }
}

window.schoolData = new SchoolData();
