export const adminReadMoreClickHandler = (readButtons: any) => {
  readButtons.forEach((readbutton: any) => {
    const src = readbutton.getAttribute("src");
    const courseId = readbutton.getAttribute("id");

    readbutton.addEventListener("click", () => {
      console.log(location);
      location.href = `/admin/edit-Course-Page.html?id=${courseId}`;
    });
  });
};
