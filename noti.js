const admin = require("firebase-admin"); 


const sendNotification = (reqTopic,title,body)=>{
    const topic = reqTopic;


 const  message = {
  notification: {
    title: title,
    body: body
  },}
    admin.messaging().sendToTopic(topic,message)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
}

module.exports = {
    sendNotification
    };


  

// };
// Send a message to devices subscribed to the provided topic.
