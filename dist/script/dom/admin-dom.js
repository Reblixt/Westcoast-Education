export const adminReadMoreClickHandler = (readButtons) => {
    readButtons.forEach((readbutton) => {
        const src = readbutton.getAttribute("src");
        const courseId = readbutton.getAttribute("id");
        readbutton.addEventListener("click", () => {
            console.log(location);
            location.href = `/admin/edit-Course-Page.html?id=${courseId}`;
        });
    });
};
