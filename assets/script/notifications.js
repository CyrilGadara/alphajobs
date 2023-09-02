const notificationsContainer = fetch("assets/json/notifications.json")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        const notificationsContainer = document.querySelector(".notificationsContainer");
        notificationsContainer.innerHTML = "";
        data.forEach((notification) => {
            // console.log(notification);
            const notificationElement = createNotificationElement(notification);
            notificationsContainer.appendChild(notificationElement);
        });
    })
    .catch((error) => console.error("Error fetching notifications:", error));

// Function to create a notification element
function createNotificationElement(notification) {
    const notificationHTML = `
        <div class="notificationImage">
            <img src="${notification.image}" alt="" />
        </div>
        <div class="notificationContent">
            <span class="notificationName">${notification.title}</span>
            <span class="notificationTime">${notification.date}</span>
        </div>
        <div class="notificationStatus">
            <span class="notificationdot"></span>
        </div>
    `;
    const notificationDiv = document.createElement("div");
    notificationDiv.className = `notification ${notification.status}`;
    notificationDiv.innerHTML = notificationHTML;

    return notificationDiv;
}
