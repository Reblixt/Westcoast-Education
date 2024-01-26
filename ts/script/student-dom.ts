export const createGoToCartButton = () => {
  const button = document.createElement("button");
  button.textContent = "Continue to cart";
  button.id = "cartBtn";
  const target = document.querySelector("#checkoutContainer")!;
  target.appendChild(button);
};

const getFromStorage = (key: string) => {
  const keyitem = `course-${key}`;
  const courseInfo = localStorage.getItem(keyitem);

  if (courseInfo) {
    return courseInfo;
  } else {
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
      const courseText = `${courseData.name} - Price: ${courseData.price}`;

      const selectedCourse = document.createElement("p");
      selectedCourse.textContent = courseText;
      document.querySelector("#checkoutContainer")!.appendChild(selectedCourse);

      totalPrice += courseData.price;
    }
  });

  const totalSumElement = document.createElement("p");
  totalSumElement.textContent = `Total sum: ${totalPrice} SEK`;
  document.querySelector("#checkoutContainer")!.appendChild(totalSumElement);

  const buyButton = document.createElement("button");
  buyButton.textContent = "Buy Now";
  buyButton.id = "buyBtn";
  document.querySelector("#checkoutContainer")!.appendChild(buyButton);
};

// fortsätta här imorgen.
const createUserInfoCard = (user: string) => {
  const div = document.createElement("div");
  div.id = "userProfile";
  const h2 = document.createElement("h2");
  h2.appendChild(document.createTextNode("Student profile"));

  const firstName = document.createElement("p");
  firstName.appendChild(document.createTextNode(`First name: ${user.id}`));
  firstName.id = user.id;
  const email = document.createElement("p");
  const address = document.createElement("p");
  const phone = document.createElement("p");
  const id = document.createElement("p");
};
