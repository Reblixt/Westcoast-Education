import HttpClient from "../http.js";
import { settings } from "../../utilities/config.js";
import { convertFormDataToJson } from "../../utilities/convert.js";
const form = document.querySelector("#signupForm");
const loginForm = document.querySelector("#loginForm");
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
/*****************************************************************************/
/************************* LOGIN FORM ***************************************/
/*****************************************************************************/
export const loginHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const emailInput = form.querySelector('[name="email"]');
    const passwordInput = form.querySelector('[name="password"]');
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    try {
        const user = await getUserByEmailAndPassword(email, password);
        if (user) {
            alert("Login success");
            location.href = `../../student/student-Page.html?studentId=${user.id}`;
        }
        else {
            alert("Wrong E-mail or Password");
        }
    }
    catch (error) {
        alert("Login failed");
        console.error(error);
    }
};
const getUserByEmailAndPassword = async (email, password) => {
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
