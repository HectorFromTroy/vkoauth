import axios from "axios"; 
import axiosJSONP from "axios-jsonp";

const API_REQUEST = axios.create({
  baseURL: "https://api.vk.com/method",
  adapter: axiosJSONP
});

export const getProfileAndFriendsInfo = async ({ userID, accessToken }, API_VERSION) => {
  const VK_API_CODE = `
    var profileInfo = API.users.get({
      "user_id": "${userID}",
      "fields": "photo_100"
    });
    var friendsInfo = API.friends.search({
      "user_id": "${userID}",
      "fields": "photo_100",
      "count": "5"
    });
    return {
      "profileInfo": profileInfo,
      "friendsInfo": friendsInfo
    };
  `;
  const profileData = await API_REQUEST(`execute?code=${VK_API_CODE}&access_token=${accessToken}&v=${API_VERSION}`);
  return profileData;
};