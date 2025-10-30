import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import DialogUserDetail from '../../components/dialog-user-detail';
import type { UserDataType } from '../../models/users';

vi.mock('./image-with-skeleton', () => ({
  default: ({ src, alt, className }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src={src} alt={alt} className={className} data-testid="profile-image" />
  ),
}));

describe('DialogUserDetail', () => {
  const mockSetOpen = vi.fn();

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
    open: true,
    setOpen: mockSetOpen,
    selectedUser: mockUser,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Visibility', () => {
    it('should be visible when open is true', () => {
      const { container } = render(<DialogUserDetail {...defaultProps} />);
      const dialog = container.firstChild as HTMLElement;

      expect(dialog).toHaveClass('flex');
      expect(dialog).not.toHaveClass('hidden');
    });

    it('should be hidden when open is false', () => {
      const { container } = render(<DialogUserDetail {...defaultProps} open={false} />);
      const dialog = container.firstChild as HTMLElement;

      expect(dialog).toHaveClass('hidden');
      expect(dialog).not.toHaveClass('flex');
    });
  });

  describe('User Profile Image', () => {
    it('should render profile image with correct src', () => {
      render(<DialogUserDetail {...defaultProps} />);
      const image = screen.getByTestId('profile-image');

      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'https://picsum.photos/200/300');
    });
  });

  describe('User Basic Information', () => {
    it('should display username with @ prefix', () => {
      render(<DialogUserDetail {...defaultProps} />);
      expect(screen.getByText('@johndoe')).toBeInTheDocument();
    });

    it('should display user name', () => {
      render(<DialogUserDetail {...defaultProps} />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should display user email', () => {
      render(<DialogUserDetail {...defaultProps} />);
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });
  });

  describe('Contact Information', () => {
    it('should display phone label and value', () => {
      render(<DialogUserDetail {...defaultProps} />);
      expect(screen.getByText('Phone')).toBeInTheDocument();
      expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    });

    it('should display website label and value', () => {
      render(<DialogUserDetail {...defaultProps} />);
      expect(screen.getByText('Website')).toBeInTheDocument();
      expect(screen.getByText('johndoe.com')).toBeInTheDocument();
    });
  });

  describe('Company Information', () => {
    it('should display company label', () => {
      render(<DialogUserDetail {...defaultProps} />);
      expect(screen.getByText('Company')).toBeInTheDocument();
    });

    it('should display company name', () => {
      render(<DialogUserDetail {...defaultProps} />);
      expect(screen.getByText('Doe Inc')).toBeInTheDocument();
    });

    it('should display company catch phrase', () => {
      render(<DialogUserDetail {...defaultProps} />);
      expect(screen.getByText('Just do it')).toBeInTheDocument();
    });

    it('should display company bs', () => {
      render(<DialogUserDetail {...defaultProps} />);
      expect(screen.getByText('business solutions')).toBeInTheDocument();
    });
  });

  describe('Address Information', () => {
    it('should display address label', () => {
      render(<DialogUserDetail {...defaultProps} />);
      expect(screen.getByText('Address')).toBeInTheDocument();
    });

    it('should display full address with all components', () => {
      render(<DialogUserDetail {...defaultProps} />);
      expect(screen.getByText('Main St, Apt 1, New York, 10001')).toBeInTheDocument();
    });

    it('should display latitude', () => {
      render(<DialogUserDetail {...defaultProps} />);
      expect(screen.getByText('Lat. 40.7128')).toBeInTheDocument();
    });

    it('should display longitude', () => {
      render(<DialogUserDetail {...defaultProps} />);
      expect(screen.getByText('Long. -74.0060')).toBeInTheDocument();
    });
  });

  describe('Close Functionality', () => {
    it('should call setOpen with false when Close button is clicked', () => {
      render(<DialogUserDetail {...defaultProps} />);
      const closeButton = screen.getByText('Close');

      fireEvent.click(closeButton);

      expect(mockSetOpen).toHaveBeenCalledTimes(1);
      expect(mockSetOpen).toHaveBeenCalledWith(false);
    });

    it('should call setOpen with false when X button is clicked', () => {
      render(<DialogUserDetail {...defaultProps} />);
      const xButton = screen.getByRole('button', { name: /x/i });

      fireEvent.click(xButton);

      expect(mockSetOpen).toHaveBeenCalledTimes(1);
      expect(mockSetOpen).toHaveBeenCalledWith(false);
    });

    it('should have two close buttons', () => {
      render(<DialogUserDetail {...defaultProps} />);
      const closeTextButton = screen.getByText('Close');
      const closeIconButton = screen.getByTitle('X');

      expect(closeTextButton).toBeInTheDocument();
      expect(closeIconButton).toBeInTheDocument();
    });
  });
});
