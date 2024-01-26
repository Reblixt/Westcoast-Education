import { state } from "../utilities/config.js";
import { initCourseDetailPage } from "./details/course-details.js";
import { initLoadCourse } from "./details/courseGallry.js";
import { addUserhandler, loginHandler } from "./service/signUp-login.js";
import { initStudentBuyPage } from "./service/studentBuy.js";
import { addCourseHandler } from "./service/add-course-admin.js";
import { initLoadAdminCourse } from "./details/admin-course-list.js";
import { initEditCoursePage } from "./service/edit-course-admin.js";
import { initenrolledList } from "./dom/enrolled-course-list.js";

async function initPage() {
  switch (state.currentPage) {
    case "/":
    case "/index.html":
      initLoadCourse();
      break;

    case "/pages/Course-Page.html":
      initCourseDetailPage();
      break;

    case "/pages/Login-Signup-Page.html":
      const form = document.querySelector("#signupForm") as HTMLFormElement;
      if (form) {
        form.addEventListener("submit", addUserhandler);
      }
      const loginForm = document.querySelector("#loginForm") as HTMLFormElement;
      if (loginForm) {
        loginForm.addEventListener("submit", loginHandler);
      }
      break;

    case "/student/student-Page.html":
      initStudentBuyPage();
      break;

    case "/admin/index.html":
      initLoadAdminCourse();

      break;

    case "/admin/enrolled-Courses-Page.html":
      initenrolledList();
      break;

    case "/admin/add-Course-Page.html":
      const addForm = document.querySelector("#addForm") as HTMLFormElement;
      if (addForm) {
        addForm.addEventListener("submit", addCourseHandler);
      }
      break;

    case "/admin/edit-Course-Page.html":
      initEditCoursePage();
      break;
  }
}

document.addEventListener("DOMContentLoaded", initPage);
