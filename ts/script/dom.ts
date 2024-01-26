/***************************************************************/
/******************* Dom manipulering **************************/
/***************************************************************/

const createCard = (course: any) => {
  const div = document.createElement("div");
  div.classList.add("course-image");
  div.id = course.id;
  div.appendChild(createImg(course.imageUrl, course.id));

  const courseInfoElement = createCourseInfo(course);
  courseInfoElement.forEach((element) => {
    div.appendChild(element);
  });

  div.appendChild(createButton(course.id));
  div.appendChild(createInfoButton(course.id));
  return div;
};

const createImg = (imageUrl: string, id: any) => {
  const img = document.createElement("img");
  img.setAttribute("src", `../content/images/${imageUrl}`);
  //  img.setAttribute("id", id);
  // img.setAttribute("style", "height:125px; width:125px");
  return img;
};

const createCourseInfo = (course: any) => {
  const courseName = document.createElement("p");
  courseName.appendChild(document.createTextNode(`${course.courseName}`));
  courseName.classList.add("course-name");

  const teacherName = document.createElement("p");
  teacherName.appendChild(
    document.createTextNode(`Teacher: ${course.courseTeacher}`),
  );
  teacherName.classList.add("teacher-name");

  const description = document.createElement("p");
  description.appendChild(
    document.createTextNode(`${course.courseDescription}`),
  );
  description.classList.add("course-desc");

  const price = document.createElement("p");
  price.appendChild(document.createTextNode(`Price: ${course.price} SEK`));
  price.classList.add("course-price");

  const location = document.createElement("p");
  location.appendChild(
    document.createTextNode(`Location: ${course.courseLocation}`),
  );
  location.classList.add("course-location");

  const courseLength = document.createElement("p");
  courseLength.appendChild(document.createTextNode(`${course.courseLength}`));
  courseLength.classList.add("course-length");

  return [courseName, teacherName, description, price, location, courseLength];
};

const createButton = (course: any) => {
  const addButton = document.createElement("button");
  addButton.classList.add("course-button");
  addButton.id = course + "-addButton";
  addButton.setAttribute("type", "button");
  addButton.innerText = "Add";
  return addButton;
};

const createInfoButton = (course: any) => {
  const addInfoButton = document.createElement("button");
  addInfoButton.classList.add("info-button");
  addInfoButton.id = course;
  addInfoButton.setAttribute("type", "button");
  addInfoButton.innerText = "Read more";
  return addInfoButton;
};

const readMoreClickHandler = (readButtons: any) => {
  readButtons.forEach((readbutton: any) => {
    const src = readbutton.getAttribute("src");
    const courseId = readbutton.getAttribute("id");

    readbutton.addEventListener("click", () => {
      console.log(location);
      location.href = `/pages/Course-Page.html?id=${courseId}`;
    });
  });
};

const createDateInfo = (course: any) => {
  const firstDate = document.createElement("p");
  firstDate.classList.add("dates");
  firstDate.appendChild(
    document.createTextNode(`The first course start at ${course.dateOne}`),
  );
  const secoundDate = document.createElement("p");
  secoundDate.classList.add("dates");
  secoundDate.appendChild(
    document.createTextNode(`The secound course start at ${course.dateTwo}`),
  );
  const thirdDate = document.createElement("p");
  thirdDate.classList.add("dates");
  thirdDate.appendChild(
    document.createTextNode(`The third start at ${course.dateThree}`),
  );
  return [firstDate, secoundDate, thirdDate];
};

const createCompleteCourseCard = (course: any) => {
  const div = createCard(course);

  const loopDateInfo = createDateInfo(course);
  loopDateInfo.forEach((element) => {
    div.appendChild(element);
  });

  return div;
};

export { createCard, readMoreClickHandler, createCompleteCourseCard };
