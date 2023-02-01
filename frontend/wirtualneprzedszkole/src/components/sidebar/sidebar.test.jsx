import React from 'react';
import {configure, shallow} from 'enzyme';
import Sidebar from './Sidebar';
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import GroupsIcon from "@mui/icons-material/Groups";
import MessageIcon from "@mui/icons-material/Message";
import SchoolIcon from "@mui/icons-material/School";
import CollectionsIcon from "@mui/icons-material/Collections";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CurrentUserService from "../../pages/Home/CurrentUserService";
import Adapter from "enzyme-adapter-react-16";
import {render, waitFor} from '@testing-library/react';
import {MemoryRouter} from "react-router-dom";

configure({adapter: new Adapter()});
jest.mock('../../pages/Home/CurrentUserService');

describe('Sidebar', () => {
    let wrapper;
    let screenSize;

    beforeEach(() => {
        wrapper = shallow(<Sidebar/>);
        screenSize = window.innerWidth;
        CurrentUserService.getCurrentUsers.mockResolvedValue({
            data: {id: 1, role: 'PARENT'},
        });

    });

    afterEach(() => {
        jest.clearAllMocks();
        window.innerWidth = screenSize;
    });

    it('should render without crashing', () => {
        expect(wrapper).toBeDefined();
    });

    it('should render a menu when current_user.role is "PARENT"', () => {
        wrapper.setProps({current_user: {role: 'PARENT'}});
        expect(wrapper.find(AccountBoxIcon).length).toBe(1);
        expect(wrapper.find(MessageIcon).length).toBe(1);
        expect(wrapper.find(SchoolIcon).length).toBe(1);
        expect(wrapper.find(CollectionsIcon).length).toBe(1);
    });

    it('should render a different menu when current_user.role is not "PARENT"', () => {
        wrapper.setProps({current_user: {role: 'OTHER'}});
        expect(wrapper.find(FamilyRestroomIcon).length).toBe(1);
        expect(wrapper.find(GroupsIcon).length).toBe(1);
        expect(wrapper.find(ChildCareIcon).length).toBe(1);
        expect(wrapper.find(MessageIcon).length).toBe(1);
    });

    it('should render the correct links for a parent user', async () => {
        window.innerWidth = 600;
        const {getByText} = render(
            <MemoryRouter>
                <Sidebar/>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(getByText('Profil')).toBeTruthy();
            expect(getByText('Wiadomości')).toBeTruthy();
            expect(getByText('Baza wiedzy')).toBeTruthy();
            expect(getByText('Galeria')).toBeTruthy();
        });
    });

    it('should render the correct links for a teacher user', async () => {
        window.innerWidth = 600;
        CurrentUserService.getCurrentUsers.mockResolvedValue({
            data: {id: 1, role: 'TEACHER'},
        });
        const {getByText} = render(
            <MemoryRouter>
                <Sidebar/>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(getByText('Profil')).toBeTruthy();
            expect(getByText('Rodzice')).toBeTruthy();
            expect(getByText('Grupy')).toBeTruthy();
            expect(getByText('Dzieci')).toBeTruthy();
            expect(getByText('Wiadomości')).toBeTruthy();
        });
    });

});
