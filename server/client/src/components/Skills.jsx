import * as React from "react";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import lamp from "../assets/P3street-lamp.png";

function Skills() {
  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 80,
    height: 40,
    padding: 10,
    "& .MuiSwitch-switchBase": {
      margin: 0,
      padding: 0,
      transform: "translateX(0px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(36px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="23" width="23" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#eef0f2" : "#99a2ab",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
      width: 40,
      height: 40,
      "&::before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#eef0f2" : "#99a2ab",
      borderRadius: 20 / 2,
    },
  }));

  //State of the Switch
  const [checked, setChecked] = React.useState(() => {
    const savedState = localStorage.getItem("switchState");
    return savedState ? JSON.parse(savedState) : false;
  });

  const handleChange = (event) => {
    const newChecked = event.target.checked;
    setChecked(newChecked);
    localStorage.setItem("switchState", JSON.stringify(newChecked));
  };

  return (
    <>
      <div
        className="font-serif pl-16 py-14 h-screen relative transition-colors duration-500"
        style={{
          backgroundColor: checked ? "#a5b4fc" : "#000000",
          color: checked ? "#000000" : "#1f2937",
        }}
      >
        <h1 className="text-left font-bold text-3xl sm:text-5xl py-3 pb-10">
          Tech Stacks
        </h1>
        <div className="flex flex-row flex-wrap">
          <section className="basis-1/4">
            <h3 className="text-left text-xl sm:text-3xl pb-3 font-bold">
              Frontend
            </h3>
            <ul className="list-none text-base sm:text-xl leading-relaxed">
              <li>HTML</li>
              <li>CSS</li>
              <li className="tracking-wide">Javascript</li>
              <li>Tailwind</li>
              <li>Material UI</li>
            </ul>
          </section>
          <section className="basis-1/4">
            <h3 className="text-left text-xl sm:text-3xl pb-3 font-bold">
              Backend
            </h3>
            <ul className="list-none text-base sm:text-xl leading-relaxed">
              <li>MongoDB</li>
              <li>MySQL</li>
              <li>NoSQL</li>
              <li>Express.js</li>
              <li>ReactJS</li>
              <li>Node.js</li>
              <li>Jenkins</li>
            </ul>
          </section>
          <section className="basis-1/4">
            <h3 className="text-left text-xl sm:text-3xl pb-3 font-bold">
              Others
            </h3>
            <ul className="list-none text-base sm:text-xl leading-relaxed">
              <li>Vite</li>
              <li>VS Code</li>
              <li>Git/ Github</li>
              <li>React Spring</li>
            </ul>
          </section>
        </div>
        <img
          src={lamp}
          className="h-3/6 sm:h-4/6 sm:w-72 absolute bottom-0 right-14 transition-opacity duration-500"
          style={{ opacity: checked ? 1 : 0 }}
          alt="lamp"
        />
        <div className="absolute bottom-28 left-12 flex flex-col">
          <MaterialUISwitch checked={checked} onChange={handleChange} />
          <cite className="text-indigo-50 text-base mt-3">
            &#91; Click here for lighting &#93;
          </cite>
        </div>
      </div>
    </>
  );
}

export default Skills;
