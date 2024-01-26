import { settings } from "../../utilities/config.js";
import HttpClient from "../http.js";
import {
  createEnrollodCoursesCard,
  createUserInfoCard,
} from "./student-dom.js";

export const initenrolledList = async () => {
  userInfo();
};

const getAllUser = async () => {
  const url = `${settings.JSON_STUDENT}`;
  const http = new HttpClient(url);
  return await http.get();
};

const userInfo = async () => {
  const users = await getAllUser();
  const mainContainer = document.querySelector("section");

  users.forEach((user: any) => {
    const userContainer = document.createElement("div");
    userContainer.className = `user-profile-${user.id}`;

    createUserInfoCard(user, userContainer);
    createEnrollodCoursesCard(user, userContainer);
    if (mainContainer) {
      mainContainer.appendChild(userContainer);
    }
  });
};
