
import "@testing-library/jest-dom";
import { render, fireEvent } from '@testing-library/react';
import FileGrid from './FileGrid';
 
jest.mock('react-hook-form', () => ({
  useFormContext: jest.fn().mockReturnValue({
  register: jest.fn(),
  unregister: jest.fn(),
  setValue: jest.fn(),
  watch: jest.fn().mockReturnValue([]),
  }),
}));

describe('FileGrid component', () => {
  it('renders without crashing', () => {
    render(<FileGrid />);

  }); 


  it('renders the file grid with upload options and displays drag-and-drop message ', () => {
    const { getByText, getByRole } = render(<FileGrid />); 

    expect(getByText('Drag files to upload')).toBeInTheDocument();
    expect(getByText('Choose Files')).toBeInTheDocument();
    expect(getByRole('presentation')).toBeInTheDocument();

  });

  it('allows adding new files', async () => {
    const { getByText } = render(<FileGrid />);

    expect(getByText('Choose Files')).toBeInTheDocument();    

    const fileInput = getByText('Choose Files') as HTMLInputElement; 
    const file1 = new File(['file1'], 'file1.jpg', { type: 'image/jpeg' });

    fireEvent.change(fileInput, {
    target: { 
        files: [file1] 
    },
    });

    expect(fileInput.files?.[0]).toEqual(file1);

  });

});