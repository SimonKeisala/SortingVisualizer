import React from "react";
import { Select, MenuItem, InputLabel, Stack, FormControl } from "@mui/material";
import "./Header.css"


function Dropdown(label, key, values, onChange) {
    let items = values.map((item) => <MenuItem key={item.name} value={item.data}>{item.name}</MenuItem>);
    return (
        <FormControl>
            <InputLabel id="dropdown-label">{label}</InputLabel>
            <Select
                labelId="dropdown-label"
                id="dropdown"
                value={key}
                label={label}
                onChange={onChange}
            >
                {items}
            </Select>
        </FormControl>
    )
}

function Header() {
    const [algorithm, setAlgorithm] = React.useState("");
    function handleChange(e) {
        setAlgorithm(e.target.value);
        handleEvent({ algorithm: e.target.value })
    }
    return (
        <div className="header">
            <Stack direction="row" spacing={3} padding={3}>
                {Dropdown("test", algorithm, [{ data: 1, name: "woop" }], handleChange)}
            </Stack>
        </div>
    )
}

export default Header;