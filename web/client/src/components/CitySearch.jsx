import Select from "react-select";
import cities from "../data/indianCities";

export default function CitySearch({ onSelect }) {

  const options = cities.map(city => ({
    value: city,
    label: city.name
  }));

  return (

    <Select

      options={options}

      placeholder="Search Indian City..."

      isClearable

      onChange={(selected)=>{

        if (selected) {
          onSelect(selected.value);
        }

      }}

    />

  );

}