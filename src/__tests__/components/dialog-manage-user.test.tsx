import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import useUsers from '../../hooks/use-users';
import type { UserDataType } from '../../models/users';
import DialogManageUser from '../../components/dialog-manage-user';

// Mock the hooks and components
vi.mock('../../hooks/use-users', () => ({
  default: vi.fn(),
}));
vi.mock('../../components/input', () => ({
  default: React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement> & {
      label?: string;
      errorMessage?: string;
    }
  >(({ label, errorMessage, ...props }, ref) => (
    <div>
      {label && <label>{label}</label>}
      <input ref={ref} {...props} aria-label={label || 'input'} />
      {errorMessage && <span role="alert">{errorMessage}</span>}
    </div>
  )),
}));

const mockUseUsers = useUsers as unknown as ReturnType<typeof vi.fn>;

describe('DialogManageUser', () => {
  const mockSetOpen = vi.fn();
  const mockOnSubmit = vi.fn();

  const mockUsers: UserDataType[] = [
    {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      address: {
        street: 'Main St',
        suite: 'Apt 1',
        city: 'New York',
        zipcode: '10001',
        geo: { lat: '40.7128', lng: '-74.0060' },
      },
      phone: '123-456-7890',
      website: 'johndoe.com',
      company: {
        name: 'Doe Inc',
        catchPhrase: 'Just do it',
        bs: 'business solutions',
      },
    },
    {
      id: 2,
      name: 'Jane Smith',
      username: 'janesmith',
      email: 'jane@example.com',
      address: {
        street: 'Second St',
        suite: 'Suite 2',
        city: 'Los Angeles',
        zipcode: '90001',
        geo: { lat: '34.0522', lng: '-118.2437' },
      },
      phone: '098-765-4321',
      website: 'janesmith.com',
      company: {
        name: 'Smith Corp',
        catchPhrase: 'Innovation first',
        bs: 'tech solutions',
      },
    },
  ];

  const defaultProps = {
    open: true,
    setOpen: mockSetOpen,
    selectedUser: null,
    onSubmit: mockOnSubmit,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseUsers.mockReturnValue({
      users: mockUsers,
      setUsers: vi.fn(),
    });
  });

  describe('Visibility', () => {
    it('should be visible when open is true', () => {
      const { container } = render(<DialogManageUser {...defaultProps} />);
      const dialog = container.firstChild as HTMLElement;

      expect(dialog).toHaveClass('flex');
      expect(dialog).not.toHaveClass('hidden');
    });

    it('should be hidden when open is false', () => {
      const { container } = render(<DialogManageUser {...defaultProps} open={false} />);
      const dialog = container.firstChild as HTMLElement;

      expect(dialog).toHaveClass('hidden');
      expect(dialog).not.toHaveClass('flex');
    });
  });

  describe('Dialog Title', () => {
    it('should display "Add New User" when selectedUser is null', () => {
      render(<DialogManageUser {...defaultProps} selectedUser={null} />);
      expect(screen.getByText('Add New User')).toBeInTheDocument();
    });

    it('should display "Edit User" when selectedUser is provided', () => {
      render(<DialogManageUser {...defaultProps} selectedUser={mockUsers[0]} />);
      expect(screen.getByText('Edit User')).toBeInTheDocument();
    });
  });

  describe('Form Fields', () => {
    it('should render all required form fields', () => {
      render(<DialogManageUser {...defaultProps} />);

      expect(screen.getByLabelText('Username')).toBeInTheDocument();
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Phone')).toBeInTheDocument();
      expect(screen.getByLabelText('Website')).toBeInTheDocument();
    });

    it('should render all address fields', () => {
      render(<DialogManageUser {...defaultProps} />);

      expect(screen.getByLabelText('Street')).toBeInTheDocument();
      expect(screen.getByLabelText('Suite')).toBeInTheDocument();
      expect(screen.getByLabelText('City')).toBeInTheDocument();
      expect(screen.getByLabelText('Zipcode')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Lat...')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Lng...')).toBeInTheDocument();
    });

    it('should render all company fields', () => {
      render(<DialogManageUser {...defaultProps} />);

      expect(screen.getByLabelText('Company Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Catch Phrase')).toBeInTheDocument();
      expect(screen.getByLabelText('Bs')).toBeInTheDocument();
    });

    it('should display section headers', () => {
      render(<DialogManageUser {...defaultProps} />);

      expect(screen.getByText('Address')).toBeInTheDocument();
      expect(screen.getByText('Company')).toBeInTheDocument();
      expect(screen.getByText('Geo')).toBeInTheDocument();
    });
  });

  describe('Form Population - Edit Mode', () => {
    it('should populate form fields when editing a user', async () => {
      render(<DialogManageUser {...defaultProps} selectedUser={mockUsers[0]} />);

      await waitFor(() => {
        expect(screen.getByLabelText('Username')).toHaveValue('johndoe');
        expect(screen.getByLabelText('Email')).toHaveValue('john@example.com');
        expect(screen.getByLabelText('Phone')).toHaveValue('123-456-7890');
        expect(screen.getByLabelText('Website')).toHaveValue('johndoe.com');
      });
    });

    it('should populate address fields when editing a user', async () => {
      render(<DialogManageUser {...defaultProps} selectedUser={mockUsers[0]} />);

      await waitFor(() => {
        expect(screen.getByLabelText('Street')).toHaveValue('Main St');
        expect(screen.getByLabelText('Suite')).toHaveValue('Apt 1');
        expect(screen.getByLabelText('City')).toHaveValue('New York');
        expect(screen.getByLabelText('Zipcode')).toHaveValue('10001');
        expect(screen.getByPlaceholderText('Lat...')).toHaveValue('40.7128');
        expect(screen.getByPlaceholderText('Lng...')).toHaveValue('-74.0060');
      });
    });

    it('should populate company fields when editing a user', async () => {
      render(<DialogManageUser {...defaultProps} selectedUser={mockUsers[0]} />);

      await waitFor(() => {
        expect(screen.getByLabelText('Catch Phrase')).toHaveValue('Just do it');
        expect(screen.getByLabelText('Bs')).toHaveValue('business solutions');
      });
    });
  });

  describe('Form Submission - Add Mode', () => {
    it('should call onSubmit with correct data structure when adding new user', async () => {
      render(<DialogManageUser {...defaultProps} selectedUser={null} />);

      fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'newuser' } });
      fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'New User' } });
      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'new@example.com' } });
      fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '111-222-3333' } });
      fireEvent.change(screen.getByLabelText('Website'), { target: { value: 'newuser.com' } });
      fireEvent.change(screen.getByLabelText('Street'), { target: { value: 'New Street' } });
      fireEvent.change(screen.getByLabelText('Suite'), { target: { value: 'Suite 3' } });
      fireEvent.change(screen.getByLabelText('City'), { target: { value: 'Chicago' } });
      fireEvent.change(screen.getByLabelText('Zipcode'), { target: { value: '60601' } });
      fireEvent.change(screen.getByPlaceholderText('Lat...'), { target: { value: '41.8781' } });
      fireEvent.change(screen.getByPlaceholderText('Lng...'), { target: { value: '-87.6298' } });
      fireEvent.change(screen.getByLabelText('Company Name'), { target: { value: 'New Company' } });
      fireEvent.change(screen.getByLabelText('Catch Phrase'), {
        target: { value: 'New phrase' },
      });
      fireEvent.change(screen.getByLabelText('Bs'), { target: { value: 'new bs' } });

      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          id: 3,
          name: 'New User',
          username: 'newuser',
          email: 'new@example.com',
          address: {
            street: 'New Street',
            suite: 'Suite 3',
            city: 'Chicago',
            zipcode: '60601',
            geo: {
              lat: '41.8781',
              lng: '-87.6298',
            },
          },
          phone: '111-222-3333',
          website: 'newuser.com',
          company: {
            name: 'New Company',
            catchPhrase: 'New phrase',
            bs: 'new bs',
          },
        });
      });
    });
  });

  describe('Form Submission - Edit Mode', () => {
    it('should call onSubmit with existing user id when editing', async () => {
      render(<DialogManageUser {...defaultProps} selectedUser={mockUsers[0]} />);

      await waitFor(() => {
        expect(screen.getByLabelText('Username')).toHaveValue('johndoe');
      });

      fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'johndoe_updated' } });

      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled();
        const submittedData = mockOnSubmit.mock.calls[0][0];
        expect(submittedData.id).toBe(1);
        expect(submittedData.username).toBe('johndoe_updated');
      });
    });
  });

  describe('Close Functionality', () => {
    it('should close dialog when Close button is clicked', () => {
      render(<DialogManageUser {...defaultProps} />);
      const closeButton = screen.getByText('Close');

      fireEvent.click(closeButton);

      expect(mockSetOpen).toHaveBeenCalledWith(false);
    });

    it('should close dialog when X button is clicked', () => {
      render(<DialogManageUser {...defaultProps} />);
      const xButton = screen.getByRole('button', { name: /x/i });

      fireEvent.click(xButton);

      expect(mockSetOpen).toHaveBeenCalledWith(false);
    });

    it('should not call onSubmit when closing without submitting', () => {
      render(<DialogManageUser {...defaultProps} />);
      const closeButton = screen.getByText('Close');

      fireEvent.click(closeButton);

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });
});
