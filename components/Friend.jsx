//The code imports various components and utilities from Material-UI, React, and other modules

// icons-->>Box etc...
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

//Friend is a component and it uses React hooks to access Redux state and functionality
//inside bracket are props 
//These props are the user's information 
const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();//to get the Redux dispatch function
  const navigate = useNavigate();//from React Router for navigation
  const { _id } = useSelector((state) => state.user);//to retrieve state variables 
  const token = useSelector((state) => state.token);//such as the user's ID, token, and friends list.
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();//hook to access the theme object from Material-UI
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);//whether the user represented by friendId is in the current user's friends list

  //makes an asynchronous request to update the friend status. It sends a PATCH request to a specific endpoint with the user IDs and token in the headers. After receiving a response, it dispatches a Redux action to update the friends list.
  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;//Friend component is exported as the default export of this module
