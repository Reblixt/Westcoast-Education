import HttpClient from "./http.js";
import { settings } from "../utilities/config.js";
import { convertFormDataToJson } from "../utilities/convert.js";
const form = document.querySelector("#signupForm");
const loginForm = document.querySelector("#loginForm");
const section = document.querySelector("section");
/*****************************************************************************/
/************************* SIGNUP FORM ***************************************/
/*****************************************************************************/
export const addUserhandler = async (e) => {
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
        let isFormValid = true;
        requiredFields.forEach((fieldName) => {
            const field = form.elements.namedItem(fieldName);
            if (!field || !field.value.trim()) {
                alert(`Fields ${fieldName} are not allowed to be empty`);
                isFormValid = false;
                return;
            }
        });
        const user = new FormData(form);
        const obj = convertFormDataToJson(user);
        addUser(obj);
    }
};
const addUser = async (user) => {
    const url = settings.JSON_STUDENT;
    const http = new HttpClient(url);
    await http.add(user);
};
export const loginHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const emailInput = form.querySelector('[name="email"]');
    const passwordInput = form.querySelector('[name="password"]');
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    const users = await getAllUsers();
    console.log("hej från loginHandler");
    const found = users.find((user) => user.email === email);
    if (found && found.password === password) {
        alert("Login success");
        location.href = "../../student/student-Page.html";
    }
    else {
        alert("Wrong E-mail or Password");
    }
};
const getAllUsers = async () => {
    try {
        const url = settings.JSON_STUDENT;
        const http = new HttpClient(url);
        return http.get();
    }
    catch (error) {
        throw error;
    }
};
/// Här ska jag fortsätta!!
const getUser = async (id) => {
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
