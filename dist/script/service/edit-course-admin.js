import HttpClient from "../http.js";
import { settings } from "../../utilities/config.js";
import { convertFormDataToJson } from "../../utilities/convert.js";
const form = document.querySelector("#updateDeleteForm");
const deleteButton = document.querySelector("#deleteCourseBtn");
export const initEditCoursePage = () => {
    const courseId = location.search.split("=")[1];
    getCourse(courseId);
    form.addEventListener("submit", updateCourse);
    deleteButton.addEventListener("click", deleteCourse);
};
const getCourse = async (id) => {
    const url = `${settings.JSON_COURSE}/${id}`;
    const http = new HttpClient(url);
    const course = await http.get();
    loadDataToForm(course);
};
const loadDataToForm = (course) => {
    const adjustedCourse = {
        id: course.id,
        courseName: course.courseName,
        courseLength: course.courseLength,
        price: course.price,
        courseTeacher: course.courseTeacher,
        courseLocation: course.courseLocation,
        imageUrl: course.imageUrl,
        firstCourseDate: course.firstCourseDate,
        secoundCourseDate: course.secoundCourseDate,
        thirdCourseDate: course.thirdCourseDate,
        courseDescription: course.courseDescription,
    };
    const entries = Object.entries(adjustedCourse);
    for (let [key, value] of entries) {
        const input = form.elements.namedItem(key);
        if (input) {
            input.value = value !== undefined ? value.toString() : "";
        }
        else {
            console.log(`Form element not found for key: ${key}`);
        }
    }
};
export const updateCourse = async (e) => {
    e.preventDefault();
    const currentCourseId = location.search.split("=")[1];
    const course = new FormData(form);
    const obj = convertFormDataToJson(course);
    console.log("Updating course with data", obj);
    const url = `${settings.JSON_COURSE}/${currentCourseId}`;
    const http = new HttpClient(url);
    try {
        await http.update(obj);
        location.href = "./index.html";
    }
    catch (error) {
        console.log("Failed te update course:", error);
    }
};
export const deleteCourse = async () => {
    const currentCourseId = location.search.split("=")[1];
    const url = `${settings.JSON_COURSE}/${currentCourseId}`;
    const http = new HttpClient(url);
    await http.delete();
    location.href = ".index.html";
};
/***********************************************/
// Det finns en bugg i koden som gör att jag inte kan hämta upp all info. Har troligvis med DOM.js att göra.
//
