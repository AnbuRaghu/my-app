import "./App.css";
import styled from "styled-components";
import Autocomplete from "./components/autoComplete/AutoComplete";
import { useState } from "react";
import SelectBox from "./components/selectBox.tsx/SelectBox";
import Button from "./components/button/Button";
import CustomCheckbox from "./components/CheckBox/checkbox";
import Checkbox from "./components/CheckBox/checkbox";

const Container = styled.div`
    max-width: 1000px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Spacer = styled.div`
    padding: 2rem;
`;

function App() {
    // for autocomplete
    const suggestions = ["Apple", "Banana", "Orange", "Pineapple", "Mango"];
    // for selecrtbox
    const [selectedValue, setSelectedValue] = useState("");
    const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];

    // button
    const handleClick = () => {
        console.log("Button clicked");
    };

    // Example copy handler
    const handleCopy = (event: React.ClipboardEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log("Content copied");
    };




    // check box
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (checked: boolean) => {
      setIsChecked(checked);
    };

    return (
        <Container className="App">
            <Autocomplete suggestions={suggestions} />
            <Spacer />
            <div>
                <SelectBox
                    options={options}
                    onChange={(value) => setSelectedValue(value)}
                    // defaultValue={options[0].value}
                />
                <p>Selected Value: {selectedValue}</p>
            </div>

            <Spacer />
            <div>
                {/* Button as a button */}
                <Button
                    variant="primary"
                    disabled={false}
                    onClick={handleClick}
                    onCopy={handleCopy}
                >
                    Primary Button
                </Button>

                {/* Button as a link */}
                <Button
                    href="https://example.com"
                    variant="secondary"
                    disabled={true}
                    onClick={handleClick}
                    onCopy={handleCopy}
                >
                    Go to Example.com
                </Button>
            </div>

            <Spacer />
            <div>
      <Checkbox label="Example Checkbox" checked={isChecked} onChange={handleCheckboxChange} />
    </div>
        </Container>
    );
}

export default App;
