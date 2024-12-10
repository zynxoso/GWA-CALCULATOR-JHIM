import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { Semester } from '../types';

export const exportToPDF = (semesters: Semester[]) => {
  const doc = new jsPDF();
  let yPos = 20;

  doc.setFontSize(20);
  doc.text('GPA Report', 20, yPos);
  yPos += 20;

  semesters.forEach((semester) => {
    doc.setFontSize(16);
    doc.text(`${semester.name} - GPA: ${semester.gpa}`, 20, yPos);
    yPos += 10;

    semester.subjects.forEach((subject) => {
      doc.setFontSize(12);
      doc.text(
        `${subject.name} - Grade: ${subject.grade}, Credits: ${subject.credits}`,
        30,
        yPos
      );
      yPos += 10;
    });
    yPos += 10;
  });

  doc.save('gpa-report.pdf');
};

export const exportToExcel = (semesters: Semester[]) => {
  const worksheet = XLSX.utils.json_to_sheet(
    semesters.flatMap((semester) =>
      semester.subjects.map((subject) => ({
        Semester: semester.name,
        Subject: subject.name,
        Grade: subject.grade,
        Credits: subject.credits,
      }))
    )
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'GPA Report');
  XLSX.writeFile(workbook, 'gpa-report.xlsx');
};