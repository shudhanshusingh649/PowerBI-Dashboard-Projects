import Select from "react-select";
// import cities from "../data/indianCities";

export default function CitySearch({ onSelect }) {
  // Mocking the cities array for demonstration
  const cities = [
    { name: "Patna", lat: 25.5941, lng: 85.1376 },
    { name: "New Delhi", lat: 28.6139, lng: 77.2090 },
    { name: "Mumbai", lat: 19.0760, lng: 72.8777 },
    { name: "Bengaluru", lat: 12.9716, lng: 77.5946 },
  ];

  const options = cities.map(city => ({
    value: city,
    label: city.name.toUpperCase() // Uppercase for terminal aesthetic
  }));

  // Deep CSS Override for React-Select to match the ISRO Command Center theme
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "rgba(0, 0, 0, 0.4)", // bg-black/40
      borderColor: state.isFocused ? "#00F0FF" : "rgba(255, 255, 255, 0.1)",
      boxShadow: state.isFocused ? "0 0 0 1px #00F0FF" : "none",
      padding: "2px",
      borderRadius: "0.5rem",
      cursor: "text",
      transition: "all 0.3s ease",
      "&:hover": {
        borderColor: state.isFocused ? "#00F0FF" : "rgba(255, 255, 255, 0.3)",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#0B192C",
      border: "1px solid rgba(0, 240, 255, 0.3)",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.8)",
      borderRadius: "0.5rem",
      overflow: "hidden",
      zIndex: 50,
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0, // Removes default padding to make hover states flush
      "::-webkit-scrollbar": {
        width: "6px",
      },
      "::-webkit-scrollbar-track": {
        background: "#040B16",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#1E3A8A",
        borderRadius: "10px",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "rgba(0, 240, 255, 0.15)" // Subtle cyan for selected
        : state.isFocused
        ? "rgba(255, 255, 255, 0.05)" // Subtle white hover
        : "transparent",
      color: state.isSelected ? "#00F0FF" : "#94a3b8",
      fontFamily: "monospace",
      fontSize: "14px",
      letterSpacing: "0.05em",
      cursor: "pointer",
      borderLeft: state.isSelected ? "2px solid #00F0FF" : "2px solid transparent",
      "&:active": {
        backgroundColor: "rgba(0, 240, 255, 0.2)",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#ffffff",
      fontFamily: "monospace",
      letterSpacing: "0.05em",
    }),
    input: (provided) => ({
      ...provided,
      color: "#ffffff",
      fontFamily: "monospace",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#64748b",
      fontFamily: "monospace",
      fontSize: "12px",
      letterSpacing: "0.1em",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#00F0FF",
      "&:hover": {
        color: "#ffffff",
      },
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: "#FF5500", // Hazard orange for the clear 'X'
      "&:hover": {
        color: "#ffffff",
      },
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    }),
  };

  return (
    <Select
      styles={customStyles}
      options={options}
      placeholder="INITIALIZE NODE SEARCH..."
      isClearable
      onChange={(selected) => {
        if (selected) {
          onSelect(selected.value);
        }
      }}
    />
  );
}