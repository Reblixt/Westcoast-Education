import HttpClient from "./http.js";
import { settings } from "../utilities/config.js";
import { convertFormDataToJson } from "../utilities/convert.js";

const form = document.querySelector("#signupForm") as HTMLFormElement | null;
const loginForm = document.querySelector(
  "#loginForm",
) as HTMLFormElement | null;
const section = document.querySelector("section") as HTMLElement;

interface User {
  firstName: string;
  LastName: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  repeatPassword: string;
}

/*****************************************************************************/
/************************* SIGNUP FORM ***************************************/
/*****************************************************************************/

export const addUserhandler = async (e: Event) => {
  e.preventDefault();
  if (form) {
    const requiredFields = [
      "firstName",
      "LastName",
      "email",
      "address",
      "Phone",
      "password",
      "repeatPassword",
    ];
    let isFormValid: boolean = true;

    requiredFields.forEach((fieldName) => {
      const field = form.elements.namedItem(fieldName) as HTMLInputElement;
      if (!field || !field.value.trim()) {
        alert(`Fields ${fieldName} are not allowed to be empty`);
        isFormValid = false;
        return;
      }
    });

    const user = new FormData(form);
    const obj = convertFormDataToJson(user);
    addUser(obj as User);
  }
};
const addUser = async (user: User) => {
  const url = settings.JSON_STUDENT;
  const http = new HttpClient(url);
  await http.add(user);
};

/*****************************************************************************/
/************************* LOGIN FORM ***************************************/
/*****************************************************************************/

interface UserLogin {
  email: string;
  password: string;
}

export const loginHandler = async (e: Event) => {
  e.preventDefault();

  const form = e.target as HTMLFormElement;
  const emailInput = form.querySelector('[name="email"]') as HTMLInputElement;
  const passwordInput = form.querySelector(
    '[name="password"]',
  ) as HTMLInputElement;

  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;

  const users = await getAllUsers();
  console.log("hej från loginHandler");

  const found = users.find((user: UserLogin) => user.email === email);
  if (found && found.password === password) {
    alert("Login success");
    location.href = "../../student/student-Page.html";
  } else {
    alert("Wrong E-mail or Password");
  }
};

const getAllUsers = async () => {
  try {
    const url = settings.JSON_STUDENT;
    const http = new HttpClient(url);
    return http.get();
  } catch (error) {
    throw error;
  }
};

/// Här ska jag fortsätta!!
const getUser = async (id: number) => {
  const url = `settings.JSON_STUDENT/${id}`;
  const http = new HttpClient(url);
  const user = await http.get();
  if (section) {
    section.appendChild(createUserInfoCard(user));
  }
};

if (form) {
  form.addEventListener("submit", addUserhandler);
}
if (loginForm) {
  loginForm.addEventListener("submit", loginHandler);
}
