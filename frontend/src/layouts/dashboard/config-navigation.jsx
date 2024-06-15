import SvgColor from "src/components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "dashboard",
    path: "/",
    icon: icon("ic_analytics"),
  },
  {
    title: "user",
    path: "/user",
    icon: icon("ic_user"),
  },
  {
    title: "Marathi",
    path: "/marathi",
    icon: icon("ic_lock"),
  },
  {
    title: "Hindi",
    path: "/hindi",
    icon: icon("ic_lock"),
  },
  {
    title: "English",
    path: "/english",
    icon: icon("ic_lock"),
  },
  {
    title: "login",
    path: "/login",
    icon: icon("ic_lock"),
  }
];

export default navConfig;
