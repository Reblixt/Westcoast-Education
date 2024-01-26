import HttpClient from "./http.js";
import { settings } from "../utilities/config.js";
import { convertFormDataToJson } from "../utilities/convert.js";

const form = document.querySelector("#signupForm") as HTMLFormElement | null;
const loginForm = document.querySelector(
  "#loginForm",
) as HTMLFormElement | null;

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

export const loginHandler = async (e: Event) => {
  e.preventDefault();

  const form = e.target as HTMLFormElement;
  const emailInput = form.querySelector('[name="email"]') as HTMLInputElement;
  const passwordInput = form.querySelector(
    '[name="password"]',
  ) as HTMLInputElement;

  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;
  try {
    const user = await getUserByEmailAndPassword(email, password);
    if (user) {
      alert("Login success");
      location.href = `../../student/student-Page.html?studentId=${user.id}`;
    } else {
      alert("Wrong E-mail or Password");
    }
  } catch (error) {
    alert("Login failed");
    console.error(error);
  }
};

const getUserByEmailAndPassword = async (email: string, password: string) => {
  const url = `${settings.JSON_STUDENT}/?email=${email}&password=${password}`;
  const http = new HttpClient(url);
  const users = await http.get();
  return users[0];
};

if (form) {
  form.addEventListener("submit", addUserhandler);
}
if (loginForm) {
  loginForm.addEventListener("submit", loginHandler);
}
