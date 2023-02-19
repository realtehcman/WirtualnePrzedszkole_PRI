import React from "react";
import {configure, shallow} from "enzyme";
import GalleryNavi from "../pages/gallery/GalleryNavi";
import Sidebar from "../components/sidebar/sidebar";
import Navbar from "../components/navbar/navbar";
import Gallery from "../pages/gallery/Gallery";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

describe("<GalleryNavi />", () => {
    it("should render a <div> with class 'users gallery'", () => {
        const wrapper = shallow(<GalleryNavi />);
        expect(wrapper.find(".users.gallery").length).toEqual(1);
    });

    it("should render the <Sidebar /> component", () => {
        const wrapper = shallow(<GalleryNavi />);
        expect(wrapper.find(Sidebar).length).toEqual(1);
    });

    it("should render the <Navbar /> component", () => {
        const wrapper = shallow(<GalleryNavi />);
        expect(wrapper.find(Navbar).length).toEqual(1);
    });

    it("should render the <Gallery /> component", () => {
        const wrapper = shallow(<GalleryNavi />);
        expect(wrapper.find(Gallery).length).toEqual(1);
    });
});
