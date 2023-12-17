//Box-component
//@mui/material - package
//styled - utility function 
import { Box } from "@mui/material";
import { styled } from "@mui/system";

// it creates a component called FlexBetween
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
