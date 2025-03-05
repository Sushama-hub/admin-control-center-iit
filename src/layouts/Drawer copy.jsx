import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// ---------------------------
import { sidebarConfig } from "../config/sidebarConfig";
// -----------------------
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";
// -------------------------

const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    // easing: theme.transitions.easing.sharp,
    // duration: theme.transitions.duration.enteringScreen,
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.standard * 2,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    // easing: theme.transitions.easing.easeInOut,
    // duration: theme.transitions.duration.standard * 2,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    // easing: theme.transitions.easing.easeInOut,
    // duration: theme.transitions.duration.standard * 2,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
          // easing: theme.transitions.easing.easeInOut,
          // duration: theme.transitions.duration.standard * 2,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        // "& .MuiDrawer-paper": openedMixin(theme),
        "& .MuiDrawer-paper": {
          ...openedMixin(theme),
          // ----------------
          // boxShadow: "1px 1px 2px 2px rgba(224, 227, 232, 1)",
          // backgroundColor: "#0369a1",
          backgroundColor: "#f4f4f4",
          backgroundImage: 'url("/src/assets/images/sidebar-bg-light.jpg")',
          // backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          // Overlay Layer
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(182, 195, 220, 0.7)", // Semi-transparent black overlay
            backdropFilter: "blur(5px)", // Optional: Adds a frosted glass effect
            WebkitBackdropFilter: "blur(5px)", // Safari support
            zIndex: 1, // Ensures it stays above the background image
          },

          // Ensures text and icons remain on top of the overlay
          "& *": {
            position: "relative",
            zIndex: 2,
          },
        },
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        // "& .MuiDrawer-paper": closedMixin(theme),
        "& .MuiDrawer-paper": {
          ...closedMixin(theme),
          // boxShadow: "1px 1px 2px 2px rgba(224, 227, 232, 1)",
          // backgroundColor: "#0369a1",
          backgroundColor: "#075985",
        },
      },
    },
  ],
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (id) => {
    console.log("handleClick called", id);

    if (id === "issued_records") {
      navigate("/issued_records");
    } else if (id === "returned_consumed") {
      navigate("/returned_consumed");
    } else if (id === "inventory_form") {
      navigate("/inventory_form");
    } else if (id === "inventory_records") {
      navigate("/inventory_records");
    } else if (id === "logout") {
      navigate("/");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        // open={open}
        sx={{
          // backgroundColor: "#ffffff",
          backgroundColor: "linear-gradient(45deg, #72c1ff 30%, #d5ecffed 90%)",
          //   background: "linear-gradient(to right, #0369a1, #bae6fd)",
          //   background: "linear-gradient(to right, #e5e7eb, #fafafa)",
          boxShadow: "0.8px 0.8px 0.8px 0.8px rgba(224, 227, 232, 0.9)",
        }}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            edge="start"
            sx={[
              {
                marginRight: 0,
              },
              open && { display: "block" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <img
            src="/favicon.png"
            alt="logo"
            width="40px"
            style={{ marginLeft: "10px" }}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: "#fff", ml: 1, fontWeight: "medium" }}
          >
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        {/* <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader> */}
        <DrawerHeader sx={{ mt: "4px", alignItems: "center" }}></DrawerHeader>
        {/* <Divider sx={{ borderColor: "#E0E9f4", mt: 3, mb: 3 }} /> */}

        <List>
          {/* {["User Table", "Form", "Form Details", "Logout"].map( */}
          {sidebarConfig?.items?.map((item, index) => {
            const IconComponent = item?.icon;

            return (
              <ListItem key={index} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  onClick={() => handleClick(item?.id)}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    py: 1,
                    justifyContent: open ? "initial" : "center",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: "center",
                      mr: open ? 3 : "auto",
                      // color: "#083344",
                      color: open ? "#083344" : "#fff",
                    }}
                  >
                    {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                    <IconComponent />
                  </ListItemIcon>
                  <ListItemText
                    primary={item?.label}
                    sx={{
                      opacity: open ? 1 : 0,
                      color: "#083344",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader sx={{ mt: "60px", alignItems: "center" }}></DrawerHeader>
      </Box> */}
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>

      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography sx={{ marginBottom: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box> */}
    </Box>
  );
}
