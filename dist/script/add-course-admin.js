import HttpClient from "./http.js";
import { convertFormDataToJson } from "../utilities/convert.js";
import { settings } from "../utilities/config.js";
const form = document.querySelector("#addForm");
const checkIfCourseIdExists = async (id) => {
    const url = `${settings.JSON_COURSE}/${id}`;
    const http = new HttpClient(url);
    try {
        const course = await http.get();
        return course;
    }
    catch (error) {
        console.log("Error in retrieving course:", error);
        return null;
    }
};
export const addCourseHandler = async (e) => {
    e.preventDefault();
    if (form) {
        const requiredFields = [
            "id",
            "courseName",
            "courseLength",
            "price",
            "courseTeacher",
            "courseLocation",
            "firstCourseDate",
            "secoundCourseDate",
            "thirdCourseDate",
            "courseDescription",
        ];
        let isFormValid = true;
        requiredFields.forEach((fieldName) => {
            const field = form.elements.namedItem(fieldName);
            if (!field || !field.value.trim()) {
                alert(`Fields ${fieldName} are not allowed to be empty`);
                isFormValid = false;
                return;
            }
        });
        if (isFormValid) {
            const course = new FormData(form);
            const courseObj = convertFormDataToJson(course);
            const exists = await checkIfCourseIdExists(courseObj.id);
            if (exists) {
                alert("A course with this ID already exists. Please choose another id.");
                return;
            }
            addCourse(courseObj);
        }
    }
};
const addCourse = async (course) => {
    const url = settings.JSON_COURSE;
    const http = new HttpClient(url);
    await http.add(course);
    location.href = "/admin/index.html";
};
if (form) {
    form.addEventListener("submit", addCourseHandler);
}
