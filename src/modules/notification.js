import notificationContainerMarkup from "../partials/notification.html";
import notificationMessageTemplate from "../templates/notificationMessageTemplate.hbs";
const body = document.querySelector("body");
let timerId;
const notifyUser = function (notificationMessage) {
  const notificationDistruct = function (parentElem) {
    clearInterval(timerId);
    timerId = setTimeout(() => {
      parentElem.remove();
    }, 6000);
    if (parentElem.children.length === 0) {
      parentElem.remove();
    }
  };
  const notificationData = {
    notification: notificationMessage,
  };
  const markup = notificationMessageTemplate(notificationData);

  if (document.querySelector(".notification_container") === null) {
    body.insertAdjacentHTML("beforeend", notificationContainerMarkup);
    const notificationContainer = document.querySelector(
      ".notification_container"
    );
    notificationContainer.insertAdjacentHTML("beforeend", markup);
    notificationDistruct(notificationContainer);
  } else if (
    document.querySelector(".notification_container").children.length > 10
  ) {
    return;
  } else {
    const notificationContainer = document.querySelector(
      ".notification_container"
    );
    notificationContainer.insertAdjacentHTML("beforeend", markup);
    notificationDistruct(notificationContainer);
  }
};

export default notifyUser;
