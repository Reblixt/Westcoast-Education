import { createCard } from "../dom/dom.js";
import { adminReadMoreClickHandler } from "../dom/admin-dom.js";
import HttpClient from "../http.js";
import { settings } from "../../utilities/config.js";
export const initLoadAdminCourse = async () => {
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
            adminReadMoreClickHandler(readButtons);
            readButtons.forEach((button) => {
                button.textContent = "";
                button.appendChild(document.createTextNode("Update"));
            });
        }
        else {
            console.log("Admin gallery cannot find elements");
        }
    }
    catch (error) {
        console.log(`Error accured when retriving courses ${error}`);
    }
};
