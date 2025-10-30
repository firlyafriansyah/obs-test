import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { UserDataType } from '../../models/users';
import UsersList from '../../components/users-list';

vi.mock('./image-with-skeleton', () => ({
  default: ({ src, alt, className }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src={src} alt={alt} className={className} data-testid="user-list-image" />
  ),
}));

describe('UsersList', () => {
  const mockShowDetail = vi.fn();
  const mockOnDelete = vi.fn();
  const mockOnEdit = vi.fn();

  const mockUser: UserDataType = {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    address: {
      street: 'Main St',
      suite: 'Apt 1',
      city: 'New York',
      zipcode: '10001',
      geo: {
        lat: '40.7128',
        lng: '-74.0060',
      },
    },
    phone: '123-456-7890',
    website: 'johndoe.com',
    company: {
      name: 'Doe Inc',
      catchPhrase: 'Just do it',
      bs: 'business solutions',
    },
  };

  const defaultProps = {
    user: mockUser,
    showDetail: mockShowDetail,
    onDelete: mockOnDelete,
    onEdit: mockOnEdit,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render user list item', () => {
      render(<UsersList {...defaultProps} />);
      const listItem = screen.getByTestId('user-list');

      expect(listItem).toBeInTheDocument();
    });

    it('should render profile image', () => {
      render(<UsersList {...defaultProps} />);
      const image = screen.getByTestId('user-list-image');

      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'https://picsum.photos/200/300');
      expect(image).toHaveAttribute('alt', 'User Profile');
    });

    it('should render Edit and Delete buttons', () => {
      render(<UsersList {...defaultProps} />);

      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });
  });

  describe('User Information Display', () => {
    it('should display user name', () => {
      render(<UsersList {...defaultProps} />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should display username with @ prefix', () => {
      render(<UsersList {...defaultProps} />);
      expect(screen.getByText('@johndoe')).toBeInTheDocument();
    });

    it('should display company name', () => {
      render(<UsersList {...defaultProps} />);
      expect(screen.getByText('Doe Inc')).toBeInTheDocument();
    });

    it('should display company catch phrase', () => {
      render(<UsersList {...defaultProps} />);
      expect(screen.getByText('Just do it')).toBeInTheDocument();
    });

    it('should display company bs', () => {
      render(<UsersList {...defaultProps} />);
      expect(screen.getByText('business solutions')).toBeInTheDocument();
    });
  });

  describe('Click Functionality - List Item', () => {
    it('should call showDetail when list item is clicked', () => {
      render(<UsersList {...defaultProps} />);
      fireEvent.click(screen.getByTestId('user-list'));

      expect(mockShowDetail).toHaveBeenCalledTimes(1);
    });

    it('should not call onEdit or onDelete when list item is clicked', () => {
      render(<UsersList {...defaultProps} />);
      fireEvent.click(screen.getByTestId('user-list'));

      expect(mockOnEdit).not.toHaveBeenCalled();
      expect(mockOnDelete).not.toHaveBeenCalled();
    });
  });

  describe('Click Functionality - Edit Button', () => {
    it('should call onEdit when Edit button is clicked', () => {
      render(<UsersList {...defaultProps} />);
      const editButton = screen.getByText('Edit');

      fireEvent.click(editButton);

      expect(mockOnEdit).toHaveBeenCalledTimes(1);
    });

    it('should not call showDetail when Edit button is clicked', () => {
      render(<UsersList {...defaultProps} />);
      const editButton = screen.getByText('Edit');

      fireEvent.click(editButton);

      expect(mockShowDetail).not.toHaveBeenCalled();
    });
  });

  describe('Click Functionality - Delete Button', () => {
    it('should call onDelete when Delete button is clicked', () => {
      render(<UsersList {...defaultProps} />);
      const deleteButton = screen.getByText('Delete');

      fireEvent.click(deleteButton);

      expect(mockOnDelete).toHaveBeenCalledTimes(1);
    });

    it('should not call showDetail when Delete button is clicked', () => {
      render(<UsersList {...defaultProps} />);
      const deleteButton = screen.getByText('Delete');

      fireEvent.click(deleteButton);

      expect(mockShowDetail).not.toHaveBeenCalled();
    });
  });

  describe('Different User Data', () => {
    it('should display different user information correctly', () => {
      const differentUser: UserDataType = {
        id: 2,
        name: 'Jane Smith',
        username: 'janesmith',
        email: 'jane@example.com',
        address: {
          street: 'Second St',
          suite: 'Suite 2',
          city: 'Los Angeles',
          zipcode: '90001',
          geo: {
            lat: '34.0522',
            lng: '-118.2437',
          },
        },
        phone: '098-765-4321',
        website: 'janesmith.com',
        company: {
          name: 'Smith Corp',
          catchPhrase: 'Innovation first',
          bs: 'tech solutions',
        },
      };

      render(<UsersList {...defaultProps} user={differentUser} />);

      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('@janesmith')).toBeInTheDocument();
      expect(screen.getByText('Smith Corp')).toBeInTheDocument();
      expect(screen.getByText('Innovation first')).toBeInTheDocument();
      expect(screen.getByText('tech solutions')).toBeInTheDocument();
    });
  });
});
