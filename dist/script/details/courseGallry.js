import { createCard, readMoreClickHandler } from "../dom/dom.js";
import HttpClient from "../http.js";
import { settings } from "../../utilities/config.js";
export const initLoadCourse = async () => {
    try {
        const url = settings.JSON_COURSE;
        const http = new HttpClient(url);
        const courses = await http.get();
        const gallery = document.querySelector("#coursesContainer");
        if (gallery) {
            courses.forEach((course) => {
                gallery.appendChild(createCard(course));
            });
            const readButtons = document.querySelectorAll(".course-image .info-button");
            readMoreClickHandler(readButtons);
            const addButtons = document.querySelectorAll(".course-button");
            addButtons.forEach((button) => {
                if (button instanceof HTMLElement) {
                    button.style.display = "none";
                }
            });
        }
        else {
            console.log("Gallery elementet hittades inte");
        }
    }
    catch (error) {
        console.log(`Ett fel uppstod när hämtningen av kurser ${error}`);
    }
};
