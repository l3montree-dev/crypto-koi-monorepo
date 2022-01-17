import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import React from "react";

import App from "../../src/App";

Enzyme.configure({ adapter: new Adapter() });

test("renders correctly", () => {
    const wrapper = Enzyme.shallow(<App />);

    expect(wrapper.find({ testID: "tid-message" }).contains("Loading...")).toBe(
        true
    );
});
