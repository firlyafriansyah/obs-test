import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import DialogAlert from '../../components/dialog-alert';
import useAlert from '../../hooks/use-alert';

vi.mock('../../hooks/use-alert');
const mockedUseAlert = vi.mocked(useAlert);

describe('DialogAlert', () => {
  const mockSetAlert = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Visibility', () => {
    it('should be visible when alert.show is true', () => {
      mockedUseAlert.mockReturnValue({
        alert: { show: true, type: 'success', message: 'Test message' },
        setAlert: mockSetAlert,
      });

      const { container } = render(<DialogAlert />);
      const dialog = container.firstChild as HTMLElement;

      expect(dialog).toHaveClass('flex');
      expect(dialog).not.toHaveClass('hidden');
    });

    it('should be hidden when alert.show is false', () => {
      mockedUseAlert.mockReturnValue({
        alert: { show: false, type: 'success', message: 'Test message' },
        setAlert: mockSetAlert,
      });

      const { container } = render(<DialogAlert />);
      const dialog = container.firstChild as HTMLElement;

      expect(dialog).toHaveClass('hidden');
      expect(dialog).not.toHaveClass('flex');
    });
  });

  describe('Success Type', () => {
    beforeEach(() => {
      mockedUseAlert.mockReturnValue({
        alert: { show: true, type: 'success', message: 'Operation successful' },
        setAlert: mockSetAlert,
      });
    });

    it('should display success icon', () => {
      render(<DialogAlert />);
      expect(screen.getByTitle('Correct')).toBeInTheDocument();
    });

    it('should display "Success" text', () => {
      render(<DialogAlert />);
      expect(screen.getByText('Success')).toBeInTheDocument();
    });

    it('should display the success message', () => {
      render(<DialogAlert />);
      expect(screen.getByText('Operation successful')).toBeInTheDocument();
    });
  });

  describe('Failed Type', () => {
    beforeEach(() => {
      mockedUseAlert.mockReturnValue({
        alert: { show: true, type: 'error', message: 'Operation failed' },
        setAlert: mockSetAlert,
      });
    });

    it('should display failed icon', () => {
      render(<DialogAlert />);
      expect(screen.getByTitle('Wrong')).toBeInTheDocument();
    });

    it('should display "Failed" text', () => {
      render(<DialogAlert />);
      expect(screen.getByText('Failed')).toBeInTheDocument();
    });

    it('should display the error message', () => {
      render(<DialogAlert />);
      expect(screen.getByText('Operation failed')).toBeInTheDocument();
    });
  });

  describe('Close Functionality', () => {
    beforeEach(() => {
      mockedUseAlert.mockReturnValue({
        alert: { show: true, type: 'success', message: 'Test message' },
        setAlert: mockSetAlert,
      });
    });

    it('should call setAlert when X button is clicked', () => {
      render(<DialogAlert />);
      fireEvent.click(screen.getByText('X'));
      expect(mockSetAlert).toHaveBeenCalledWith({
        show: false,
        type: 'success',
        message: '',
      });
    });

    it('should call setAlert when Close button is clicked', () => {
      render(<DialogAlert />);
      fireEvent.click(screen.getByRole('button', { name: /close/i }));
      expect(mockSetAlert).toHaveBeenCalledWith({
        show: false,
        type: 'success',
        message: '',
      });
    });
  });
});
