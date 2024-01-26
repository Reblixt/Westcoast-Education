const getFromStorage = (key) => {
    const keyitem = `course-${key}`;
    const courseInfo = localStorage.getItem(keyitem);
    if (courseInfo) {
        return courseInfo;
    }
    else {
        console.log("No storage found");
        return null;
    }
};
export const createCheckoutCard = () => {
    const keys = Object.keys(localStorage);
    const productKeys = keys.filter((key) => key.startsWith("course-"));
    let totalPrice = 0;
    productKeys.forEach((productKey) => {
        const productId = productKey.split("-")[1];
        const courseInfo = getFromStorage(productId);
        if (courseInfo) {
            const courseData = JSON.parse(courseInfo);
            const coursePrice = parseFloat(courseData.price); // Konverterar priset till ett tal
            const courseText = `${courseData.name} - Price: ${coursePrice}`;
            const selectedCourse = document.createElement("p");
            selectedCourse.textContent = courseText;
            document.querySelector("#checkoutContainer").appendChild(selectedCourse);
            totalPrice += coursePrice;
        }
    });
    // Här kan du också hantera att visa totalPrice någonstans i gränssnittet
    const totalSumElement = document.createElement("p");
    totalSumElement.textContent = `Total sum: ${totalPrice} SEK`;
    document.querySelector("#checkoutContainer").appendChild(totalSumElement);
    const buyButton = document.createElement("button");
    buyButton.textContent = "Buy Now";
    buyButton.id = "buyBtn";
    document.querySelector("#checkoutContainer").appendChild(buyButton);
};
export const createUserInfoCard = (user, container) => {
    const div = document.createElement("div");
    div.className = `userPofile-${user.id}`;
    const h2 = document.createElement("h2");
    h2.textContent = "Student Profile";
    const firstNameP = document.createElement("p");
    firstNameP.textContent = `First name: ${user.firstName}`;
    const lastNameP = document.createElement("p");
    lastNameP.textContent = `Last name: ${user.lastName}`;
    const emailP = document.createElement("p");
    emailP.textContent = `Email: ${user.email}`;
    const addressP = document.createElement("p");
    addressP.textContent = `Address: ${user.address}`;
    const phoneP = document.createElement("p");
    phoneP.textContent = `Phone: ${user.phone}`;
    const idP = document.createElement("p");
    idP.textContent = `ID: ${user.id}`;
    div.appendChild(h2);
    div.appendChild(firstNameP);
    div.appendChild(lastNameP);
    div.appendChild(emailP);
    div.appendChild(addressP);
    div.appendChild(phoneP);
    div.appendChild(idP);
    container.appendChild(div);
};
export const createClearLocalStorageButton = (className, text, clearFuction) => {
    const clearButton = document.createElement("button");
    clearButton.classList.add("clearBtn");
    clearButton.id = "clearBtn";
    clearButton.innerText = text;
    document.querySelector(className).appendChild(clearButton);
    clearButton.addEventListener("click", clearFuction);
    return clearButton;
};
export const createEnrollodCoursesCard = (student, container) => {
    // Kontrollera om studenten har några inskrivna kurser
    if (!student.enrolledCourses || student.enrolledCourses.length === 0) {
        console.log(`Inga inskrivna kurser för student ${student.id}`);
        return;
    }
    student.enrolledCourses.forEach(course => {
        const enrolledCard = document.createElement('div');
        const courseId = document.createElement('p');
        courseId.textContent = `Course ID: ${course.id}`;
        const courseName = document.createElement('p');
        courseName.textContent = `Course Name: ${course.name}`;
        enrolledCard.appendChild(courseId);
        enrolledCard.appendChild(courseName);
        container.appendChild(enrolledCard);
    });
};
