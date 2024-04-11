import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router-dom";
import { fireEvent,  render, waitFor } from '@testing-library/react';
import ApplicationUpload from './ApplicationUpload';
import AlertContext, { AlertContextProps } from "../../contexts/AlertContext";
import AuthContext, { AuthContextProps } from '../../contexts/AuthContext';
import fetch,{ enableFetchMocks } from 'jest-fetch-mock';
import ApplicationFormInputFields from './ApplicationUploadFormFields';
import {createMemoryHistory} from "history";
enableFetchMocks();

const alert = null;
const sendAlert = jest.fn();
const mockContextValue: AlertContextProps = {
    alert,
    sendAlert,
};

const login = jest.fn();
const currentUser = { user_id: '123', auth_token: 'mockAuthToken' };
const signup = jest.fn();
const signupMobile = jest.fn();
const generateOtp = jest.fn();
const generateOtpMobile = jest.fn();
const logout = jest.fn();
const loginMobile = jest.fn();
const changePassword = jest.fn();
const generateResetOtp = jest.fn();
const resetPassword = jest.fn();

const mockAuthContextValue: AuthContextProps = {
    login,
    currentUser,
    signup,
    signupMobile,
    generateOtp,
    generateOtpMobile,
    logout,
    loginMobile,
    changePassword,
    generateResetOtp,
    resetPassword,
};


const setup = () => {
    return render(
        <MemoryRouter>
            <AlertContext.Provider value={mockContextValue}>
                <AuthContext.Provider value={mockAuthContextValue}>
                    <ApplicationUpload />
                </AuthContext.Provider>
            </AlertContext.Provider>
        </MemoryRouter>
    );
};

