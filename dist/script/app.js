import { state } from "../utilities/config.js";
import { initCourseDetailPage } from "./course-details.js";
import { initLoadCourse } from "./courseGallry.js";
import { addUserhandler, loginHandler } from "./signUp-login.js";
import { initStudentBuyPage } from "./studentBuy.js";
import { addCourseHandler } from "./add-course-admin.js";
import { initLoadAdminCourse } from "./admin-course-list.js";
import { initEditCoursePage } from "./edit-course-admin.js";
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
            const form = document.querySelector("#signupForm");
            if (form) {
                form.addEventListener("submit", addUserhandler);
            }
            const loginForm = document.querySelector("#loginForm");
            if (loginForm) {
                loginForm.addEventListener("submit", loginHandler);
            }
            break;
        case "/student/student-Page.html":
            initStudentBuyPage();
            break;
        case "/admin/index.html":
            console.log("hello from admin course list");
            initLoadAdminCourse();
            break;
        case "/admin/enrolled-Courses-Page.html":
            initenrolledList();
            break;
        case "/admin/add-Course-Page.html":
            console.log("hello from add Course list");
            const addForm = document.querySelector("#addForm");
            if (addForm) {
                addForm.addEventListener("submit", addCourseHandler);
            }
            break;
        case "/admin/edit-Course-Page.html":
            console.log("hello from edit course page");
            initEditCoursePage();
            break;
    }
}
document.addEventListener("DOMContentLoaded", initPage);
