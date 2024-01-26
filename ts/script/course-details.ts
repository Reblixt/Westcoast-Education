import { createCompleteCourseCard } from "./dom.js";
import HttpClient from "./http.js";
import { settings } from "../utilities/config.js";

const courseCard = document.querySelector(".coursePageDesc");

export const initCourseDetailPage = () => {
  const courseId = location.search.split("=")[1];
  displayCourseDetails(courseId);
};

const displayCourseDetails = async (id: any) => {
  const url = `${settings.JSON_COURSE}/${id}`;
  const http = new HttpClient(url);
  const course = await http.get();
  if (courseCard) {
    courseCard.appendChild(createCompleteCourseCard(course));

    const infoButton = document.querySelector(".info-button")! as HTMLElement;
    const addButton = document.querySelector(".course-button")! as HTMLElement;
    infoButton.style.display = "none";
    addButton.style.display = "none";
  } else {
    console.log("hittar inte denna element");
  }
  return course;
};
