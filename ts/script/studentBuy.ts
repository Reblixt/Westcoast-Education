import { initLoadAdminCourse } from "./admin-course-list.js";
import { settings } from "../utilities/config.js";
import HttpClient from "./http.js";

export const initStudentBuyPage = () => {
  initLoadAdminCourse();
  console.log("hello");
  getCourse();
};

const getCourse = async () => {
  try {
    const url = settings.JSON_COURSE;
    const http = new HttpClient(url);
    const courses = await http.get();

    if (courses) {
      courses.forEach((course: any) => {
        console.log(course.id);
        const buttonId = `${course.id}-addButton`;
        const saveButton = document.getElementById(buttonId);

        if (saveButton) {
          saveButton.addEventListener("click", () => handleSaveClick(course));
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

function handleSaveClick(course: any) {
  const courseKey = `course-${course.id}`;
  const existingCourse = localStorage.getItem(courseKey);
  const buttonId = `${course.id}-addButton`;
  const saveButton = document.getElementById(buttonId);

  if (!existingCourse) {
    const courseInfo = {
      id: course.id,
      name: course.courseName,
      price: course.price,
    };
    localStorage.setItem(courseKey, JSON.stringify(courseInfo));
    if (saveButton) {
      saveButton.textContent = "Remove";
      saveButton.style.backgroundColor = "#be4d25";
    }
  } else {
    if (saveButton) {
      localStorage.removeItem(courseKey);
      saveButton.textContent = "Add";
      saveButton.style.backgroundColor = "#fcfcfd";
    }
  }
}
