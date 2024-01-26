import { initLoadAdminCourse } from "../details/admin-course-list.js";
import { createClearLocalStorageButton, createUserInfoCard, } from "../dom/student-dom.js";
import { settings } from "../../utilities/config.js";
import HttpClient from "../http.js";
export const initStudentBuyPage = async () => {
    const courseIdStr = location.search.split("=")[1];
    const courseId = parseInt(courseIdStr, 10);
    const mainContainer = document.querySelector("section");
    const user = await getUserById(courseId);
    if (user) {
        createUserInfoCard(user, mainContainer);
    }
    else {
        console.log("User not found");
    }
    initLoadAdminCourse();
    getCourse();
    createClearLocalStorageButton(".checkoutContainer", "Clear selected", handleClearClick);
};
const getUserById = async (id) => {
    const url = `${settings.JSON_STUDENT}/${id}`;
    const http = new HttpClient(url);
    try {
        const user = await http.get();
        return user;
    }
    catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};
const getCourse = async () => {
    try {
        const url = settings.JSON_COURSE;
        const http = new HttpClient(url);
        const courses = await http.get();
        if (courses) {
            courses.forEach((course) => {
                const buttonId = `${course.id}-addButton`;
                const saveButton = document.getElementById(buttonId);
                if (saveButton) {
                    saveButton.addEventListener("click", () => handleSaveClick(course));
                }
            });
        }
    }
    catch (error) {
        console.log(error);
    }
};
function handleSaveClick(course) {
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
    }
    else {
        if (saveButton) {
            localStorage.removeItem(courseKey);
            saveButton.textContent = "Add";
            saveButton.style.backgroundColor = "#fcfcfd";
        }
    }
}
function handleClearClick() {
    localStorage.clear();
    const addButtons = document.querySelectorAll("[id$='-addButton']");
    addButtons.forEach((button) => {
        const htmlButton = button;
        htmlButton.textContent = "Add";
        htmlButton.style.backgroundColor = "#fcfcfd";
    });
}
const enrollCourses = async () => {
    const studentIdStr = location.search.split("=")[1];
    const studentId = parseInt(studentIdStr, 10);
    try {
        // Använd getUserById för att hämta befintlig användarinformation
        const currentUserData = await getUserById(studentId);
        if (currentUserData) {
            // Hämta kurser från localStorage
            const keys = Object.keys(localStorage);
            const courseKeys = keys.filter((key) => key.startsWith("course-"));
            const newCourses = courseKeys
                .map((key) => {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            })
                .filter((course) => course !== null);
            const updatedUserData = {
                ...currentUserData,
                enrolledCourses: [
                    ...(currentUserData.enrolledCourses || []),
                    ...newCourses,
                ],
            };
            const updateUserUrl = `${settings.JSON_STUDENT}/${studentId}`;
            const updateHttp = new HttpClient(updateUserUrl);
            await updateHttp.update(updatedUserData);
            alert("Courses enrolled");
        }
        else {
            console.log("User not found");
        }
    }
    catch (error) {
        console.log("Failed to enroll course", error);
    }
};
const enrollButton = document.getElementById("enrollBtn");
if (enrollButton) {
    enrollButton.addEventListener("click", enrollCourses);
}