describe('ApplicationUpload Component', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });
    afterEach(() => {
        fetchMock.resetMocks();
    });

    test("ApplicationUpload Component - new application [all components rendered] ", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({
            output: 'no records'
        }), { status: 200 });

        const {getByRole, getByText}=setup();
        await waitFor(() => {
            expect(fetch.mock.calls.length).toEqual(1);
            expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/application/getUserApplication');
        });

        // Check if headings are present
        expect(getByText('Certified Castrol Workshop Application')).toBeInTheDocument();
        expect(getByText('Take your workshop to the next level!')).toBeInTheDocument();
        expect(getByText('Drag files to upload')).toBeInTheDocument();

        // Check if buttons are present
        expect(getByRole('button', { name: 'Choose Files' })).toBeInTheDocument();
        expect(getByRole('button', { name: 'Submit' })).toBeInTheDocument();

        //all input fields
        const inputFields = ApplicationFormInputFields.filter(
            (field) => field.type === 'text' && field.text_type==="text"
          );
          inputFields.forEach((field) => {
            const inputElement = getByRole('textbox', { name: field.label +" *" });
            expect(inputElement).toBeInTheDocument();
            
          });
        
          //spin button
          const bays_count = getByRole('spinbutton', {name:"Number of bays in your workshop *" });
          expect(bays_count).toBeInTheDocument();

        // all dropdown fields
        const dropdownFields = ApplicationFormInputFields.filter(
            (field) => field.type === 'dropdown' && field.required
          );
          dropdownFields.forEach((field) => {
            const inputElement = getByRole('combobox', { name: field.label });
            expect(inputElement).toBeInTheDocument();
            
          });

          //file upload present 
          expect(getByRole('presentation')).toBeInTheDocument();
          expect(getByText('Upload high quality videos and images of the workshop and garage service bays.')).toBeInTheDocument();
          expect(getByText('Make sure to upload images and videos showcasing the various services your workshop offers.')).toBeInTheDocument();
          //all checkbox present
          const checkboxFields = ApplicationFormInputFields.filter(
            (field) => field.type === 'checkbox' 
          );
          checkboxFields.forEach((field) => {
            const inputElement = getByRole('checkbox', { name: field.name });
            expect(inputElement).toBeInTheDocument();
            
          });

    });

    test("ApplicationUpload Component - new application [submitted successfully] ", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({
            output: 'no records',
            msg: 'No application found',
        }), { status: 200 });

        const {getByRole,getByText}=setup();
        await waitFor(() => {
            expect(fetch.mock.calls.length).toEqual(1); 
        });

        const workshop_name = getByRole('textbox', { name: "Workshop name *" });
        const workshop_post_code = getByRole('textbox', { name: "Workshop postcode *" });
        const address = getByRole('textbox', { name: "Address *" });
        const state = getByRole('textbox', { name: "State *" });
        const city = getByRole('textbox', { name: "City *" });
        const user_name = getByRole('textbox', { name: "Your Name *" });
        const user_mobile = getByRole('textbox', { name: "Your telephone number *" });
        const bays_count = getByRole('spinbutton', {name:"Number of bays in your workshop *" });
        const consent_process_data = getByRole('checkbox', { name: "consent_process_data" });
        const consent_being_contacted = getByRole('checkbox', { name: "consent_being_contacted" });
        const consent_receive_info = getByRole('checkbox', { name: "consent_receive_info" });
        const submit=getByRole('button', { name: 'Submit' });
        fireEvent.change(workshop_name, { target: { value: "New Workshop Name" } });
        fireEvent.change(workshop_post_code, { target: { value: "123456" } });
        fireEvent.change(address, { target: { value: "123 Main St Vellore TamilNadu" } });
        fireEvent.change(state, { target: { value: "New State" } });
        fireEvent.change(city, { target: { value: "New City" } });
        fireEvent.change(user_name, { target: { value: "New User Name" } });
        fireEvent.change(user_mobile, { target: { value: "9876543210" } });
        fireEvent.change(bays_count, { target: { value: 6 } });
        fireEvent.mouseDown(getByRole('combobox', { name: "Expertise" }), "German Cars");
        expect(getByText(/German Car/i)).toBeInTheDocument();
        fireEvent.click(getByText(/German Car/i));
        fireEvent.mouseDown(getByRole('combobox', { name: "Brand" }), "BMW");
        expect(getByText(/BMW/i)).toBeInTheDocument();
        fireEvent.click(getByText(/BMW/i));
        fireEvent.click(consent_process_data);
        fireEvent.click(consent_being_contacted);
        fireEvent.click(consent_receive_info);
        const chooseFilesButton = getByRole('button', { name: 'Choose Files' });
        const file = new File(["hello"], "./test_assets/alex-suprun-AHnhdjyTNGM-unsplash.jpg", { type: "image/jpg" })
        fireEvent.change(chooseFilesButton, { target: { files: [file] } });
        fetchMock.mockResponseOnce(JSON.stringify({output: 'success',msg: 'Application inserted successfully'}), { status: 201 });
        
        await waitFor(() => {fireEvent.click(submit);});
        await waitFor(()=>{
            expect(getByRole('form')).toHaveFormValues({
                "workshop_name": "New Workshop Name",
                "workshop_post_code": "123456",
                "address": "123 Main St Vellore TamilNadu",
                "state": "New State",
                "city": "New City",
                "user_name": "New User Name",
                "user_mobile": "9876543210",
                "bay_count": 6,
                "services_offered": ["Oil Change","Fluid Checks","Routine Maintenance"],
                "expertise": "German Cars",
                "brands": "BMW",
                "consent_process_data": true,
                "consent_being_contacted": true,
                "consent_receive_info": true
            });
        });
        
        expect(fetch.mock.calls.length).toEqual(2);
        expect(fetch.mock.calls[1][0]).toEqual('http://localhost:3000/application');
        expect(sendAlert).toHaveBeenCalledWith({ message: 'Application Submitted Succesfully', type: 'success' });
        await waitFor(() => {
            const history = createMemoryHistory({ initialEntries: ['/upload'] }); 
            history.listen(() => {
              expect(history.location.pathname).toBe("/");
            });
          });

    });

    test("ApplicationUpload Component - edit mode [all components rendered] ", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({
            output: 'success', 
            msg: 'Record fetched successfully',
            result: {
                "application_id": 1,
                "user_id": 5,
                "workshop_name": "ABCshop",
                "workshop_post_code": "600062",
                "address": "abc, darri road korba chattisgarh",
                "state": "Tamil Nadu",
                "city": "Korba",
                "user_name": "Bp castrol",
                "user_mobile": 1234567890,
                "bay_count": 4,
                "services_offered": "Oil Change,Fluid Checks,Routine Maintenance",
                "expertise": "Hybrid and Electric Luxury Cars",
                "brands": "BMW",
                "consent_process_data": "1",
                "consent_being_contacted": "1",
                "consent_receive_info": "1",
                "file_paths": "[\"https://firebasestorage.googleapis.com/v0/b/bp-capstone-file-storage.appspot.com/o/userFiles%2FScreenshot%202023-03-06%20202940.png-1711020824395?alt=media&token=bff90d22-7446-41de-9432-004b3000419c\"]",
                "application_status": "Pending",
            }
        }), { status: 200 });

        const {getByRole, getByText}=setup();
        await waitFor(() => {
            expect(fetch.mock.calls.length).toEqual(1); 
            expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/application/getUserApplication');
        });
        // Check if buttons are present
        expect(getByRole('button', { name: 'Submit' })).toBeInTheDocument();

        //all input fields
        const inputFields = ApplicationFormInputFields.filter(
            (field) => field.type === 'text' && field.text_type==="text"
          );
          inputFields.forEach((field) => {
            const inputElement = getByRole('textbox', { name: field.label +" *" });
            expect(inputElement).toBeInTheDocument();
            
          });
        
          //spin button
          const bays_count = getByRole('spinbutton', {name:"Number of bays in your workshop *" });
          expect(bays_count).toBeInTheDocument();

        // all dropdown fields
        const dropdownFields = ApplicationFormInputFields.filter(
            (field) => field.type === 'dropdown' && field.required
          );
          dropdownFields.forEach((field) => {
            const inputElement = getByRole('combobox', { name: field.label });
            expect(inputElement).toBeInTheDocument();
            
          });
          //file upload present 
          expect(getByRole('presentation')).toBeInTheDocument();
          expect(getByText('Upload high quality videos and images of the workshop and garage service bays.')).toBeInTheDocument();
          expect(getByText('Make sure to upload images and videos showcasing the various services your workshop offers.')).toBeInTheDocument();
          //all checkbox present
          const checkboxFields = ApplicationFormInputFields.filter(
            (field) => field.type === 'checkbox' 
          );
          checkboxFields.forEach((field) => {
            const inputElement = getByRole('checkbox', { name: field.name });
            expect(inputElement).toBeInTheDocument();
            
          });
    });

    test("ApplicationUpload Component - edit mode [edited the old application and submitted successfully]", async () => {
        
        fetchMock.mockResponseOnce(JSON.stringify({
            output: 'success', 
            msg: 'Record fetched successfully',
            result: {
                "application_id": 1,
                "user_id": 5,
                "workshop_name": "ABCshop",
                "workshop_post_code": "600062",
                "address": "abc, darri road korba chattisgarh",
                "state": "Tamil Nadu",
                "city": "Vellore",
                "user_name": "Bp castrol",
                "user_mobile": 1234567890,
                "bay_count": 4,
                "services_offered": "Oil Change,Fluid Checks,Routine Maintenance",
                "expertise": "Hybrid and Electric Luxury Cars",
                "brands": "BMW",
                "consent_process_data": "1",
                "consent_being_contacted": "1",
                "consent_receive_info": "1",
                "file_paths": "[\"https://firebasestorage.googleapis.com/v0/b/bp-capstone-file-storage.appspot.com/o/userFiles%2FScreenshot%202023-03-06%20202940.png-1711020824395?alt=media&token=bff90d22-7446-41de-9432-004b3000419c\"]",
                "application_status": "Pending",
            }
        }), { status: 200 });
    
        const { getByRole, getByText } = setup();
        await waitFor(() => {
            expect(fetch.mock.calls.length).toEqual(1); 
            expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/application/getUserApplication');
        });
        expect(getByText('Edit Your Application')).toBeInTheDocument();
        expect(getByText('Updating the form will lead to loss of old data!')).toBeInTheDocument();
        expect(getByText('Application Status')).toBeInTheDocument(); 
        const workshop_name = getByRole('textbox', { name: "Workshop name *" });
        fireEvent.change(workshop_name, { target: { value: "New Workshop Name" } });

        fireEvent.mouseDown(getByRole('combobox', { name: "Expertise" }), "German Cars");
        expect(getByText(/German Car/i)).toBeInTheDocument();
        fireEvent.click(getByText(/German Car/i));

        const submit = getByRole('button', { name: 'Submit' });
    
        fetchMock.mockResponseOnce(JSON.stringify({ output: 'success', msg: 'application updated successfully' }), { status: 200 });
    
        
        fireEvent.click(submit);
    
        
        await waitFor(() => {
            expect(fetch.mock.calls.length).toEqual(2); // Two fetch calls: initial data fetch and form submission
            expect(fetch.mock.calls[1][0]).toEqual('http://localhost:3000/application/edit'); // Expecting edit endpoint to be called
            expect(sendAlert).toHaveBeenCalledWith({ message: 'Application Updated Succesfully', type: 'success' });
            
        });
        await waitFor(() => {
            const history = createMemoryHistory({ initialEntries: ['/upload'] }); 
            history.listen(() => {
              expect(history.location.pathname).toBe("/");
            });
          });
        await waitFor(()=>{
            expect(getByRole('form')).toHaveFormValues({
                "workshop_name": "New Workshop Name",
                "workshop_post_code": "600062",
                "address": "abc, darri road korba chattisgarh",
                "state": "Tamil Nadu",
                "city": "Vellore",
                "user_name": "Bp castrol",
                "user_mobile": "1234567890",
                "bay_count": 4,
                "services_offered": ["Oil Change","Fluid Checks", "Routine Maintenance",],
                "expertise": ["Hybrid and Electric Luxury Cars","German Cars",],
                "brands": "BMW",
                "consent_process_data": true,
                "consent_being_contacted": true,
                "consent_receive_info": true,
            });
        });
    });

    test("ApplicationUpload Component - error in submitting the form [Server Error] ", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({
            output: 'no records',
            msg: 'No application found',
        }), { status: 200 });


        const {getByRole,getByText}=setup();
        await waitFor(() => {
            expect(fetch.mock.calls.length).toEqual(1); 
        });

        const workshop_name = getByRole('textbox', { name: "Workshop name *" });
        const workshop_post_code = getByRole('textbox', { name: "Workshop postcode *" });
        const address = getByRole('textbox', { name: "Address *" });
        const state = getByRole('textbox', { name: "State *" });
        const city = getByRole('textbox', { name: "City *" });
        const user_name = getByRole('textbox', { name: "Your Name *" });
        const user_mobile = getByRole('textbox', { name: "Your telephone number *" });
        const bays_count = getByRole('spinbutton', {name:"Number of bays in your workshop *" });
        const consent_process_data = getByRole('checkbox', { name: "consent_process_data" });
        const consent_being_contacted = getByRole('checkbox', { name: "consent_being_contacted" });
        const consent_receive_info = getByRole('checkbox', { name: "consent_receive_info" });
        const submit=getByRole('button', { name: 'Submit' });
        await waitFor(()=>{
        fireEvent.change(workshop_name, { target: { value: "New Workshop Name" } });
        })
        fireEvent.change(workshop_post_code, { target: { value: "123456" } });
        await waitFor(()=>{
        fireEvent.change(address, { target: { value: "123 Main St Vellore TamilNadu" } });
        })
        fireEvent.change(state, { target: { value: "New State" } });
        fireEvent.change(city, { target: { value: "New City" } });
        fireEvent.change(user_name, { target: { value: "New User Name" } });
        fireEvent.change(user_mobile, { target: { value: "9876543210" } });
        fireEvent.change(bays_count, { target: { value: 6 } });
        fireEvent.mouseDown(getByRole('combobox', { name: "Expertise" }), "German Cars");
        expect(getByText(/German Car/i)).toBeInTheDocument();
        fireEvent.click(getByText(/German Car/i));
        fireEvent.mouseDown(getByRole('combobox', { name: "Brand" }), "BMW");
        expect(getByText(/BMW/i)).toBeInTheDocument();
        fireEvent.click(getByText(/BMW/i));
        fireEvent.click(consent_process_data);
        fireEvent.click(consent_being_contacted);
        fireEvent.click(consent_receive_info);
        fetchMock.mockResponseOnce(JSON.stringify({output: 'fail',msg: 'Error inserting application'}), { status: 500 });
        
        await waitFor(() => {fireEvent.click(submit);});
        await waitFor(()=>{
            expect(getByRole('form')).toHaveFormValues({
                "workshop_name": "New Workshop Name",
                "workshop_post_code": "123456",
                "address": "123 Main St Vellore TamilNadu",
                "state": "New State",
                "city": "New City",
                "user_name": "New User Name",
                "user_mobile": "9876543210",
                "bay_count": 6,
                "services_offered": ["Oil Change","Fluid Checks","Routine Maintenance"],
                "expertise": "German Cars",
                "brands": "BMW",
                "consent_process_data": true,
                "consent_being_contacted": true,
                "consent_receive_info": true
            });
        });
        
        expect(fetch.mock.calls.length).toEqual(2);
        expect(fetch.mock.calls[1][0]).toEqual('http://localhost:3000/application');
        expect(sendAlert).toHaveBeenCalledWith({ message: 'Error inserting application', type: 'error' });

    });
    test('ApplicationUpload Component - error in fetching data for existing application [Server Error]', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({output: 'fail',msg: 'Error in fetching data'}), { status: 500 });
        setup();
        await waitFor(() => {
            expect(fetchMock.mock.calls.length).toEqual(1);
            expect(fetchMock.mock.calls[0][0]).toEqual('http://localhost:3000/application/getUserApplication');
        });
    });
   
});
